import React, { FunctionComponent } from "react";
import { Flex, Img } from "@chakra-ui/react";
import { IPaymentMethods } from "./dto";

const PaymentMethod: FunctionComponent<IPaymentMethods> = ({ image }) => {
	return (
		<Flex
			bgColor="#FFFFFF"
			border="0.0625rem solid #D9D9D9"
			borderRadius="0.375rem"
			padding="0.625rem"
			w="4.375rem"
			justifyContent="center"
			alignItems="center"
			h="3rem"
			_hover={{ cursor: "pointer" }}
		>
			<Img src={image} w="max-content" h="max-content" />
		</Flex>
	);
};

export const PaymentMethods: FunctionComponent = () => {
	const images = [
		{
			path: "",
		},
	];

	return (
		<Flex gap="0.75rem" alignItems="center" flexWrap="wrap">
			{images.map((item, index) => (
				<PaymentMethod image={item.path} key={Number(index)} />
			))}
		</Flex>
	);
};
