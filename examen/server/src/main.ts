import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import { config } from 'dotenv';


config();

async function start() {
  const PORT = process.env.PORT || 5001;
  const app = await NestFactory.create(AppModule);
  const corsOptions = {
    origin: process.env.CLIENT_URL,
    credentials: true,
  };
  app.use(cors(corsOptions));
  app.use(cookieParser());

  
  await app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

start();
