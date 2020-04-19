import {InjectionToken} from '@angular/core';

export let APP_CONFIG = new InjectionToken('app.config');

export class IAppConfig {
  apiEndpoint: string;
  allowOrigin: string;

}

export const AppConfig: IAppConfig = {
  apiEndpoint: 'https://rabotynet.herokuapp.com',
  allowOrigin: 'http://localhost:4200'
  // apiEndpoint: 'http://localhost:8081'
};
