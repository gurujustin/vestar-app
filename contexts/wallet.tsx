import React, { createContext, useEffect, useMemo, useState } from "react";
import {
	Account,
	createWalletClient,
	custom,
	WalletClient,
	defineChain,
} from "viem";
import PersistentFramework from "../utils/persistent";

declare let window: any;
interface IWallet {
	connectWallet: any;
	disconnectWallet: any;
	wallet: WalletClient;
	account: `0x${string}`;
	isConnected: any;
	signer: `0x${string}`;
}

const ripple = defineChain({
	id: 1440002,
	name: "XRPL EVM Sidechain",
	network: "xrpl",
	nativeCurrency: {
		decimals: 6,
		name: "XRP",
		symbol: "XRP",
	},
	rpcUrls: {
		default: {
			http: ["https://rpc-evm-sidechain.xrpl.org"],
		},
	},
	blockExplorers: {
		default: { name: "Explorer", url: "https://evm-sidechain.xrpl.org" },
	},
	contracts: {
		compliantToken: {
			address: "0x8AA894614874a22c74dCa03c6421655bc590a072",
			blockCreated: 5443218,
		},
		crowdSale: {
			address: "0x43146a4a32E44Bd1e166b1F8062b99C38aA19072",
			blockCreated: 5443220,
		},
	},
});

export const WalletContext = createContext({} as IWallet);

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	let wallet: any;
	const [isConnected, setIsConnected] = useState<boolean>(false);
	const [account, setAccount] = useState<`0x${string}` | any>("");
	const [signer, setSigner] = useState<`0x${string}` | any>();

	if (
		typeof window !== "undefined" &&
		typeof window?.ethereum !== "undefined"
	) {
		wallet = createWalletClient({
			chain: ripple,
			transport: custom(window.ethereum),
		});
	}

	const connectWallet = async () => {
		if (
			typeof window !== "undefined" &&
			typeof window?.ethereum !== "undefined"
		) {
			try {
				const chainId = await wallet.getChainId();
				if (chainId !== ripple.id) {
					await wallet
						.switchChain({ id: ripple.id })
						.catch(async (error: any) => {
							if (error.code === 4902) await wallet.addChain({ chain: ripple });
						});
				} else {
					const [address] = await wallet.requestAddresses();
					setAccount(address);
					setIsConnected(true);
					setSigner(address);
					PersistentFramework.add("connected", { isConnected: true });
					PersistentFramework.add("address", address);
				}
			} catch (err: any) {
				setIsConnected(false);
				console.log(err.message);
			}
		} else {
			console.log("Instale a metamask");
		}
	};

	const disconnectWallet = () => {
		const value = PersistentFramework.get("connected") as { [k: string]: any };

		PersistentFramework.remove("address");
		PersistentFramework.remove("connected");
		PersistentFramework.remove("name");
		PersistentFramework.remove("id");
		setIsConnected(false);
		setAccount("");
	};

	useEffect(() => {
		const value = PersistentFramework.get("connected") as { [k: string]: any };

		if (value?.isConnected) {
			const address = PersistentFramework.get("address") as any;

			setIsConnected(true);
			setAccount(address);
		}
	}, []);

	const providerValue = useMemo(
		() => ({
			connectWallet,
			disconnectWallet,
			wallet,
			account,
			isConnected,
			setIsConnected,
			signer,
		}),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[account, isConnected, setIsConnected, signer]
	);

	return (
		<WalletContext.Provider value={providerValue}>
			{children}
		</WalletContext.Provider>
	);
};
