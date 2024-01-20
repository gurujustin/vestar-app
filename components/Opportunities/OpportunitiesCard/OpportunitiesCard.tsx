import React, { FunctionComponent, useEffect } from "react";
import { Button, Flex, Img, Text, SimpleGrid } from "@chakra-ui/react";
import { IOpportunitiesCard } from "./dto";
import { useRouter } from "next/router";
import { FiMapPin } from "react-icons/fi";
import { fetchOpportunity } from "../../../services/fetchOpportunity";
import { useQuery as query } from "react-query";
import { formatDate } from "../../../utils/formatDate";
import { fetchOpportunitiesByCompany } from "../../../services/fetchOpportunitiesByCompany";
import { ColorRing } from "react-loader-spinner";
import Countdown from "react-countdown";
import { CountdownRenderProps } from "react-countdown/dist/Countdown";
import { useTranslation } from "react-i18next";

interface IOpportunitiesCompaniesCard {
	id?: any;
	investorId?: any;
	enterpriseData?: any;
	token?: any;
	isPortfolio?: boolean;
	host?: any;
}

export const OpportunitiesCard: FunctionComponent<
	IOpportunitiesCompaniesCard
> = ({ id, investorId, enterpriseData, isPortfolio, host, token }) => {
	const currentTime = new Date();
	const router = useRouter();
	const { t, i18n } = useTranslation();
	const { language } = i18n;
	const isEnterprise = investorId ? false : true;

	const { data: cardsInfo } = query(
		["oportunity", router.query],
		() =>
			id
				? fetchOpportunitiesByCompany(router.query)
				: fetchOpportunity(router.query),
		{
			refetchOnWindowFocus: false,
			refetchInterval: false,
		}
	);

	const renderer = ({
		days,
		hours,
		minutes,
		completed,
		props: { date },
	}: CountdownRenderProps) => {
		if (completed) {
			return "Encerrado";
		} else {
			return (
				<Text
					fontFamily="Poppins"
					fontWeight="500"
					fontSize="0.75rem"
					lineHeight="1rem"
					color="#FFFFFF"
					id="timer"
				>
					{days} dias {hours} horas {minutes} min
				</Text>
			);
		}
	};

	return (
		<>
			{cardsInfo !== undefined ? (
				cardsInfo?.data?.map((cards: IOpportunitiesCard) => (
					<Flex
						key={cards._id}
						w="18.125rem"
						h="24.5625rem"
						background="#FFFFFF"
						boxShadow="0rem 0rem 0rem 0.0625rem rgba(0, 0, 0, 0.05)"
						borderRadius="0.75rem"
						flexDirection="column"
						_hover={{
							cursor:
								currentTime >= new Date(cards?.sale_end_at)
									? "default"
									: "pointer",
							boxShadow:
								"0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)",
						}}
						transition="150ms"
						onClick={() => {
							router.push({
								pathname: `/oportunidades/${cards._id}`,
								query: { id: cards._id },
							});
						}}
					>
						<Flex
							w="18.125rem"
							h="12.75rem"
							borderRadius="0.75rem"
							justifyContent="end"
						>
							<Img
								src={`/api/file/${cards.pictures_enterprise[0]}`}
								borderRadius="0.75rem"
							/>
							<Flex position="absolute" pt="0.625rem" pr="0.75rem">
								<Flex
									justifyContent="center"
									alignItems="center"
									w="max-content"
									h="1.25rem"
									background="rgba(0, 0, 0, 0.36)"
									borderRadius="2.6875rem"
									px="0.5rem"
									py="0.125rem"
								>
									{currentTime >= new Date(cards?.sale_end_at) ? (
										<Text
											fontFamily="Poppins"
											fontWeight="500"
											fontSize="0.75rem"
											lineHeight="1rem"
											color="#FFFFFF"
										>
											{t("opportunities.card.closed")}
										</Text>
									) : (
										<Text
											fontFamily="Poppins"
											fontWeight="500"
											fontSize="0.75rem"
											lineHeight="1rem"
											color="#FFFFFF"
										>
											{cards?.isAvailable ? (
												t("opportunities.card.available")
											) : (
												<Countdown
													date={cards?.sale_end_at}
													renderer={renderer}
												/>
											)}
										</Text>
									)}
								</Flex>
							</Flex>
						</Flex>
						<Flex mt="1rem" px="1rem" flexDirection="column" pb="0.9375rem">
							<Flex gap="0.3125rem" flexDirection="column">
								<Flex gap="0.5rem" alignItems="center">
									{!cards.isPortfolio && (
										<Img
											w={4}
											h={4}
											src={`/api/file/${cards.enterprise_logo}`}
										/>
									)}
									<Text
										fontFamily="Poppins"
										fontWeight="500"
										fontSize="1rem"
										lineHeight="1.5rem"
										color="#171923"
									>
										{cards.name}
									</Text>
								</Flex>
								<Flex gap="0.5rem">
									<FiMapPin color="#718096" />
									<Text
										fontFamily="Poppins"
										fontSize="0.75rem"
										lineHeight="1rem"
										alignItems="center"
										color="#718096"
									>
										{`${cards.address.neighborhood}, ${cards.address.state}`}
									</Text>
								</Flex>
								<Flex alignItems="center" color="#2D3748">
									<Text
										fontFamily="Poppins"
										fontSize="0.75rem"
										lineHeight="1rem"
										color="#2D3748"
									>
										{cards.enterprise_type}
									</Text>
								</Flex>
							</Flex>
							{cards.isPortfolio ? (
								<Button
									justifyContent="center"
									mt="1rem"
									alignItems="center"
									w="16.125rem"
									h="1.5rem"
									border="0.0625rem solid #007D99"
									borderRadius="0.375rem"
									fontFamily="Poppins"
									fontWeight="500"
									fontSize="0.75rem"
									lineHeight="1rem"
									color="#007D99"
									_hover={{ bgColor: "#EDF2F7" }}
									opacity={"1"}
									cursor={"pointer"}
								>
									{t("opportunities.card.workProgress")}
								</Button>
							) : (
								<Flex flexDirection="column" gap="1rem" mt="1.5rem">
									<Flex
										alignItems="center"
										justifyContent="space-between"
										w="100%"
									>
										<Flex flexDirection="column" alignItems="left">
											<Text
												fontSize="0.75rem"
												lineHeight="1rem"
												color="#718096"
											>
												{t("opportunities.card.minInvest")}
											</Text>
											<Flex gap="0.25rem" fontFamily="Poppins">
												<Text
													fontSize="0.75rem"
													lineHeight="1rem"
													color="#718096"
												>
													R$
												</Text>
												<Text
													mt="0.0625rem"
													fontSize="1rem"
													lineHeight="1.5rem"
													color="#171923"
												>
													{cards.min_investment}
												</Text>
											</Flex>
										</Flex>
										<Flex
											flexDirection="column"
											alignItems="left"
											fontFamily="Poppins"
										>
											<Text
												fontSize="0.75rem"
												lineHeight="1rem"
												color="#718096"
											>
												{t("opportunities.card.estConc")}
											</Text>
											<Text fontSize="1rem" lineHeight="1.5rem" color="#171923">
												{formatDate(cards?.expected_delivery_date)}
											</Text>
										</Flex>
									</Flex>
									{cards?.isAvailable ? (
										<Button
											justifyContent="center"
											alignItems="center"
											w="16.125rem"
											h="max"
											py="0.125rem"
											border="0.0625rem solid #29525f"
											borderRadius="0.375rem"
											fontFamily="Poppins"
											fontWeight="500"
											fontSize="0.75rem"
											lineHeight="1rem"
											color="#29525f"
											bgColor="#ffffff"
											_hover={{ bgColor: "#EDF2F7" }}
										>
											{currentTime >= new Date(cards?.sale_end_at)
												? t("opportunities.card.access")
												: t("opportunities.card.accessTo")}
										</Button>
									) : (
										<Flex
											justifyContent="center"
											alignItems="center"
											w="max"
											background="#E4F2F3"
											borderRadius="2.6875rem"
											py="0.125rem"
											px={language === "pt-br" ? "1" : "3"}
										>
											<Text
												fontFamily="Poppins"
												fontWeight="500"
												fontSize="0.75rem"
												lineHeight="1rem"
												color="#00576B"
											>
												{t("opportunities.card.expectedp/y", {
													symbol1: cards?.profitability,
												})}
											</Text>
										</Flex>
									)}
								</Flex>
							)}
						</Flex>
					</Flex>
				))
			) : (
				<Flex
					ml="45rem"
					w={"100%"}
					h="10rem"
					justifyContent={"center"}
					alignItems="center"
				>
					<ColorRing
						height={15}
						width={15}
						colors={["#1789A3", "#1789A3", "#1789A3", "#1789A3", "#1789A3"]}
						wrapperStyle={{}}
						wrapperClass=""
						visible={true}
						ariaLabel="oval-loading"
					/>
				</Flex>
			)}
		</>
	);
};

export const OpportunitiesCards: FunctionComponent<
	IOpportunitiesCompaniesCard
> = ({ id, investorId, enterpriseData, isPortfolio, host, token }) => {
	return (
		<SimpleGrid
			columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
			spacing="1.5rem"
			w="fit-content"
			rowGap="2rem"
		>
			<OpportunitiesCard
				id={id}
				investorId={investorId}
				enterpriseData={enterpriseData}
				isPortfolio={isPortfolio}
				host={host}
				token={token}
			/>
		</SimpleGrid>
	);
};
