import React, { useMemo, useState } from "react";
import {
	Button,
	Checkbox,
	Flex,
	Img,
	Input,
	InputGroup,
	InputRightElement,
	SlideFade,
	Text,
} from "@chakra-ui/react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import PasswordStrengthBar from "react-password-strength-bar";
import { useToasty } from "../../hooks/useToasty";
import { fetchChangePassword } from "../../services/fetchChangePassword";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import { fetchCreateUser } from "../../services/fetchCreateUser";
import { RegisterSteps } from "../../components/Register/RegisterSteps";
import { useRegister } from "../../hooks";
import { BsArrowLeftShort } from "react-icons/bs";
import { RiCheckFill } from "react-icons/ri";
import { apiInstance } from "../../services/api";
import { useUser } from "../../hooks/useUser";

type ComponentProps = {};

export const CreateAccountContainer: React.FC<ComponentProps> = props => {
	const { toast } = useToasty();
	const { t } = useTranslation();
	const { push } = useRouter();
	const api = apiInstance();
	const { getInfosId } = useUser();

	const [firstStep, setFirstStep] = useState<boolean>(true);
	const [secondStep, setSecondStep] = useState<boolean>(false);
	const [email, setEmail] = useState<any>();
	const [password, setPassword] = useState<any>();
	const [canSend, setCanSend] = useState(false);
	const [buttonScore, setButtonScore] = useState<any>();
	const [isButtonValid, setIsButtonValid] = useState<any>();
	const [firstPassword, setFirstPassword] = useState<any>();
	const [secondPassword, setSecondPassword] = useState<any>();
	const [showPasswordInputOne, setShowPasswordInputOne] =
		useState<boolean>(true);
	const [showPasswordInputTwo, setShowPasswordInputTwo] =
		useState<boolean>(true);

	useMemo(() => {
		if (buttonScore < 2 || firstPassword !== secondPassword) {
			setIsButtonValid(false);
		} else {
			setPassword(secondPassword);
			setIsButtonValid(true);
		}
	}, [buttonScore, firstPassword, secondPassword]);

	const handleVerifyPasswordChange = async () => {
		const emailAndPassword = { email, password };
		try {
			await fetchCreateUser(emailAndPassword);
			const data: any = await api.post("/user/authenticate", {
				email: emailAndPassword.email,
				password: emailAndPassword.password,
			});
			getInfosId(data?.data?.user?.email);

			toast({
				id: "toast-login-suc",
				position: "top-right",
				status: "success",
				title: t("toast.accountCreated"),
				description: t("toast.accountCreatedDesc"),
			});
			push(!data?.data ? "/" : "/oportunidades");
		} catch (err) {
			toast({
				id: "toast-login-suc",
				position: "top-right",
				status: "error",
				title: "Error",
				description: "Go back and do it again or try again later",
			});
			console.error("Error on create an account:", err);
		}
	};

	return (
		<Flex w={"100vw"} h="100vh" flexDirection="column">
			<Flex
				w={"100%"}
				h="9.8125rem"
				justifyContent="center"
				bgGradient="linear(to-b, #001a29, #003243)"
			>
				<Text
					fontFamily="Poppins"
					fontStyle="normal"
					fontWeight="600"
					fontSize="1.875rem"
					color="#ffffff"
					lineHeight="2.25rem"
					mb="2.6875rem"
					left={"5%"}
					top={"6%"}
					position={"absolute"}
				>
					{t("register.hello")}
				</Text>
				<Img
					objectFit={"cover"}
					src="/images/vestar-assets/textureVestar.png"
				/>
			</Flex>

			<Flex
				flexDir={"column"}
				zIndex={"99"}
				p="3rem"
				borderRadius={"12px"}
				bg="white"
				w={"100vw"}
				h="100%"
				justifyContent={"center"}
				alignItems="center"
				boxShadow="0rem 1.25rem 1.5625rem rgba(31, 41, 55, 0.1), 0rem 0.625rem 0.625rem rgba(31, 41, 55, 0.04)"
			>
				<RegisterSteps />

				{firstStep ? (
					<SlideFade in={firstStep} offsetY="-30px">
						<Text
							bgGradient="linear(to-r, #003243, #9ccbd6 )"
							bgClip="text"
							fontSize="1.2rem"
							fontWeight="extrabold"
						>
							Create your account
						</Text>
						<Flex
							flexDirection="column"
							mt="1rem"
							gap="12px"
							w={"25rem"}
							zIndex={"99"}
						>
							<Text
								flexDirection="column"
								fontStyle="normal"
								fontWeight="500"
								fontSize="0.875rem"
								lineHeight="1.25rem"
								color="#003243"
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
							/>
						</Flex>
						<Flex
							id="Insert new password"
							flexDirection="column"
							mt="1rem"
							w={"25rem"}
							zIndex={"99"}
						>
							<Flex flexDirection="column" gap="0.5rem">
								<Text
									flexDirection="column"
									fontStyle="normal"
									fontWeight="500"
									fontSize="0.875rem"
									lineHeight="1.25rem"
									color="#003243"
									display={"flex"}
								>
									{t("forgotPassword.newPassword") as string}
								</Text>
								<InputGroup size="md">
									<Input
										placeholder={t("forgotPassword.typeHere") as string}
										_placeholder={{ color: "rgba(0, 0, 0, 0.36)" }}
										border="0.0938rem solid #E2E8F0"
										type={showPasswordInputOne ? "password" : "text"}
										_hover={{}}
										fontStyle="normal"
										fontWeight="400"
										fontSize="0.875rem"
										lineHeight="1.25rem"
										borderRadius="0.375rem"
										h="2rem"
										pl="0.7rem"
										color="#2D3748"
										onChange={e => setFirstPassword(e.target.value)}
									/>
									<InputRightElement
										display={"flex"}
										onClick={() =>
											setShowPasswordInputOne(!showPasswordInputOne)
										}
										alignItems="center"
										_hover={{ cursor: "pointer" }}
										pb="0.55rem"
									>
										{showPasswordInputOne ? (
											<AiOutlineEyeInvisible size={25} color="#2D3748" />
										) : (
											<AiOutlineEye size={25} color="#2D3748" />
										)}
									</InputRightElement>
								</InputGroup>
								<Text
									fontWeight={"400"}
									fontSize={"xs"}
									color={"rgba(0, 0, 0, 0.36)"}
								>
									{t("forgotPassword.mustContain") as string}
								</Text>
							</Flex>
							<Flex flexDirection="column" gap="0.5rem" mt={"1.5rem"}>
								<Text
									flexDirection="column"
									fontStyle="normal"
									fontWeight="500"
									fontSize="0.875rem"
									lineHeight="1.25rem"
									color="#003243"
									display={"flex"}
								>
									{t("forgotPassword.confirmPassword") as string}
								</Text>
								<InputGroup size="md">
									<Input
										placeholder={t("forgotPassword.typeHere") as string}
										_placeholder={{ color: "rgba(0, 0, 0, 0.36)" }}
										border="0.0938rem solid #E2E8F0"
										type={showPasswordInputTwo ? "password" : "text"}
										_hover={{}}
										fontStyle="normal"
										fontWeight="400"
										fontSize="0.875rem"
										lineHeight="1.25rem"
										borderRadius="0.375rem"
										h="2rem"
										pl="0.7rem"
										color="#2D3748"
										onChange={e => setSecondPassword(e.target.value)}
									/>
									<InputRightElement
										display={"flex"}
										onClick={() =>
											setShowPasswordInputTwo(!showPasswordInputTwo)
										}
										alignItems="center"
										_hover={{ cursor: "pointer" }}
										pb="0.55rem"
									>
										{showPasswordInputTwo ? (
											<AiOutlineEyeInvisible size={25} color="#2D3748" />
										) : (
											<AiOutlineEye size={25} color="#2D3748" />
										)}
									</InputRightElement>
								</InputGroup>
								<PasswordStrengthBar
									onChangeScore={(score, feedback) => setButtonScore(score)}
									minLength={8}
									password={firstPassword}
								/>
							</Flex>
							<Flex mt={"10"} gap="2">
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
									_hover={{
										cursor: "pointer",
										bgColor: "#003243",
										boxShadow:
											"0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)",
									}}
									onClick={() => {
										setFirstStep(true);
										setSecondStep(false);
										push("/");
									}}
								>
									{t("register.back")}
								</Button>
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
									_hover={{
										cursor: "pointer",
										bgColor: "#003243",
										boxShadow:
											"0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)",
									}}
									isDisabled={isButtonValid === false}
									onClick={() => {
										setFirstStep(false);
										setSecondStep(true);
									}}
								>
									{t("register.nextStep")}
								</Button>
							</Flex>
						</Flex>
					</SlideFade>
				) : (
					<SlideFade in={!firstStep} offsetY="-30px">
						<Flex flexDirection="column" gap="1.625rem">
							<Flex flexDirection="column" gap="0.5rem">
								<Flex>
									<Text
										fontFamily="Poppins"
										fontStyle="normal"
										fontWeight="500"
										fontSize="0.875rem"
										lineHeight="1.25rem"
										color="#2D3748"
									>
										{t("register.termsAnd") as any}
									</Text>
								</Flex>
								<Flex
									borderRadius="0.375rem"
									border="0.0625rem solid #E2E8F0"
									w="47.4375rem"
									h="17.75rem"
									padding="22px 22px 0 22px"
									mr="1rem"
								>
									<Flex
										id="scrollbar"
										overflowX="hidden"
										overflowY="auto"
										gap="1rem"
									>
										<Text
											color="#171923"
											fontFamily="Poppins"
											fontStyle="normal"
											fontWeight="400"
											fontSize="0.75rem"
											lineHeight="1rem"
											textAlign="justify"
											mr="1.0625rem"
										>
											Lorem ipsum dolor sit amet consectetur. Pellentesque vel
											malesuada accumsan mattis quis elit lectus vitae. Ut
											aliquam pellentesque nascetur proin eget bibendum
											penatibus senectus. Quis turpis arcu maecenas viverra.
											Posuere semper duis morbi lobortis amet a. Adipiscing
											cursus in lectus tortor ullamcorper eget. Vitae diam quam
											et euismod. Eget sed metus est pharetra euismod est
											faucibus. Pharetra faucibus posuere volutpat cursus velit
											viverra vitae fringilla. Arcu consectetur viverra non
											tempus. Consequat faucibus tortor bibendum nisl enim
											accumsan id nec quis. Malesuada cursus donec nulla vel
											condimentum ut augue. Auctor venenatis malesuada ultrices
											diam enim integer vitae tincidunt adipiscing. Sed enim
											neque pellentesque lacus nunc. Vitae pellentesque eu in
											scelerisque. Faucibus quam in maecenas phasellus id tempus
											senectus molestie eros. Dolor nunc vivamus neque convallis
											vestibulum pellentesque urna. Massa proin amet iaculis
											elementum quisque enim. Adipiscing molestie imperdiet
											pellentesque arcu ultrices facilisi dolor phasellus. Velit
											vulputate lacus mauris senectus porta malesuada nibh
											sollicitudin sagittis. Adipiscing cursus in lectus tortor
											ullamcorper eget. Vitae diam quam et euismod. Eget sed
											metus est pharetra euismod est faucibus. Pharetra faucibus
											posuere volutpat cursus velit viverra vitae fringilla.
											Arcu consectetur viverra non tempus. Consequat faucibus
											tortor bibendum nisl enim accumsan id nec quis. Malesuada
											cursus donec nulla vel condimentum ut augue. Auctor
											venenatis malesuada ultrices diam enim integer vitae
											tincidunt adipiscing. eros. Dolor nunc vivamus neque
											convallis vestibulum pellentesque urna. Massa proin amet
											iaculis elementum quisque enim. Adipiscing molestie
											imperdiet pellentesque arcu ultrices facilisi dolor
											phasellus. Velit vulputate lacus mauris senectus porta
											malesuada nibh sollicitudin sagittis. Adipiscing cursus in
											lectus tortor ullamcorper eget. Vitae diam quam et
											euismod. Eget sed metus est pharetra euismod est faucibus.
											Pharetra faucibus posuere volutpat cursus velit viverra
											vitae fringilla. Arcu consectetur viverra non tempus.
											Consequat faucibus tortor bibendum nisl enim accumsan id
											nec quis. Malesuada cursus donec nulla vel condimentum ut
											augue. Auctor venenatis malesuada ultrices diam enim
											integer vitae tincidunt adipiscing.
										</Text>
									</Flex>
								</Flex>
							</Flex>
							<Flex flexDirection="column" fontFamily="Poppins" gap="2.125rem">
								<Flex gap="0.75rem">
									<Checkbox
										defaultChecked={false}
										spacing="0.75rem"
										variant="green"
										icon={<RiCheckFill size={20} />}
										borderColor="#E2E8F0"
										onChange={() => {
											setCanSend(!canSend), setSecondStep(!secondStep);
										}}
									/>
									<Text
										fontSize="0.875rem"
										lineHeight="1.25rem"
										color="#003243"
									>
										{t("register.iAgree") as any}
									</Text>
								</Flex>
								<Flex
									gap="1.5rem"
									justifyContent={"center"}
									alignItems="center"
								>
									<Button
										w="9.25rem"
										h="2.2rem"
										justifyContent="center"
										alignItems="center"
										gap="0.5rem"
										bgColor="transparent"
										border="1px solid #323841"
										color="#003243"
										_hover={{ bgColor: "#F7FAFC" }}
										fontFamily="Poppins"
										fontStyle="normal"
										fontWeight="500"
										fontSize="0.875rem"
										lineHeight="1.25rem"
										borderRadius="0.5rem"
										onClick={() => {
											setFirstStep(true), setSecondStep(false);
											setCanSend(false);
										}}
									>
										<BsArrowLeftShort size={22} />
										{t("register.back") as any}
									</Button>
									<Button
										fontStyle="normal"
										fontWeight="500"
										fontSize="0.875rem"
										lineHeight="1.25rem"
										color="#FFFFFF"
										border="none"
										borderRadius="0.5rem"
										w="50%"
										h="2.2rem"
										bgColor="#003243"
										_hover={{
											cursor: "pointer",
											bgColor: "#003243",
											boxShadow:
												"0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)",
										}}
										isDisabled={isButtonValid && canSend === false}
										onClick={() => handleVerifyPasswordChange()}
									>
										{t("forgotPassword.confirm")}
									</Button>
								</Flex>
							</Flex>
						</Flex>
					</SlideFade>
				)}
			</Flex>
		</Flex>
	);
};
