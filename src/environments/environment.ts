// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  ACTIVITY_API_BASE_URL :'https://activity-loyalty-service.qa.cnxloyalty.com/activity/v1.0/search',
  CARS_API_BASE_URL:'https://car-loyalty.qa.cnxloyalty.com/car/v1.0/search',
  HOTELS_API_BASE_URL:'https://hotel-loyalty.stage.cnxloyalty.com/hotel/v1.0/search',
  AUTOSUGGEST_API_BASE_URL:'https://orxe.qa.cnxloyalty.com/api/autosuggest/v1.0/search',
  AUTOSUGGEST_API_AUTH_TOKEN:'update token here',
  AUTOSUGGEST_API_SESSION_ID:'enter session id',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
