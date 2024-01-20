import { Flex, Img, Text, useMediaQuery } from "@chakra-ui/react";
import { FunctionComponent, useEffect } from "react";
import { DefaultTemplate } from "../DefaultTemplate";
import { MenuInputs } from "../../components";
import { OpportunitiesCards } from "../../components";
import { useUser } from "../../hooks/useUser";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";

export const OpportunitiesContainer: FunctionComponent = (props: any) => {
	const { getInfosId } = useUser();
	const [bannerRes] = useMediaQuery("(max-width: 1110px)");
	const { t } = useTranslation();
	const { prefetch } = useRouter();

	useEffect(() => {
		getInfosId(props?.user?.email);
	}, [getInfosId, props?.user?.email]);

	useEffect(() => {
		prefetch("/empresas");
	}, [prefetch]);

	return (
		<DefaultTemplate>
			<Flex
				flexDirection="column"
				bgColor="#ffffff"
				mb="11.0625rem"
				justifyContent="center"
			>
				<Flex w="100%">
					<Flex w="100%">
						<Img w="100%" h="21.3125rem" src="images/backgrounds/marble.png" />
						<Flex
							w="100%"
							h="21.3125rem"
							bgGradient="linear(to-b, #001a29, #003243)"
							mixBlendMode="multiply"
							transform="matrix(-1, 0, 0, 1, 0, 0)"
							position="absolute"
						/>
					</Flex>
					<Flex
						w="100%"
						h="21.3125rem"
						position="absolute"
						gap={bannerRes ? "unset" : ["unset", "unset", "5%", "5%"]}
						justifyContent={
							bannerRes
								? "space-between"
								: ["unset", "unset", "center", "center"]
						}
						px={["", "", "", "1rem", "unset"]}
					>
						<Flex position="relative" alignItems="center">
							<Text
								w="18rem"
								fontFamily="Poppins"
								fontWeight="600"
								fontSize="2.25rem"
								lineHeight="2.5rem"
								mr="5rem"
								color="#FFFFFF"
								zIndex="docked"
								mt="2.5rem"
							>
								{t("opportunities.investingIs")}
							</Text>
						</Flex>
						<Flex
							h="21.3125rem"
							alignItems="center"
							w={["unset", "unset", "unset", "unset", "50%"]}
							maxWidth="47rem"
						>
							<Flex justifyContent="space-between" w="100%" gap="1.5rem">
								<Flex
									flexDirection="column"
									justifyContent={"center"}
									gap="0.625rem"
								>
									<Flex position={"relative"}>
										<Flex
											borderRadius={"999px"}
											w={"2.3rem"}
											h="2.3rem"
											bg={"#29525f"}
										/>
										<Text
											position={"absolute"}
											color={"white"}
											fontSize={"3xl"}
											fontWeight="700"
											bottom={"25%"}
											left={"15%"}
										>
											1
										</Text>
									</Flex>{" "}
									<Text
										fontFamily="Poppins"
										fontSize="1rem"
										lineHeight="1.5rem"
										color="#FFFFFF"
										w="7.5625rem"
									>
										{t("opportunities.first")}
									</Text>
								</Flex>
								<Flex flexDirection="column" gap="0.625rem">
									<Flex position={"relative"}>
										<Flex
											borderRadius={"999px"}
											w={"2.3rem"}
											h="2.3rem"
											bg={"#29525f"}
										/>
										<Text
											position={"absolute"}
											color={"white"}
											fontSize={"3xl"}
											fontWeight="700"
											bottom={"25%"}
											left={"12%"}
										>
											2
										</Text>
									</Flex>
									<Text
										fontFamily="Poppins"
										fontSize="1rem"
										lineHeight="1.5rem"
										color="#FFFFFF"
										w="7.5625rem"
									>
										{t("opportunities.second")}
									</Text>
								</Flex>
								<Flex flexDirection="column" gap="0.625rem">
									<Flex position={"relative"}>
										<Flex
											borderRadius={"999px"}
											w={"2.3rem"}
											h="2.3rem"
											bg={"#29525f"}
										/>
										<Text
											position={"absolute"}
											color={"white"}
											fontSize={"3xl"}
											fontWeight="700"
											bottom={"25%"}
											left={"12%"}
										>
											3
										</Text>
									</Flex>{" "}
									<Text
										fontFamily="Poppins"
										fontSize="1rem"
										lineHeight="1.5rem"
										color="#FFFFFF"
										w="7.5625rem"
									>
										{t("opportunities.third")}
									</Text>
								</Flex>
								<Flex flexDirection="column" gap="0.625rem" pt="0.2rem">
									<Flex position={"relative"}>
										<Flex
											borderRadius={"999px"}
											w={"2.3rem"}
											h="2.3rem"
											bg={"#29525f"}
										/>
										<Img
											position={"absolute"}
											src="/icons/check.svg"
											bottom={"-2%"}
											left={"-2%"}
										/>
									</Flex>{" "}
									<Text
										fontFamily="Poppins"
										fontSize="1rem"
										lineHeight="1.5rem"
										color="#FFFFFF"
										w="11.125rem"
									>
										{t("opportunities.fourth")}
									</Text>
								</Flex>
							</Flex>
						</Flex>
					</Flex>
				</Flex>
				<Flex
					px="1.5rem"
					mt="2.9375rem"
					flexDirection="column"
					justifyContent="center"
					alignItems="center"
				>
					<Flex
						alignItems={[
							"unset",
							"unset",
							"unset",
							"start",
							"center",
							"center",
						]}
						flexWrap="wrap"
						gap="1.5rem"
						flexDirection={["unset", "unset", "unset", "column", "row", "row"]}
						fontFamily="Poppins"
					>
						<Text fontSize="0.875rem" lineHeight="1.25rem" color="#2D3748">
							{t("opportunities.orderBy")}
						</Text>

						<Flex
							alignItems={[
								"unset",
								"unset",
								"unset",
								"start",
								"center",
								"center",
							]}
							flexWrap="wrap"
							gap="1.9375rem"
							flexDirection={[
								"unset",
								"unset",
								"unset",
								"column",
								"row",
								"row",
							]}
						>
							<MenuInputs />
							{/* <Text fontSize="0.875rem" lineHeight="1.25rem" color="#2D3748">
								1 resultados
							</Text> */}
						</Flex>
					</Flex>
					<Flex mt="2.9375rem" w="100%" justifyContent="center">
						<OpportunitiesCards
							investorId={props?.user?.investor_pf}
							token={props.token}
						/>
					</Flex>
				</Flex>
			</Flex>
		</DefaultTemplate>
	);
};
