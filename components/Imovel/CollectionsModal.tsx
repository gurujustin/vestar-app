import {
	Flex,
	Modal,
	ModalBody,
	ModalContent,
	ModalOverlay,
	Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { GrFormClose } from "react-icons/gr";
import { Carousel } from "./Carousel";

interface ICollectionsModal {
	isOpen: boolean;
	onClose: () => void;
	allImages: string[];
	selectedImage: string;
	setSelectedImage: any;
}

export const CollectionsModal: React.FC<ICollectionsModal> = props => {
	const { isOpen, onClose, allImages, selectedImage, setSelectedImage } = props;
	const [currentIndex, setCurrentIndex] = useState(1);

	const handleClose = () => {
		setSelectedImage("");
		onClose();
	};

	return (
		<>
			<Modal
				blockScrollOnMount
				size="full"
				isOpen={isOpen}
				onClose={handleClose}
			>
				<ModalOverlay />
				<ModalContent bgColor={"#ffffff"}>
					<ModalBody height="inherit">
						<Flex
							justifyContent="center"
							alignItems="center"
							h="100vh"
							flexDirection="column"
							gap="1.125rem"
						>
							<Flex
								gap="1rem"
								color="#171923"
								w="100%"
								justifyContent="space-between"
								alignItems="center"
								px={"5rem"}
							>
								<Flex>
									<Text
										fontFamily="Poppins"
										fontSize="1rem"
										lineHeight="1.5rem"
									>
										{currentIndex} de {allImages?.length}
									</Text>
								</Flex>
								<Flex
									transition={"0.5s"}
									_hover={{ cursor: "pointer", opacity: 0.6 }}
									onClick={handleClose}
								>
									<Text
										fontFamily="Poppins"
										fontSize="1rem"
										lineHeight="1.5rem"
									>
										Fechar
									</Text>
									<Flex>
										<GrFormClose size={22} />
									</Flex>
								</Flex>
							</Flex>
							<Carousel
								modal_images={allImages}
								selectedImage={selectedImage}
								widthValue="85.8125rem"
								heightValue="50rem"
								isOpen={isOpen}
								setCurrentIndex={setCurrentIndex}
							/>
						</Flex>
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
};
