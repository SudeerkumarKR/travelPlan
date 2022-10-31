// import { HooksModule } from '../routes/hooks/hooks.module';

import { AppModule } from "src/app.module";

/**
 * NOTE: Routes are picked on 'first-match'
 *       So the order is important
 */



export const APP_ROUTES = [
	
	{
		path: 'search',
		module: AppModule
	}
];
