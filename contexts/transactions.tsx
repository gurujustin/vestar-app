import React, { createContext, useMemo, useState } from "react";
import { createPublicClient, custom, Account, http, defineChain } from "viem";
import { useWallet } from "../hooks/useWallet";
import { fetchUserApproveData } from "../services/fetchUserApproveData";
import { abi as compliantTokenABI } from "../utils/abi/compliantToken.json";
import { abi as crowdSaleABI } from "../utils/abi/crowdSale.json";
import { compliantToken } from "../utils/abi/compliantToken";
import { crowdSale } from "../utils/abi/crowdSale";
import { drex } from "../utils/abi/drex";
import PersistentFramework from "../utils/persistent";

declare let window: any;

interface ITransactions {
	approve: any;
	getIsWhitelisted: any;
	callAddToWhitelist: any;
	getBoughtTokens: any;
	getDrexAvailableForRefund: any;
	getAvailableTokensToClaim: any;
	getAvailableTokens: any;
	calculateTokenAmount: any;
	getCloseTime: any;
	getMaxBuyAllowed: any;
	getTokenSold: any;
	getIsOpen: any;
	callBuyToken: any;
}

export const ripple = defineChain({
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

export const TransactionsContext = createContext({} as ITransactions);

export const TransactionsProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	let publicClient: any;
	const { wallet, signer } = useWallet();

	if (
		typeof window !== "undefined" &&
		typeof window?.ethereum !== "undefined"
	) {
		publicClient = createPublicClient({
			chain: ripple,
			transport: http(),
		});
	}

	const waitForApproval = async (txHash: string) => {
		return new Promise((resolve, reject) => {
			const intervalId = setInterval(async () => {
				try {
					const transaction = await publicClient
						.getTransactionReceipt({
							hash: txHash,
						})
						.catch(() => null);
					if (transaction && transaction?.status) {
						clearInterval(intervalId);
						resolve(transaction);
					}
				} catch (err) {
					clearInterval(intervalId);
					reject(err);
				}
			}, 2000);
		});
	};

	//////////////////////////////////
	// Compliant Token
	//////////////////////////////////

	const getIsWhitelisted = async (
		compliantTokenAddress: string,
		accountAddress: string
	) => {
		const isWhitelisted = await publicClient?.readContract({
			address: compliantTokenAddress,
			abi: compliantTokenABI,
			functionName: "isWhitelisted",
			args: [accountAddress],
		});

		return isWhitelisted;
	};

	const callAddToWhitelist = async (
		compliantTokenAddress: string,
		account: string
	) => {
		try {
			const { request } = await publicClient.simulateContract({
				...compliantToken,
				functionName: "addToWhitelist",
				account,
				args: [account],
			});
			const txHash = await wallet?.writeContract(request);
			await waitForApproval(txHash);
		} catch (error) {
			console.log("error", error);
		}
	};

	//////////////////////////////////
	// Crowd Sale
	//////////////////////////////////
	const getBoughtTokens = async (
		crowdSaleAddress: string,
		accountAddress: string
	) => {
		const boughtTokens = await publicClient?.readContract({
			address: crowdSaleAddress,
			abi: crowdSaleABI,
			functionName: "getBoughtTokens",
			args: [accountAddress],
		});
		return boughtTokens;
	};

	const getDrexAvailableForRefund = async (
		crowdSaleAddress: string,
		accountAddress: string
	) => {
		const drexAvailable = await publicClient?.readContract({
			address: crowdSaleAddress,
			abi: crowdSaleABI,
			functionName: "getDrexAvailableForRefund",
			args: [accountAddress],
		});
		return drexAvailable;
	};

	const getAvailableTokensToClaim = async (
		crowdSaleAddress: string,
		accountAddress: string
	) => {
		const tokensToClaim = await publicClient?.readContract({
			address: crowdSaleAddress,
			abi: crowdSaleABI,
			functionName: "getAvailableTokensToClaim",
			args: [accountAddress],
		});
		return tokensToClaim;
	};

	const getAvailableTokens = async (crowdSaleAddress: string) => {
		const availableTokens = await publicClient?.readContract({
			address: crowdSaleAddress,
			abi: crowdSaleABI,
			functionName: "getAvailableTokens",
		});

		return availableTokens;
	};

	const calculateTokenAmount = async (
		crowdSaleAddress: number,
		amount: number
	) => {
		const tokenAmount = await publicClient?.readContract({
			address: crowdSaleAddress,
			abi: crowdSaleABI,
			functionName: "calculateTokenAmount",
			args: [amount],
		});

		return tokenAmount;
	};

	const getCloseTime = async (crowdSaleAddress: string) => {
		const closeTime = await publicClient?.readContract({
			address: crowdSaleAddress,
			abi: crowdSaleABI,
			functionName: "closeTime",
		});

		return closeTime;
	};

	const getMaxBuyAllowed = async (crowdSaleAddress: string) => {
		const maxBuyAllowed = await publicClient?.readContract({
			address: crowdSaleAddress,
			abi: crowdSaleABI,
			functionName: "maxBuyAllowed",
		});

		return maxBuyAllowed;
	};

	const getTokenSold = async (crowdSaleAddress: string) => {
		const tokenSold = await publicClient?.readContract({
			address: crowdSaleAddress,
			abi: crowdSaleABI,
			functionName: "tokenSold",
		});

		return tokenSold;
	};

	const getIsOpen = async (crowdSaleAddress: string) => {
		const isOpen = await publicClient?.readContract({
			address: crowdSaleAddress,
			abi: crowdSaleABI,
			functionName: "isOpen",
		});

		return isOpen;
	};

	const callBuyToken = async (amount: number, account: string) => {
		try {
			const { request } = await publicClient.simulateContract({
				...crowdSale,
				functionName: "buyToken",
				account,
				args: [amount],
			});
			const txHash = await wallet.writeContract(request);
			await waitForApproval(txHash);
		} catch (error) {
			console.log("error", error);
		}
	};

	//////////////////////////////////
	// DREX
	//////////////////////////////////
	const approve = async (
		tokenContract: string,
		amount: number,
		account: string
	) => {
		try {
			const { request } = await publicClient?.simulateContract({
				...drex,
				functionName: "approve",
				account,
				args: [tokenContract, amount],
			});
			const txHash = await wallet.writeContract(request);
			await waitForApproval(txHash);
		} catch (error) {
			console.log("error", error);
		}
	};

	const providerValue = useMemo(
		() => ({
			getTokenSold,
			getAvailableTokens,
			getAvailableTokensToClaim,
			getDrexAvailableForRefund,
			getIsWhitelisted,
			calculateTokenAmount,
			getMaxBuyAllowed,
			callAddToWhitelist,
			callBuyToken,
			approve,
			getIsOpen,
			getBoughtTokens,
			getCloseTime,
		}),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[]
	);
	{
	}

	return (
		<TransactionsContext.Provider value={providerValue}>
			{children}
		</TransactionsContext.Provider>
	);
};
