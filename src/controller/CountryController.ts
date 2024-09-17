import { Response, Request } from 'express';
import SendResponse from '../utils/SendResponse';

import dotenv from 'dotenv';
import axios from 'axios';

import {
  GetAllResponse,
  GetAllWithFlagResponse,
} from '../types/Requests/GetAllRequest';

import {
  GetSearchedWithFlagResponse,
  ListSearchedCountryRequest,
} from '../types/Requests/GetBySearchRequest';
import {
  GetByCountryCode,
  GetOneQueryParam,
  GetOneWithFlagResponse,
  GetPopulationRequest,
} from '../types/Requests/GetOneRequest';

dotenv.config();

export class CountryController {
  async getAll(_req: Request, res: Response) {
    try {
      const [countriesResponse, countriesWithFlagResponse] = await Promise.all([
        axios.get<GetAllResponse[]>(
          process.env.AVAILABLE_COUNTRIES_REQUEST as string,
        ),
        axios.get<GetAllWithFlagResponse>(
          process.env.COUNTRIES_UNICODE_FLAGS as string,
        ),
      ]);

      const countries = countriesResponse.data;
      const countriesWithFlag = countriesWithFlagResponse.data;

      const flagMap = new Map<string, string>();
      countriesWithFlag.data.forEach((country) => {
        flagMap.set(country.iso2, country.unicodeFlag);
      });

      const countriesWithFlags = countries.map((country) => {
        const flag = flagMap.get(country.countryCode) || '';
        return {
          ...country,
          flag,
        };
      });

      return SendResponse.success(
        res,
        200,
        'Countries listed with success',
        countriesWithFlags,
      );
    } catch (error) {
      console.log(error);

      return SendResponse.error(res, 500, 'Error to show all countries.');
    }
  }

  async getBySearch(
    req: Request<unknown, unknown, unknown, ListSearchedCountryRequest>,
    res: Response,
  ) {
    try {
      const { countryCode } = req.query;

      if (!countryCode) {
        return SendResponse.error(res, 400, 'Error to search country.');
      }

      const { data } = await axios.post<GetSearchedWithFlagResponse>(
        process.env.COUNTRIES_UNICODE_FLAGS as string,
        {
          iso2: countryCode,
        },
      );

      return SendResponse.success(
        res,
        200,
        'Country listed with success',
        data,
      );
    } catch (error) {
      return SendResponse.error(res, 500, 'Error to find searched country.');
    }
  }

  async getFlagCountry(
    req: Request<unknown, unknown, unknown, GetOneQueryParam>,
    res: Response,
  ) {
    try {
      const { countryCode } = req.query;

      if (!countryCode) {
        return SendResponse.error(res, 400, 'Error to search country.');
      }

      const { data } = await axios.post<GetOneWithFlagResponse>(
        process.env.COUNTRY_FLAG as string,
        {
          iso2: countryCode,
        },
      );

      return SendResponse.success(
        res,
        200,
        'Country flag listed with success',
        data,
      );
    } catch (error) {
      return SendResponse.error(res, 500, 'Error to show country information.');
    }
  }

  async getBorders(req: Request<{ countryCode: string }>, res: Response) {
    try {
      const { countryCode } = req.params;

      if (!countryCode) {
        return SendResponse.error(res, 400, 'Error to search country.');
      }

      const { data } =
        await axios.get<GetByCountryCode>(`${process.env.COUNTRY_INFO as string}/${countryCode}
      `);

      return SendResponse.success(
        res,
        200,
        'Country listed with success',
        data,
      );
    } catch (error) {
      return SendResponse.error(res, 500, 'Error to show borders information.');
    }
  }

  async getPopulation(req: Request<{ country: string }>, res: Response) {
    try {
      const { country } = req.params;

      if (!country) {
        return SendResponse.error(res, 400, 'Error to search country.');
      }

      const { data } = await axios.post<GetPopulationRequest>(
        process.env.COUNTRY_POPULATION as string,
        {
          country,
        },
      );
      return SendResponse.success(
        res,
        200,
        'Country listed with success',
        data,
      );
    } catch (error) {
      return SendResponse.error(res, 500, 'Error to show borders information.');
    }
  }
}
