import { Logger, LogLevel, ServiceUnavailableException } from '@nestjs/common';
import packageJson from 'package.json';


export const APP_VERSION = packageJson.version;
export const HOST = process.env.TRAVEL_SERVER_HOST || '0.0.0.0';
export const PORT = parseInt(process.env.TRAVEL_SERVER_PORT, 10) || 35000;
export const DEBUG_LEVEL = process.env.TRAVEL_SERVER_LOGS || 'debug';
export const APP_DOCUMENTATION = process.env.TRAVEL_SERVER_DOC || 'https://www.google.com/docs/about/';




/**
 * FUNCTIONS
 */
export const transformDocument = {
	transform: function (doc, ret) {
		ret.id = ret._id.toString();
		delete ret.__v;
		delete ret._id;
		return ret;
	},
};

export const transformSubDocument = {
	transform: function (doc, ret) {
		ret.id = ret._id;
		delete ret._id;
	},
};

export const handleServiceError = (app: string, msg: string) => {
	return (err: Error) => {
		Logger.error(`${msg} ${err.name}: ${err.message}`, app);
		throw err;
	};
};

export const REQUEST_HEADERS = {
	'Content-Type': 'application/json',
	// Authorization: OPEN_ACCOUNT_AUTH_HEADER,
};

export const FILE_REQUEST_HEADERS = {
	'Content-Type': 'multipart/form-data',
};


export const handleControllerError = (app: string, msg: string) => {
	return (err: Error) => {
		Logger.error(`${msg} ${err.name} : ${err.message}`, app);
		throw new ServiceUnavailableException(err.message || JSON.stringify(err));
	};
};

export const debugLevel = ((): LogLevel[] => {
	if (DEBUG_LEVEL == 'debug') return ['debug', 'warn', 'error'];
	if (DEBUG_LEVEL == 'warn') return ['warn', 'error'];
	if (DEBUG_LEVEL == 'error') return ['error'];
})();

export const getQueryParameterFromURL = (url, searchStr) => url.split('?')[1].split('&').map(e => e.split('=')).find(e => e[0] == searchStr)[1] || null;
/**
 *
 * NOTE: Routes should be the last line in this file.
 *
 */
export { APP_ROUTES } from './routes';
