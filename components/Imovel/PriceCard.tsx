import { Button, Flex, Icon, Img, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { FiCopy } from "react-icons/fi";
import { useOpportunities } from "../../hooks/useOpportunities";
import { useTransactions } from "../../hooks/useTransactions";
import { useWallet } from "../../hooks/useWallet";
interface IPriceCard {
	id: any;
	compliantToken: string;
	isWhitelisted: boolean;
	price: number;
	tokensSold: number;
	ended: boolean;
	supply: number;
	oportunitiesAddress: string;
	investor_pf?: string;
	investor_pj?: string;
}

export const PriceCard: React.FC<IPriceCard> = props => {
	const {
		id,
		compliantToken,
		isWhitelisted,
		price,
		tokensSold,
		ended,
		supply,
		oportunitiesAddress,
		investor_pf,
		investor_pj,
	} = props;
	const [isInvestidor, setIsInvestidor] = useState(investor_pf ? true : false);
	const { hasToken } = useOpportunities();
	const { push, prefetch } = useRouter();
	const [cotas, setCotas] = useState<number>(0);
	const [copied, setCopied] = useState(false);
	const { t } = useTranslation();
	const { callAddToWhitelist, callBuyToken, approve } = useTransactions();
	const { connectWallet, isConnected, signer } = useWallet();

	const handleClick = async (value: string) => {
		try {
			await navigator.clipboard.writeText(value);
			setCopied(true);
		} catch (error) {
			console.error("Failed to copy text: ", error);
		}
	};
	const available = useMemo(() => {
		if (supply > tokensSold) {
			return supply - tokensSold;
		} else {
			return tokensSold - supply;
		}
	}, [tokensSold, supply]);

	const formatter = new Intl.NumberFormat("pt-br", {
		style: "currency",
		currency: "BRL",
	});

	const earnTokens = async (compliantToken: string, address: string) => {
		if (!isConnected || !signer) {
			return await connectWallet();
		} else {
			await await callAddToWhitelist(compliantToken, address);
			return;
		}
	};

	const buyTokens = async (
		saleAddress: string,
		amount: number,
		accountAddress: string
	) => {
		if (!isConnected || !signer) {
			return await connectWallet();
		} else {
			/// APPROVE
			await approve(saleAddress, amount, accountAddress);

			/// BUY
			await callBuyToken(amount, accountAddress);
			return;
		}
	};

	useEffect(() => {
		prefetch(
			`/investir?id=${id}&cotas=${cotas}&oportunitiesAddress=${oportunitiesAddress}`
		);
	}, [cotas, id, oportunitiesAddress, prefetch]);

	return (
		<Flex
			w="23.125rem"
			h={"max"}
			bgColor={"#003243"}
			p="1.5rem"
			flexDir={"column"}
			borderRadius="0.75rem"
			position={"sticky"}
			top={"10%"}
			boxShadow="0px 20px 25px rgba(31, 41, 55, 0.1), 0px 10px 10px rgba(31, 41, 55, 0.04);"
			color="#ffffff"
		>
			<Text fontSize={"xl"} fontWeight="500">
				{t("opportunitieDetails.priceCard.sharesName")}
			</Text>
			{isInvestidor ? (
				<Flex flexDirection="column">
					<Flex
						my="1rem"
						bgColor={"#29525f"}
						py="0.5rem"
						px="1rem"
						borderRadius="0.5rem"
						justifyContent={"space-between"}
						alignItems="center"
						display={ended ? "none" : "flex"}
					>
						<Flex flexDir={"column"}>
							<Text fontSize={"xs"} fontWeight="500">
								{t("opportunitieDetails.select")}
							</Text>
							<Text fontSize={"sm"} fontWeight="400">
								{t("opportunitieDetails.priceCard.shares", {
									value: cotas,
								})}
							</Text>
						</Flex>

						<Flex gap="0.3125rem">
							<Img
								_hover={{
									cursor: "pointer",
									opacity: 0.5,
									transition: "all 0.4s",
								}}
								src={"/icons/PlusIcon.png"}
								onClick={() =>
									setCotas(cotas === available ? cotas : cotas + 1)
								}
							/>
							<Img
								_hover={{
									cursor: "pointer",
									opacity: 0.5,
									transition: "all 0.4s",
								}}
								src={"/icons/MinusIcon.png"}
								onClick={() => setCotas(cotas === 0 ? 0 : cotas - 1)}
							/>
						</Flex>
					</Flex>
					<Flex
						flexDirection={"column"}
						pb="1rem"
						mb="1rem"
						mt={ended ? "1rem" : "none"}
						borderBottom="1px solid #29525f"
					>
						<Flex justifyContent={"space-between"} w="100%">
							<Text fontWeight={ended ? "400" : "500"}>
								{ended
									? hasToken
										? "Você investiu em 12 tokens desta oportunidade. Acompanhe seus rendimentos no portfólio."
										: "Você não comprou cotas desta oportunidade. "
									: t("opportunitieDetails.total")}
							</Text>
							<Text fontWeight={"500"} display={ended ? "none" : "flex"}>
								{formatter.format(cotas * price)}
							</Text>
						</Flex>

						<Flex alignItems="center" mt="1rem" gap={"1"}>
							{isWhitelisted ? (
								<Button
									fontWeight={"500"}
									fontSize={"md"}
									bgColor="#FFFFFF"
									color="#007088"
									w="100%"
									px="0.625rem"
									py="1rem"
									mb={ended ? "none" : "1rem"}
									isDisabled={ended && !hasToken}
									_hover={
										ended && !hasToken
											? { opacity: "0.3" }
											: { bgColor: "#F7FAFC" }
									}
									onClick={() =>
										buyTokens(oportunitiesAddress, price * cotas, signer)
									}
								>
									{ended
										? t("opportunitieDetails.endedSales")
										: t("opportunitieDetails.wantTo")}
								</Button>
							) : (
								<Button
									fontWeight={"500"}
									fontSize={"md"}
									bgColor="#FFFFFF"
									color="#007088"
									w="100%"
									px="0.625rem"
									py="1rem"
									mb={ended ? "none" : "1rem"}
									isDisabled={ended && !hasToken}
									_hover={
										ended && !hasToken
											? { opacity: "0.3" }
											: { bgColor: "#F7FAFC" }
									}
									onClick={() => earnTokens(compliantToken, signer)}
								>
									Earn tokens
								</Button>
							)}
						</Flex>
					</Flex>
				</Flex>
			) : (
				<Flex
					fontFamily="Poppins"
					fontStyle="normal"
					fontWeight="500"
					fontSize="1rem"
					lineHeight="1.5rem"
					alignItems="center"
					color="#FFFFFF"
					w="100%"
					mt="1rem"
					flexDirection="column"
				>
					<Flex justifyContent="space-between" w="100%">
						<Text>{t("opportunitieDetails.unit")}</Text>
						<Text>{price}</Text>
					</Flex>
					<Flex w="100%" border="1px solid #29525f" my="1rem" />
				</Flex>
			)}
			<Flex flexDir={"column"} gap="0.5rem">
				<Flex justifyContent={"space-between"}>
					<Text fontSize={"md"} fontWeight="400">
						{t("opportunitieDetails.quotaAddress")}
					</Text>
					<Flex alignItems={"center"} gap="0.5rem">
						<Text fontSize={"md"} fontWeight="400">
							{`${compliantToken?.slice(0, 5)}...${compliantToken?.slice(38)}`}
						</Text>
						<Icon
							color={"#4BA3B7"}
							w={4}
							h={4}
							as={FiCopy}
							onClick={() => handleClick(compliantToken)}
							_hover={{ cursor: "pointer" }}
						/>
					</Flex>
				</Flex>
				<Flex justifyContent={"space-between"}>
					<Text fontSize={"md"} fontWeight="400">
						{t("opportunitieDetails.shares")}
					</Text>
					<Text fontSize={"md"} fontWeight="400">
						{tokensSold / 1e18}
					</Text>
				</Flex>
				<Flex justifyContent={"space-between"}>
					<Text fontSize={"md"} fontWeight="400">
						{t("opportunitieDetails.available")}
					</Text>
					<Text fontSize={"md"} fontWeight="400">
						{supply / 1e18}
					</Text>
				</Flex>
			</Flex>
		</Flex>
	);
};
