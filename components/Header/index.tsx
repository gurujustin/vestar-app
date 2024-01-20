import { Flex, Img, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { ColorRing } from "react-loader-spinner";
import { useUser } from "../../hooks/useUser";
import { HamburguerMenu } from "./HamburguerMenu";
import { HeaderLinks } from "./HeaderLinks";

export const Header: React.FC = () => {
	const { push } = useRouter();
	const { username } = useUser();

	return (
		<Flex
			w="100%"
			h={"4.75rem"}
			flexDir="row"
			alignItems={"center"}
			justifyContent="space-around"
			bgColor={"#FFFFFF"}
			borderBottom="0.0625rem solid #E2E8F0"
			boxShadow="0rem 0.0625rem 0.125rem rgba(0, 0, 0, 0.05)"
		>
			<Flex
				onClick={() => push("/oportunidades")}
				_hover={{ cursor: "pointer" }}
			>
				<Img
					w={"7rem"}
					src="/images/vestar-assets/Asset 5.png"
					transition={"0.8s"}
					_hover={{ opacity: 0.6 }}
				/>
			</Flex>
			<Flex>
				<HeaderLinks />
			</Flex>
			{username === undefined ? (
				<Flex
					gap="0.75rem"
					fontFamily="Poppins"
					fontWeight="500"
					fontSize="0.875rem"
					lineHeight="1.25rem"
					alignItems="center"
					w={"12rem"}
					justifyContent="center"
				>
					<ColorRing
						height={15}
						width={15}
						colors={["#1789A3", "#1789A3", "#1789A3", "#1789A3", "#1789A3"]}
						wrapperStyle={{}}
						wrapperClass=""
						visible={true}
						ariaLabel="oval-loading"
					/>
				</Flex>
			) : (
				<Flex
					gap="0.75rem"
					fontFamily="Poppins"
					fontWeight="500"
					fontSize="0.875rem"
					lineHeight="1.25rem"
					alignItems="center"
					w={"14rem"}
				>
					<HamburguerMenu />
				</Flex>
			)}
		</Flex>
	);
};
