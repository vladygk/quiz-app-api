import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { AnswerService } from 'src/answer/answer.service';

@Module({
  providers: [QuestionService, AnswerService],
  controllers: [QuestionController],
})
export class QuestionModule {}
