export interface GetByCountryCode {
  commonName: string;
  officialName: string;
  countryCode: string;
  region: string;
  borders?: {
    commonName: string;
    officialName: string;
    countryCode: string;
    region: string;
    borders: null;
  }[];
}

export interface GetPopulationRequest {
  error: boolean;
  msg: string;
  data: {
    country: string;
    code: string;
    iso3: string;
    populationCounts: {
      year: number;
      value: number;
    }[];
  };
}

export interface GetOneWithFlagResponse {
  error: boolean;
  msg: string;
  data: {
    name: string;
    iso2: string;
    iso3: string;
    flag: string;
  };
}

export interface GetOneQueryParam {
  countryCode: string;
}
