import { InjectionToken } from '@angular/core';

export interface APP_SETTINGS {
  dataSourceURL: string;
  pageSize: number;
  language: string;
}

export const appSettings: APP_SETTINGS = {
  dataSourceURL: 'https://fakestoreapi.com/products',
  pageSize: 9,
  language: 'en',
};

export const APP_SETTINGS_TOKEN = new InjectionToken<APP_SETTINGS>(
  'app.settings'
);
