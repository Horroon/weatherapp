import { ApiEndPoint, searchby } from "./apiEndPoint";
export const FetchWeatherByCityName = async (
  cityname: string,
  Key: string
): Promise<any> => {
  const URL = ApiEndPoint(cityname, Key, searchby.q);
  return await fetch(URL).then((res) => res.json());
};
