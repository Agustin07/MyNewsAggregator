import { Module, HttpModule } from '@nestjs/common';
import AppController from './app.controller';
import AppService from './app.service';
import { NewsModule } from './news/news.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    NewsModule,
    HttpModule,
    ConfigModule.forRoot({
      envFilePath: '.development.env',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
