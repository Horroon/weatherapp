export enum searchby {
  q,
  id,
}

export const ApiEndPoint = (
  label: string,
  key: string,
  search: searchby
): string =>
  `http://api.openweathermap.org/data/2.5/forecast/daily?${searchby[search]}=${label}&cnt=7&units=metric&appid=${key}`;
