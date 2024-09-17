import { Router } from 'express';
import { CountryController } from '../controller/CountryController';

const routes = Router();
const countryController = new CountryController();

routes.get('/all', countryController.getAll);
routes.get('/find', countryController.getBySearch);
routes.get('/population/:country', countryController.getPopulation);
routes.get('/borders/:countryCode', countryController.getBorders);
routes.get('/flag', countryController.getFlagCountry);

export default routes;
