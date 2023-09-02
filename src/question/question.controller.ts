import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { QuestionDto } from './dto';
import { QuestionService } from './question.service';

@Controller('questions')
export class QuestionController {
  constructor(private questionService: QuestionService) {}
  @Post()
  async createQuestion(@Body() dto: QuestionDto) {
    return await this.questionService.createQuestion(dto);
  }
  @Get()
  async getAllQuestions() {
    return await this.questionService.getAllQuestions();
  }
  @Get(':id')
  async getOneQuestion(@Param('id') id: string) {
    return await this.questionService.getOneQuestion(id);
  }
}
