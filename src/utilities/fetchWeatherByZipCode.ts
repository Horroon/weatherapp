import { ApiEndPoint, searchby } from "./apiEndPoint";

export const FetchWeatherByZipCode = async (
  zipcode: string,
  Key: string
): Promise<any> => {
  const URL = ApiEndPoint(zipcode, Key, searchby.id);
  return await fetch(URL).then((res) => res.json());
};
