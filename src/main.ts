import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import * as session from 'express-session';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
  }))

  const expressApp = express();

    // Use cookie-parser middleware
    expressApp.use(cookieParser());

    // Use express-session middleware
    expressApp.use(session({
        secret: 'your_secret_key',
        resave: false,
        saveUninitialized: false,
        // Additional session options...
    }));

    app.use(expressApp);

  await app.listen(3333);
}
bootstrap();
