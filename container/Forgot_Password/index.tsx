import {
	Flex,
	Text,
	Button,
	Img,
	Input,
	InputGroup,
	ScaleFade,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { FunctionComponent, useState } from "react";
import { useTranslation } from "react-i18next";
import { fetchEmailVerify } from "../../services/fetchEmailVerify";

export const Recover_PasswordContainer: FunctionComponent = () => {
	const [emailPage, setEmailPage] = useState<boolean>(true);
	const [warnPage, setWarnPage] = useState<boolean>(false);
	const [email, setEmail] = useState<string>("0");
	const { push } = useRouter();
	const { t } = useTranslation();

	const handleSentEmailToVerify = async (email: string) => {
		await fetchEmailVerify(email, "");
	};

	return (
		<Flex
			bgColor="#ffffff"
			width="100vw"
			height="100vh"
			justifyContent="center"
			alignItems="center"
		>
			<ScaleFade in={emailPage || warnPage}>
				<Flex
					flexDirection="column"
					w="20rem"
					justifyContent="center"
					fontFamily="Poppins"
				>
					<Flex flexDirection="column" gap="0.625rem">
						<Text
							color="#1789A3"
							fontSize="0.875rem"
							fontWeight="normal"
							lineHeight="150%"
							fontStyle="normal"
						>
							{t("forgotPassword.reset") as string}
						</Text>
					</Flex>
					{emailPage && (
						<Flex
							id="Insert email"
							flexDirection="column"
							mt="1rem"
							gap="1.5rem"
						>
							<Text
								fontStyle="normal"
								fontWeight="400"
								fontSize="12px"
								lineHeight="150%"
								color="#2D3748"
								display={"flex"}
							>
								{t("forgotPassword.enter") as string}
							</Text>
							<Flex flexDirection="column" gap="0.5rem">
								<Text
									flexDirection="column"
									fontStyle="normal"
									fontWeight="500"
									fontSize="0.875rem"
									lineHeight="1.25rem"
									color="#2D3748"
									display={"flex"}
								>
									E-mail
								</Text>
								<InputGroup size="md">
									<Input
										placeholder={"exemplo@exemplo.com"}
										_placeholder={{ color: "rgba(0, 0, 0, 0.36)" }}
										border="0.0938rem solid #E2E8F0"
										type={"email"}
										_hover={{}}
										fontStyle="normal"
										fontWeight="400"
										fontSize="0.875rem"
										lineHeight="1.25rem"
										borderRadius="0.375rem"
										h="2rem"
										pl="0.7rem"
										color="#2D3748"
										onChange={e => setEmail(e.target.value)}
									/>
								</InputGroup>
							</Flex>
							<Flex flexDir={"column"} gap="1.25rem" alignItems={"center"}>
								<Button
									fontStyle="normal"
									fontWeight="500"
									fontSize="0.875rem"
									lineHeight="1.25rem"
									color="#FFFFFF"
									border="none"
									borderRadius="0.5rem"
									w="100%"
									h="2.2rem"
									bgColor="#1789A3"
									_hover={{
										cursor: "pointer",
										bgColor: "#007D99",
										boxShadow:
											"0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)",
									}}
									onClick={() => {
										setEmailPage(false);
										setWarnPage(true);
										handleSentEmailToVerify(email);
									}}
									isDisabled={email <= "0" ? true : false}
								>
									{t("forgotPassword.send") as string}
								</Button>
								<Text
									fontStyle="normal"
									fontWeight="500"
									fontSize="0.875rem"
									color="#007D99"
									border="none"
									borderRadius="0.5rem"
									w="max"
									bgColor="transparent"
									_hover={{ cursor: "pointer", opacity: "0.3" }}
									transition={"0.4s"}
									onClick={() => push("/")}
								>
									{t("forgotPassword.backTo") as string}
								</Text>
							</Flex>
						</Flex>
					)}
					<ScaleFade in={warnPage}>
						<Flex
							id="Insert pin"
							flexDirection="column"
							mt="1rem"
							display={warnPage ? "flex" : "none"}
						>
							<Text
								mt="0.5rem"
								fontStyle="normal"
								fontWeight="400"
								fontSize="12px"
								color="#2D3748"
								display={"flex"}
							>
								Um link com a recuperação de senha será enviado para seu email.
								Verifique a sua caixa de entrada e/ou spam.
							</Text>
							<Flex mt="1.5rem" mb="1rem" justifyContent="space-between">
								<Button
									fontStyle="normal"
									fontWeight="500"
									fontSize="0.875rem"
									lineHeight="1.25rem"
									color="#FFFFFF"
									border="none"
									borderRadius="0.5rem"
									w="100%"
									h="2.2rem"
									bgColor="#1789A3"
									_hover={{
										cursor: "pointer",
										bgColor: "#007D99",
										boxShadow:
											"0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)",
									}}
									onClick={() => push("/")}
								>
									{t("forgotPassword.backTo") as string}
								</Button>
							</Flex>
							<Flex mt={"1rem"} bgColor="#E2E8F0" h="0.0625rem" w="100%" />
							<Flex justifyContent={"space-evenly"}>
								<Text
									mt="0.5rem"
									fontStyle="normal"
									fontWeight="400"
									fontSize="12px"
									color="#2D3748"
									display={"flex"}
								>
									{t("forgotPassword.noCode") as string}
								</Text>
								<Text
									mt="0.5rem"
									fontStyle="normal"
									fontWeight="500"
									fontSize="12px"
									color="#007D99"
									display={"flex"}
								>
									{t("forgotPassword.resend") as string}
								</Text>
							</Flex>
						</Flex>
					</ScaleFade>
				</Flex>
			</ScaleFade>
		</Flex>
	);
};
