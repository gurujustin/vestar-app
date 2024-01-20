import { Flex, Img, SimpleGrid, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import { CollectionsModal } from "./CollectionsModal";
interface ICollections {
	images: any[];
}

export const Collections: React.FC<ICollections> = props => {
	const { images } = props;
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [selectedImage, setSelectedImage] = useState<any>();
	return (
		<Flex
			w="100%"
			h="100%"
			gap="0.5rem"
			pb="1.5rem"
			pt="2rem"
			onClick={onOpen}
			justifyContent="center"
		>
			<CollectionsModal
				allImages={images}
				isOpen={isOpen}
				onClose={onClose}
				selectedImage={selectedImage}
				setSelectedImage={setSelectedImage}
			/>
			<Flex
				onClick={() => {
					onOpen();
					setSelectedImage(images[0] ?? null);
				}}
			>
				<Img
					width="34.75rem"
					height="25rem"
					src={`/api/file/${images[0] ?? null}`}
					borderLeftRadius="0.75rem"
					_hover={{ cursor: "pointer", filter: "brightness(90%)" }}
					transition="200ms"
				/>
			</Flex>
			<SimpleGrid columns={{ sm: 1, md: 2, lg: 2, xl: 2 }} gap="0.5rem">
				<Img
					w="17.125rem"
					h="12.25rem"
					src={`/api/file/${images[1] ?? null}`}
					_hover={{ cursor: "pointer", filter: "brightness(90%)" }}
					transition="200ms"
					onClick={() => {
						onOpen();
						setSelectedImage(images[1] ?? null);
					}}
				/>
				<Img
					w="17.125rem"
					h="12.25rem"
					src={`/api/file/${images[2] ?? null}`}
					borderTopRightRadius="0.75rem"
					onClick={() => {
						onOpen();
						setSelectedImage(images[2] ?? null);
					}}
					_hover={{ cursor: "pointer", filter: "brightness(90%)" }}
					transition="200ms"
				/>
				<Img
					w="17.125rem"
					h="12.25rem"
					src={`/api/file/${images[3] ?? null}`}
					onClick={() => {
						onOpen();
						setSelectedImage(images[3] ?? null);
					}}
					_hover={{ cursor: "pointer", filter: "brightness(90%)" }}
					transition="200ms"
				/>
				<Img
					w="17.125rem"
					h="12.25rem"
					src={`/api/file/${images[4] ?? null}`}
					borderBottomRightRadius="0.75rem"
					onClick={() => {
						onOpen();
						setSelectedImage(images[4] ?? null);
					}}
					_hover={{ cursor: "pointer", filter: "brightness(90%)" }}
					transition="200ms"
				/>
			</SimpleGrid>
		</Flex>
	);
};
