import { Button, ButtonProps, Flex, Img, Input, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FunctionComponent, useEffect, useState } from "react";
import { useUser } from "../../hooks/useUser";
import { apiInstance } from "../../services/api";
import { useTranslation } from "react-i18next";
import { useToasty } from "../../hooks/useToasty";

export const Login: FunctionComponent<ButtonProps> = () => {
	const { push, prefetch } = useRouter();
	const { getInfosId } = useUser();
	const { toast } = useToasty();
	const api = apiInstance();
	const { t } = useTranslation();
	const [email, setEmail] = useState<any>();
	const [password, setPassword] = useState<any>();

	const handleLogin = async () => {
		try {
			const data: any = await api.post("/user/authenticate", {
				email: email,
				password: password,
			});
			getInfosId(email);
			toast({
				id: "toast-login-suc",
				position: "top-right",
				status: "success",
				title: "Seja bem-vindo!",
			});
			push(!data?.data ? "/" : "/oportunidades");
		} catch (error: any) {
			toast({
				id: "toast-login-error",
				position: "top-right",
				status: "error",
				title: "Email ou senha incorretos!",
			});
			return;
		}
	};

	const handleKeyPress = (event: any) => {
		if (event.key === "Enter") {
			handleLogin();
		}
	};

	useEffect(() => {
		prefetch("/oportunidades");
	}, [prefetch]);

	return (
		<Flex width="100vw" height="100vh" justifyContent="space-between">
			<Flex
				flex="1"
				h="100vh"
				justifyContent="center"
				alignItems="center"
				fontFamily="Poppins"
				zIndex={"99"}
				bgGradient="linear(to-b, #001a29, #003243)"
			>
				<Flex
					bgColor="#ffffff"
					flexDirection="column"
					justifyContent="center"
					w={{
						base: "50%",
						md: "45%",
						lg: "35%",
						xl: "35%",
						"2xl": "24%",
					}}
					borderRadius="10px"
					boxShadow="0rem 1.25rem 1.5625rem rgba(31, 41, 55, 0.1), 0rem 0.625rem 0.625rem rgba(31, 41, 55, 0.04)"
					p={"3rem"}
				>
					<Flex flexDirection="column" gap="2">
						<Img
							w={"7rem"}
							src="/images/vestar-assets/Asset5.svg"
							transition={"0.8s"}
							_hover={{ opacity: 0.6 }}
						/>
						<Text
							color="#003243"
							fontSize="0.875rem"
							fontWeight="normal"
							lineHeight="150%"
							fontStyle="normal"
						>
							{t("login.liveInvesting")}
						</Text>
					</Flex>
					<Flex flexDirection="column" mt="1rem" gap="12px">
						<Text
							flexDirection="column"
							fontStyle="normal"
							fontWeight="500"
							fontSize="0.875rem"
							lineHeight="1.25rem"
							color="#2D3748"
						>
							E-mail
						</Text>
						<Input
							placeholder={t("login.placeholderEmail") as any}
							_placeholder={{ color: "rgba(0, 0, 0, 0.36)" }}
							border="0.0938rem solid #E2E8F0"
							_hover={{}}
							_focus={{}}
							fontStyle="normal"
							fontWeight="400"
							fontSize="0.875rem"
							lineHeight="1.25rem"
							borderRadius="0.375rem"
							h="2rem"
							pl="0.7rem"
							color="#2D3748"
							onChange={e => setEmail(e.target.value)}
							onKeyPress={handleKeyPress}
						/>
					</Flex>
					<Flex flexDirection="column" mt="1.5rem" gap="0.75rem">
						<Flex justifyContent="space-between" alignItems="center">
							<Text
								flexDirection="column"
								fontStyle="normal"
								fontWeight="500"
								fontSize="0.875rem"
								lineHeight="1.25rem"
								color="#2D3748"
							>
								{t("login.password")}
							</Text>
							<Text
								flexDirection="column"
								fontStyle="normal"
								fontWeight="500"
								fontSize="0.75rem"
								lineHeight="1rem"
								color="#003243"
								transition="0.7s"
								_hover={{ opacity: 0.8, cursor: "pointer" }}
								onClick={() => push("/recover_password")}
							>
								{t("login.forgot")}
							</Text>
						</Flex>
						<Input
							placeholder={t("login.placeholderSenha") as any}
							_placeholder={{ color: "rgba(0, 0, 0, 0.36)" }}
							border="0.0938rem solid #E2E8F0"
							_hover={{}}
							_focus={{}}
							fontStyle="normal"
							fontWeight="400"
							fontSize="0.875rem"
							lineHeight="1.25rem"
							borderRadius="0.375rem"
							h="2rem"
							pl="0.7rem"
							color="#2D3748"
							onChange={e => setPassword(e.target.value)}
							type={"password"}
							onKeyPress={handleKeyPress}
						/>
					</Flex>
					<Flex mt="2.5rem">
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
							bgColor="#003243"
							onClick={handleLogin}
							transition="0.7s"
							_hover={{ opacity: 0.8, cursor: "pointer" }}
						>
							Login
						</Button>
					</Flex>
					<Flex bgColor="#E2E8F0" h="0.0625rem" w="100%" mt="2rem" />
					<Flex
						justifyContent="center"
						alignItems="center"
						mt="1.5rem"
						gap="1rem"
					>
						<Text
							fontStyle="normal"
							fontWeight="normal"
							fontSize="0.75rem"
							lineHeight="150%"
							color="#2D3748"
						>
							{t("login.noAccount")}
						</Text>
						<Button
							type="submit"
							fontStyle="normal"
							fontWeight="500"
							fontSize="0.75rem"
							lineHeight="1rem"
							color="#003243"
							bg={"transparent"}
							onClick={() => push("/criar_conta")}
							transition="0.7s"
							_hover={{ opacity: 0.6 }}
						>
							{t("login.register")}
						</Button>
					</Flex>
				</Flex>
			</Flex>
		</Flex>
	);
};
