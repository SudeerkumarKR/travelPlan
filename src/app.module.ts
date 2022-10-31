import { HttpModule, Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_ROUTES } from './constants';

import { ScheduleModule } from '@nestjs/schedule';


@Module({
  imports: [
    RouterModule.register(APP_ROUTES),
    ScheduleModule.forRoot(),

		// ConfigModule.forRootAsync(ConfigModule, {
		// 	useClass: ConfigModuleConfig
		// }),
		// DatabaseModule.forRootAsync({
		// 	imports: [ConfigModule.Deferred],
		// 	useClass: DatabaseModuleConfig
		// }),

		HttpModule.register({
			timeout: 5000,
			maxRedirects: 5
		}),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
