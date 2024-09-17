export interface GetAllResponse {
  countryCode: string;
  name: string;
}

export interface GetAllWithFlagResponse {
  error: boolean;
  msg: string;
  data: {
    name: string;
    iso2: string;
    iso3: string;
    unicodeFlag: string;
  }[];
}
