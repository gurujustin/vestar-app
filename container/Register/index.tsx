import React, { FunctionComponent } from "react";
import { RegisterSteps } from "../../components/Register/RegisterSteps";
import { Flex, Img, Text } from "@chakra-ui/react";
import { RegisterContent } from "../../components/Register/RegisterContent";
import { useTranslation } from "react-i18next";

export const RegisterContainer: FunctionComponent = (props: any) => {
	const { token } = props;
	const { t } = useTranslation();

	return (
		<Flex w="100vw" h="100vh" bgColor="#ffffff" justifyContent="center">
			<Flex w="100%" h="100%" flexDirection="column" gap="2.875rem">
				<Flex flexDirection="column" gap="2.75rem">
					<Flex
						w="100%"
						h="9.8125rem"
						bgColor="#1789A3"
						borderRadius="0px 0px 12px 12px"
						alignItems="flex-end"
						pl="8.0625rem"
						justifyContent="space-between"
					>
						<Text
							fontFamily="Poppins"
							fontStyle="normal"
							fontWeight="600"
							fontSize="1.875rem"
							color="#ffffff"
							lineHeight="2.25rem"
							mb="2.6875rem"
						>
							{t("register.hello")}
						</Text>
					</Flex>
					<Flex justifyContent="center" alignItems="center">
						<RegisterSteps />
					</Flex>
				</Flex>
				<Flex w="100%" h="100%" alignItems="center" flexDirection="column">
					<RegisterContent token={token} />
				</Flex>
			</Flex>
		</Flex>
	);
};
