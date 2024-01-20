import { Flex, Img, Text } from "@chakra-ui/react";
import { FunctionComponent } from "react";
import { FiMapPin } from "react-icons/fi";
import { ICompanieDetails } from "./dto";
import { useTranslation } from "react-i18next";

export const CompanieDetails: FunctionComponent<ICompanieDetails> = ({
	banner,
	logo,
	name,
	id,
	location,
	description,
}) => {
	const { t } = useTranslation();
	return (
		<Flex w="44.125rem" flexDirection="column" gap="2.5rem">
			<Flex w="100%" flexDirection="column" borderRadius="0.75rem">
				<Flex
					w="100%"
					background="linear-gradient(102.22deg, #ECECEC 65.27%, #FFFFFF 89.66%)"
					borderRadius="0.75rem"
					h="9.3125rem"
				>
					{banner ? <Img src={banner} h="100%" w="100%" /> : <Flex />}
				</Flex>
				<Flex
					gap="1.5rem"
					pr="1rem"
					pl="0.5rem"
					py="0.875rem"
					w="100%"
					borderBottomRadius="0.75rem"
				>
					<Flex w="6rem" position="relative">
						<Img
							src={logo}
							w="6rem"
							h="6rem"
							borderRadius="3.4375rem"
							position="absolute"
							bottom="0"
						/>
					</Flex>
					<Flex gap="0.375rem" flexDirection="column" fontFamily="Poppins">
						<Text
							fontWeight="600"
							fontSize="1.5rem"
							lineHeight="2rem"
							color="#171923"
							textTransform="uppercase"
						>
							{name}
						</Text>
						<Text fontSize="1rem" lineHeight="1.5rem" color="#718096">
							{id}
						</Text>
					</Flex>
				</Flex>
			</Flex>
			<Flex flexDirection="column" gap="1rem">
				<Flex gap="0.5rem">
					<FiMapPin color="#718096" />
					<Text
						fontFamily="Poppins"
						fontSize={"md"}
						lineHeight="1rem"
						alignItems="center"
						color="#718096"
					>
						{location}
					</Text>
				</Flex>
				<Text fontSize="1rem" lineHeight="1.5rem" color="#171923">
					{t("companieDetails.description")}
				</Text>
			</Flex>
		</Flex>
	);
};
