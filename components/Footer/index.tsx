import { Flex, Img, Text } from "@chakra-ui/react";
import { FooterLinks } from "./FooterLinks";
import { useTranslation } from "react-i18next";

export const Footer: React.FC = () => {
	const { t } = useTranslation();
	return (
		<Flex
			w="100%"
			h="max"
			borderTopRadius="2xl"
			bgColor={"#003243"}
			px="2.8125rem"
			py="1rem"
			gap="10rem"
			color="#ffffff"
			flex={"1"}
			mt="11.5rem"
		>
			<Flex flexDir={"column"} gap="0.4375rem">
				<Flex gap={"0.5rem"} alignItems={"center"}>
					<Img
						w={"6rem"}
						src="/images/vestar-assets/Asset8.svg"
						transition={"0.8s"}
						_hover={{ opacity: 0.6 }}
					/>
				</Flex>
				<Text fontSize={"sm"} fontWeight="400">
					{t("login.liveInvesting")}
				</Text>
			</Flex>
		</Flex>
	);
};
