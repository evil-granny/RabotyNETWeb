import {InjectionToken} from '@angular/core';

export let APP_CONFIG = new InjectionToken('app.config');

export class IAppConfig {
  apiEndpoint: string;
  allowOrigin: string;
}

export const AppConfig: IAppConfig = {
  apiEndpoint: 'https://rabotynet.herokuapp.com',
  allowOrigin: 'https://rabotynetweb.herokuapp.com'
  // apiEndpoint: 'http://localhost:8081'
};
