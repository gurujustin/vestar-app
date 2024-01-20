import { Flex, Img, SimpleGrid, Text } from "@chakra-ui/react";
import { FunctionComponent } from "react";
import { ICompanieMembers } from "./dto";

export const CompanieMember: FunctionComponent<ICompanieMembers> = ({
	image,
	name,
	position,
}) => {
	return (
		<Flex flexDirection="column" gap="0.5rem" alignItems="center">
			<Flex w="4rem" h="4rem">
				<Img src={`/api/file/${image}`} />
			</Flex>
			<Flex
				fontFamily="Poppins"
				fontSize="0.875rem"
				lineHeight="1.25rem"
				alignItems="center"
				color="#171923"
				gap="0.25rem"
				flexDirection="column"
			>
				<Text>{name}</Text>
				<Text fontWeight="400">{position}</Text>
			</Flex>
		</Flex>
	);
};

export const CompanieMembers: FunctionComponent<any> = ({
	image,
	name,
	position,
}) => {
	return (
		<SimpleGrid
			columns={{ sm: 1, md: 2, lg: 3, xl: 3 }}
			spacing={["unset", "unset", "unset", "4rem", "6.625rem"]}
			w="fit-content"
			rowGap="2.75rem"
			mt="2rem"
		>
			<CompanieMember image={image} name={name} position={position} />
		</SimpleGrid>
	);
};
