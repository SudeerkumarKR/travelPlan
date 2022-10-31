import { ValidationPipe, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { debugLevel, PORT, HOST, APP_VERSION } from './constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
		logger: debugLevel,
	});
	// app.use(compression());
	app.useGlobalPipes(new ValidationPipe());

	await app.listen(PORT, HOST, () => {
		Logger.debug(`Server v${APP_VERSION } listening at http://${HOST}:${PORT}/`, 'Change To APP Name');
	});
}
bootstrap();
