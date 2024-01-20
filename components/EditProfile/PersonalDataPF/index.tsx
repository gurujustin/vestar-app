import {
	Button,
	Collapse,
	Flex,
	Img,
	Input,
	InputGroup,
	InputRightElement,
	Text,
} from "@chakra-ui/react";
import { FunctionComponent, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import PasswordStrengthBar from "react-password-strength-bar";
import { useRouter } from "next/router";
import { useUser } from "../../../hooks/useUser";
import { useToasty } from "../../../hooks/useToasty";
import { fetchEditInvestorPF } from "../../../services";
import { InputComponent } from "../../Inputs/DeafultInput/InputComponent";
import { SelectComponent } from "../../Select/SelectComponent";
import { formatPhoneNumber } from "../../../utils/formatPhoneNumber";
import { formatCPF } from "../../../utils/formatCpf";
import { estadosCivis } from "../mockedData/estadosCivis";
import { estadosRegimesPatrimoniais } from "../mockedData/estadosRegimesPatrimoniais";

interface IChangePassword {
	data?: any;
	token?: any;
}

export const PersonalDataPF: React.FC<IChangePassword> = props => {
	const { data, token } = props;
	const [isDisabled, setIsDisabled] = useState(true);
	const [maritalStatus, setMaritalStatus] = useState<any>(
		data?.marital_status?.status
	);
	const { t } = useTranslation();
	const isMerried: boolean = maritalStatus === "Casado(a)" ? true : false;
	const isStableUnion: boolean =
		maritalStatus === "União Estável" ? true : false;
	const [equityRegime, setEquityRegime] = useState<any>("");
	const {
		register,
		handleSubmit,
		control,
		formState: { isSubmitSuccessful },
		reset,
	} = useForm();
	const { userInfos } = useUser();
	const { toast } = useToasty();
	const dataFormatada = new Date(data?.birthday_date)
		.toISOString()
		.split("T")[0];

	const onSubmitForm = async (data: any) => {
		let request: any;
		let value: any;

		value = isMerried
			? {
					status: maritalStatus,
					equity_regime: isMerried ? equityRegime : null,
					spouse_name: isMerried ? data.spouse_name : null,
					spouse_cpf: isMerried ? data.spouse_cpf : null,
					spouse_rg: isMerried ? data.spouse_rg : null,
					spouse_address: isMerried ? data.spouse_address : null,
			  }
			: {
					status: maritalStatus,
					partners_name: isStableUnion ? data.partners_name : null,
					partners_cpf: isStableUnion ? data.partners_cpf : null,
					partners_rg: isStableUnion ? data.partners_rg : null,
					partners_address: isStableUnion ? data.partners_address : null,
			  };

		request = {
			full_name: data.full_name,
			birthday_date: new Date(data.birthday_date),
			cpf: data.cpf.replace(/[^\w]/gi, "").replace(/\s+/g, ""),
			email: data.email,
			phone_number: data.phone_number
				.replace(/[^\w]/gi, "")
				.replace(/\s+/g, ""),
			city_of_birth: data.city_of_birth,
			rg: data.rg,
			profession: data.profession,
			address: data.address,
			marital_status: value,
		};

		await fetchEditInvestorPF(userInfos, request, token)
			.then(res => {
				if (res) {
					toast({
						id: "toast-edit",
						position: "top-right",
						status: "success",
						title: t("editProfile.toastTitle"),
						description: t("editProfile.toastDescription"),
					});
				}
			})
			.catch(err => {
				console.log({ err });
			});
	};

	return (
		<Flex w="100%" justifyContent="end">
			<Flex flexDirection="column" gap="2.75rem" w="100%" maxWidth="47.4375rem">
				<Flex gap="1.5rem" alignItems="center">
					<Img src="/icons/Avatar.png" w="6rem" h="6rem" />
					<Text
						fontFamily="Poppins"
						fontWeight="600"
						fontSize="1.5rem"
						lineHeight="2rem"
						alignItems="center"
						color="#171923"
					>
						{t("editProfile.edit")}
					</Text>
				</Flex>

				<form onSubmit={handleSubmit(onSubmitForm)}>
					<Flex justifyContent="space-between" w="100%">
						<Flex
							flexDirection="column"
							fontFamily="Poppins"
							fontStyle="normal"
							fontSize="0.875rem"
							lineHeight="1.25rem"
							color="#2D3748"
							w="100%"
							maxWidth="18.5rem"
							gap="1.5rem"
						>
							<Flex flexDirection="column" gap="0.25rem" mb="2.75rem">
								<InputComponent
									placeholderText={t("inputs.insertHere") as any}
									label={t("editProfile.name") as string}
									type="text"
									{...register("full_name")}
									defaultValue={data?.full_name}
								/>
								<InputComponent
									placeholderText={t("inputs.insertHere") as any}
									label={t("editProfile.city") as string}
									type="text"
									{...register("city_of_birth")}
									defaultValue={data?.city_of_birth}
								/>
								<InputComponent
									placeholderText={t("inputs.insertHere") as any}
									label={t("register.birthDate") as string}
									type="date"
									{...register("birthday_date")}
									defaultValue={dataFormatada}
								/>
								<InputComponent
									placeholderText={t("inputs.insertHere") as any}
									label={t("register.socialNumber") as string}
									type="text"
									maskType={"CPF"}
									{...register("cpf")}
									defaultValue={formatCPF(data?.cpf)}
								/>
								<InputComponent
									placeholderText={t("inputs.insertHere") as any}
									label={t("editProfile.rg") as string}
									type="text"
									{...register("rg")}
									defaultValue={data?.rg}
								/>
							</Flex>
						</Flex>
						<Flex
							flexDirection="column"
							gap="0.25rem"
							fontFamily="Poppins"
							fontStyle="normal"
							fontSize="0.875rem"
							lineHeight="1.25rem"
							w="20rem"
						>
							<SelectComponent
								defaultValue={data?.marital_status?.status}
								setData={setMaritalStatus}
								label={t("editProfile.civil") as string}
								type="marital"
								selectValue={estadosCivis}
								{...register("status")}
							/>
							<Collapse in={maritalStatus === "Casado(a)" && isMerried}>
								<SelectComponent
									defaultValue={data.marital_status?.equity_regime}
									setData={setEquityRegime}
									label={t("editProfile.regimePatrimonial") as string}
									type="regime_patrimonial"
									selectValue={estadosRegimesPatrimoniais}
									{...register("equity_regime")}
								/>
								<InputComponent
									placeholderText={t("inputs.insertHere") as any}
									label={t("editProfile.spousesName") as string}
									type="text"
									{...register("spouse_name")}
									defaultValue={data?.marital_status?.spouse_name}
								/>
								<InputComponent
									placeholderText={t("inputs.insertHere") as any}
									label={t("editProfile.spouseSocialNumber") as string}
									type="text"
									maskType={"CPF"}
									{...register("spouse_cpf")}
									defaultValue={formatCPF(data?.marital_status?.spouse_cpf)}
								/>
								<InputComponent
									placeholderText={t("inputs.insertHere") as any}
									label={t("editProfile.spousesRG") as string}
									type="text"
									{...register("spouse_rg")}
									defaultValue={data?.marital_status?.spouse_rg}
								/>
								<InputComponent
									placeholderText={t("inputs.insertHere") as any}
									label={t("editProfile.spousesAddress") as string}
									type="text"
									{...register("spouse_address")}
									defaultValue={data?.marital_status?.spouse_address}
								/>
							</Collapse>
							<Collapse in={maritalStatus === "União Estável" && isStableUnion}>
								<InputComponent
									placeholderText={t("inputs.insertHere") as any}
									label={t("editProfile.partnersName") as string}
									type="text"
									{...register("partners_name")}
									defaultValue={data?.marital_status?.partners_name}
								/>
								<InputComponent
									placeholderText={t("inputs.insertHere") as any}
									label={t("editProfile.partnersSocialNumber") as string}
									type="text"
									maskType={"CPF"}
									{...register("partners_cpf")}
									defaultValue={formatCPF(data?.marital_status?.partners_cpf)}
								/>
								<InputComponent
									placeholderText={t("inputs.insertHere") as any}
									label={t("editProfile.partnersRG") as string}
									type="text"
									{...register("partners_rg")}
									defaultValue={data?.marital_status?.partners_rg}
								/>
								<InputComponent
									placeholderText={t("inputs.insertHere") as any}
									label={t("editProfile.partnersAddress") as string}
									type="text"
									{...register("partners_address")}
									defaultValue={data?.marital_status?.partners_address}
								/>
							</Collapse>
							<InputComponent
								placeholderText={t("inputs.insertHere") as any}
								label={t("editProfile.address") as string}
								type="text"
								{...register("address")}
								defaultValue={data?.address}
							/>
							<InputComponent
								placeholderText={t("inputs.insertHere") as any}
								label={t("editProfile.occupation") as string}
								type="text"
								{...register("profession")}
								defaultValue={data?.profession}
							/>
							<InputComponent
								placeholderText={t("inputs.insertHere") as any}
								label={t("editProfile.email") as string}
								type="email"
								{...register("email")}
								defaultValue={data?.email}
							/>
							<InputComponent
								placeholderText={t("inputs.insertHere") as any}
								label={t("editProfile.phone") as string}
								type="text"
								maskType={"Telefone"}
								{...register("phone_number")}
								defaultValue={formatPhoneNumber(data?.phone_number)}
							/>
						</Flex>
					</Flex>
					<Flex w="100%" justifyContent="flex-start">
						<Button
							w="13.375rem"
							h="2rem"
							background="#2D3748"
							borderRadius="0.5rem"
							fontFamily="Poppins"
							fontWeight="500"
							fontSize="0.875rem"
							lineHeight="1.25rem"
							color="#FFFFFF"
							_hover={isDisabled ? { opacity: "0.3" } : { bgColor: "#171923" }}
							_active={{}}
							type="submit"
						>
							{t("editProfile.saved") as string}
						</Button>
					</Flex>
				</form>
			</Flex>
		</Flex>
	);
};
