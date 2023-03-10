import { Button, Flex, Icon, Img, Text } from "@chakra-ui/react";
import { FiCopy } from "react-icons/fi";
import { useState } from "react";
interface IPriceCard {
	axisY: string;
}

export const PriceCard: React.FC<IPriceCard> = props => {
	const { axisY } = props;
	const [isInvestidor, setIsInvestidor] = useState(true);

	return (
		<Flex
			w="23.125rem"
			h={"max"}
			bgColor={"#007D99"}
			p="1.5rem"
			flexDir={"column"}
			borderRadius="0.75rem"
			position={"sticky"}
			top={"50%"}
			boxShadow="0px 20px 25px rgba(31, 41, 55, 0.1), 0px 10px 10px rgba(31, 41, 55, 0.04);"
			color="#ffffff"
		>
			<Text fontSize={"xl"} fontWeight="500">
				Nome da Cota
			</Text>
			{isInvestidor ? (
				<Flex flexDirection="column">
					<Flex
						my="1rem"
						bgColor={"#1789A3"}
						py="0.5rem"
						px="1rem"
						borderRadius="0.5rem"
						justifyContent={"space-between"}
						alignItems="center"
					>
						<Flex flexDir={"column"}>
							<Text fontSize={"xs"} fontWeight="500">
								Selecione a Quantidade
							</Text>
							<Text fontSize={"sm"} fontWeight="400">
								1 cota
							</Text>
						</Flex>

						<Flex>
							<Img _hover={{ cursor: "pointer" }} src={"icons/PlusIcon.png"} />
							<Img _hover={{ cursor: "pointer" }} src={"icons/MinusIcon.png"} />
						</Flex>
					</Flex>
					<Flex
						flexDirection={"column"}
						pb="1rem"
						mb="1rem"
						borderBottom="1px solid #4BA3B7"
					>
						<Flex justifyContent={"space-between"} w="100%">
							<Text fontWeight={"500"}>Total</Text>
							<Text fontWeight={"500"}>R$150</Text>
						</Flex>

						<Flex flexDir={"column"} alignItems="center" mt="1rem">
							<Button
								fontWeight={"500"}
								fontSize={"md"}
								bgColor="#FFFFFF"
								color="#007088"
								w="100%"
								px="10px"
								py="16px"
								mb={"1rem"}
							>
								Quero investir
							</Button>
							<Text fontWeight={"400"} fontSize={"xs"}>
								Você ainda não será cobrado.
							</Text>
						</Flex>
					</Flex>
				</Flex>
			) : (
				<Flex
					fontFamily="Poppins"
					fontStyle="normal"
					fontWeight="500"
					fontSize="1rem"
					lineHeight="1.5rem"
					alignItems="center"
					color="#FFFFFF"
					w="100%"
					mt="1rem"
					flexDirection="column"
				>
					<Flex justifyContent="space-between" w="100%">
						<Text>Preço unitário</Text>
						<Text>R$150</Text>
					</Flex>
					<Flex w="100%" border="1px solid #4BA3B7" my="1rem" />
				</Flex>
			)}
			<Flex flexDir={"column"} gap="0.5rem">
				<Flex justifyContent={"space-between"}>
					<Text fontSize={"md"} fontWeight="400">
						Endereço da cota
					</Text>
					<Flex alignItems={"center"} gap="0.5rem">
						<Text fontSize={"md"} fontWeight="400">
							0xe42c...e306
						</Text>
						<Icon
							color={"#4BA3B7"}
							w={4}
							h={4}
							as={FiCopy}
							_hover={{ cursor: "pointer" }}
						/>
					</Flex>
				</Flex>
				<Flex
					justifyContent={"space-between"}
					display={isInvestidor ? "flex" : "none"}
				>
					<Text fontSize={"md"} fontWeight="400">
						Preço unitário
					</Text>
					<Text fontSize={"md"} fontWeight="400">
						R$150
					</Text>
				</Flex>
				<Flex justifyContent={"space-between"}>
					<Text fontSize={"md"} fontWeight="400">
						Cotas emitidas
					</Text>
					<Text fontSize={"md"} fontWeight="400">
						237
					</Text>
				</Flex>
				<Flex justifyContent={"space-between"}>
					<Text fontSize={"md"} fontWeight="400">
						Cotas disponíveis
					</Text>
					<Text fontSize={"md"} fontWeight="400">
						13
					</Text>
				</Flex>
			</Flex>
		</Flex>
	);
};
