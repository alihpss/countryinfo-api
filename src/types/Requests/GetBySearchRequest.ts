export interface GetSearchedWithFlagResponse {
  error: boolean;
  msg: string;
  data: {
    name: string;
    iso2: string;
    iso3: string;
    unicodeFlag: string;
  };
}

export interface ListSearchedCountryRequest {
  countryCode: string;
}
