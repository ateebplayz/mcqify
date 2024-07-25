import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuestionifyController } from './questionify/questionify.controller';
import { QuestionifyService } from './questionify/questionify.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      serveRoot: '/images',
      rootPath: path.join(__dirname, '../questions'), // Path to the static files
      serveStaticOptions: {
        extensions: ['png'],
        index: false,
      },
    }),
  ],
  controllers: [AppController, QuestionifyController],
  providers: [AppService, QuestionifyService],
})
export class AppModule {}
