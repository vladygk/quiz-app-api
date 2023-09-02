import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { AnswerService } from './answer.service';
import { AnswerDto } from './dto';

@Controller('answers')
export class AnswerController {
  constructor(private answerService: AnswerService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async createAnswer(@Body() dto: AnswerDto) {
    return await this.answerService.createAnswer(dto);
  }

  @Get(':id')
  async getAllAnswersPerQuestionId(@Param('id') questionId: string) {
    return await this.answerService.getAllAnswersPerQuestionId(questionId);
  }
}
