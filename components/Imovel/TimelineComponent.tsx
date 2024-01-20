import { FunctionComponent } from "react";
import { Flex, Text } from "@chakra-ui/react";
import { BsCheck } from "react-icons/bs";
import { ITimelineSteps } from "../../dtos/ITimelineSteps";
import { useTranslation } from "react-i18next";

type quarterStyleInfo = {
	name_en?: string;
	name_pt?: string;
	status: string;
};

export const TimelineComponent: FunctionComponent<ITimelineSteps> = ({
	titleWidth,
	data,
}) => {
	const { i18n } = useTranslation();

	const getQuarterStyle = (info: quarterStyleInfo[], quarter: string) => {
		if (info.every((item: quarterStyleInfo) => item.status === "completed")) {
			return (
				<Flex
					borderRadius="full"
					bgColor={"#003243"}
					w="1.9737rem"
					h="1.9737rem"
					p={"0.375rem"}
					justifyContent="center"
					alignItems="center"
				>
					<BsCheck size={25} color="white" />
				</Flex>
			);
		} else if (
			info.every((item: quarterStyleInfo) => item.status === "not started")
		) {
			return (
				<Flex
					borderRadius="full"
					bgColor={"#EDF2F7"}
					w="1.9737rem"
					h="1.9737rem"
					p={"0.375rem"}
					justifyContent="center"
					alignItems="center"
				>
					<Text
						color={"#6F6C90"}
						fontFamily="Poppins"
						fontStyle="normal"
						fontWeight={"400"}
						fontSize="0.875rem"
						lineHeight="1.25rem"
					>
						{quarter}
					</Text>
				</Flex>
			);
		} else if (
			info.some(
				(item: quarterStyleInfo) =>
					item.status === "in progress" || item.status === "not started"
			)
		) {
			return (
				<Flex
					borderRadius="full"
					bgColor={"#003243"}
					w="1.9737rem"
					p={"0.375rem"}
					h="1.9737rem"
					justifyContent="center"
					alignItems="center"
				>
					<Text
						color={"#FFFFFF"}
						fontFamily="Poppins"
						fontStyle="normal"
						fontWeight={"500"}
						fontSize="0.875rem"
						lineHeight="1.25rem"
					>
						{quarter}
					</Text>
				</Flex>
			);
		}
	};
	console.log(i18n.language);
	return (
		<Flex
			gap="0.7762rem"
			alignItems="start"
			pb={"1rem"}
			pr={"1rem"}
			flexDir={"column"}
			zIndex={"9999"}
		>
			<Text fontWeight={"600"} color={"#171923"} pb={"1rem"}>
				{data?.year}
			</Text>
			<Flex flexDir={"column"}>
				{data?.data?.map((quarterData, index) => {
					const quarterStyle = getQuarterStyle(
						quarterData?.info || [],
						quarterData?.quarter
					);

					return (
						<Flex key={index} flexDirection="row" pb={"1rem"} gap={"0.75rem"}>
							{quarterStyle}
							<Flex flexDirection="column" pt="0.1rem" h="100%" gap="0.1913rem">
								{quarterData?.info?.map((info, index) => {
									let textColor = "#A0AEC0";
									let fontWeight = "400";
									if (info.status === "completed") {
										textColor = "#000000";
										fontWeight = "400";
									} else if (info.status === "in progress") {
										textColor = "#007088";
										fontWeight = "500";
									}

									return (
										<Text
											key={index}
											color={textColor}
											fontFamily="Poppins"
											fontWeight={fontWeight}
											fontSize="0.75rem"
											lineHeight="1rem"
											w={titleWidth ? titleWidth : "8rem"}
										>
											{i18n.language === "br" ? info.name_en : info.name_pt}
										</Text>
									);
								})}
							</Flex>
						</Flex>
					);
				})}
			</Flex>
		</Flex>
	);
};
