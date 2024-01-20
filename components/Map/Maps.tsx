import { Flex } from "@chakra-ui/react";
import { GoogleMap, MarkerF, useLoadScript } from "@react-google-maps/api";
import { FunctionComponent, useEffect, useMemo, useState } from "react";
import { fetchGeocode } from "../../services";
interface IMaps {
	localization?: any;
	localizations?: any;
}

export const Maps: FunctionComponent<IMaps> = ({
	localization,
	localizations,
}) => {
	const [getLocalization, setGetLocalization] = useState<any>([]);
	const [getLocalizations, setGetLocalizations] = useState<any>([]);

	const [data, setData] = useState<any>([]);
	const { isLoaded } = useLoadScript({
		googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_APY_KEY as any,
	});

	useEffect(() => {
		if (localization) {
			fetchGeocode(localization as any).then(res => {
				setData(res);
			});
		} else if (localizations) {
			localizations?.map((data: any) => {
				fetchGeocode(data.address as any).then(res => {
					setData((prevState: any) => [...prevState, res]);
				});
			});
		}
	}, [localization, localizations]);

	useEffect(() => {
		if (localizations) {
			const asd = data?.map((data: any) => data?.results).flat();
			const aaa = asd?.map((data: any) => data?.geometry?.location);

			const getPlace = aaa.reduce((acc: any, curr: any) => {
				const alreadyExists = acc.some(
					(marker: any) => marker.lat === curr.lat && marker.lng === curr.lng
				);

				if (!alreadyExists) {
					acc.push(curr);
				}

				return acc;
			}, []);

			setGetLocalizations(getPlace);
		}
		const getPlace = data?.results?.map(
			(data: any) => data?.geometry?.location
		);
		setGetLocalization(getPlace);
	}, [data, localizations]);

	const convertPlace = useMemo(() => getLocalization?.[0], [getLocalization]);
	const convertPlaces = useMemo(
		() => getLocalizations?.[0],
		[getLocalizations]
	);

	return (
		<>
			{isLoaded ? (
				localizations?.length ? (
					<GoogleMap
						zoom={16}
						center={convertPlace?.length ? convertPlace : convertPlaces}
						mapContainerClassName="map-container"
					>
						{getLocalizations.map((places: any, index: any) => (
							// eslint-disable-next-line react/jsx-key
							<MarkerF
								key={index}
								icon={{
									url: "/icons/Home-Maps.svg",
									scaledSize: new google.maps.Size(57, 57),
									labelOrigin: new google.maps.Point(30, -32),
								}}
								label={{
									text: "Crypto Plaza",
									className: "map-label",
								}}
								position={{ lat: places.lat, lng: places.lng }}
							/>
						))}
					</GoogleMap>
				) : (
					<GoogleMap
						zoom={16}
						center={convertPlace}
						mapContainerClassName="map-container"
					>
						<MarkerF
							icon={{
								url: "/icons/Home-Maps.svg",
								scaledSize: new google.maps.Size(57, 57),
								labelOrigin: new google.maps.Point(30, -32),
							}}
							label={{
								text: "Crypto Plaza",
								className: "map-label",
							}}
							position={convertPlace}
						/>
					</GoogleMap>
				)
			) : (
				<Flex>Loading...</Flex>
			)}
		</>
	);
};
