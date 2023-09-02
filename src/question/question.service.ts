import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { QuestionDto, QuestionExportDto } from './dto';
import { Prisma, Question } from '@prisma/client';
import { AnswerService } from 'src/answer/answer.service';
import { AnswerDto } from 'src/answer/dto';

@Injectable()
export class QuestionService {
  constructor(
    private prisma: PrismaService,
    private answerService: AnswerService,
  ) {}

  async createQuestion(dto: QuestionDto) {
    try {
      const question = await this.prisma.question.create({
        data: { text: dto.text },
      });
      return question;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        return new BadRequestException('Error in DB');
      }
      throw error;
    }
  }

  async getAllQuestions(): Promise<QuestionDto[]> {
    const questions: QuestionExportDto[] = (
      await this.prisma.question.findMany({
        include: { answers: true },
      })
    ).map((q) => ({
      text: q.text,
      answers: q.answers,
      id: q.id,
    }));

    return questions;
  }

  async getOneQuestion(id: string): Promise<QuestionExportDto> {
    const question: Question = await this.prisma.question.findUnique({
      where: { id: Number(id) },
    });
    const answers: AnswerDto[] =
      await this.answerService.getAllAnswersPerQuestionId(id);

    const questionDto: QuestionExportDto = {
      answers,
      text: question.text,
      id: question.id,
    };
    return questionDto;
  }
}
