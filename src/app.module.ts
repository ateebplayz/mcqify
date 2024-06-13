import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuestionifyController } from './questionify/questionify.controller';
import { QuestionifyService } from './questionify/questionify.service';

@Module({
  imports: [],
  controllers: [AppController, QuestionifyController],
  providers: [AppService, QuestionifyService],
})
export class AppModule {}
