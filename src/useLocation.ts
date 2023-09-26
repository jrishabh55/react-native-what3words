import * as Location from 'expo-location';
import { useEffect, useState } from 'react';

type LocationStateType = Pick<
  Location.LocationObjectCoords,
  'latitude' | 'longitude'
>;

const useLocation = () => {
  const [location, setLocation] = useState<LocationStateType>();
  const [errorMsg, setErrorMsg] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;

    const getLocation = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          throw new Error('Permission to access location was denied');
        }

        let loc = await Location.getCurrentPositionAsync({});
        if (isMounted) {
          setLocation(loc.coords);
          setIsLoading(false);
        }
      } catch (error: any) {
        setErrorMsg(error.message);
        setIsLoading(false);
      }
    };
    getLocation();

    return () => {
      isMounted = false;
    };
  }, []);

  return { location, errorMsg, isLoading };
};

export type LocationState = ReturnType<typeof useLocation>;

export default useLocation;
