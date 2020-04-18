import { InjectionToken } from '@angular/core';

export let APP_CONFIG = new InjectionToken('app.config');

export interface IAppConfig {

  apiEndpoint: string;

}

export const AppConfig: IAppConfig = {

  apiEndpoint: 'https://rabotynet.herokuapp.com'
  // apiEndpoint: 'http://localhost:8081'

};
