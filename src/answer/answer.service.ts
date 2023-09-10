import { BadRequestException, Injectable } from '@nestjs/common';
import { AnswerDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Answer, Prisma } from '@prisma/client';

@Injectable()
export class AnswerService {
  constructor(private prisma: PrismaService) {}
  async createAnswer(dto: AnswerDto): Promise<AnswerDto | string | object> {
    try {
      const answer = await this.prisma.answer.create({
        data: {
          text: dto.text,
          questionId: dto.questionId,
          points: dto.points,
        },
      });
      return {
        text: answer.text,
        questionId: answer.questionId,
        points: answer.points,
      };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        return new BadRequestException('Error in db').getResponse();
      }
      throw error;
    }
  }
  async getAllAnswersPerQuestionId(quiestionId: string): Promise<AnswerDto[]> {
    const answers: Answer[] = await this.prisma.answer.findMany({
      where: { questionId: Number(quiestionId) },
    });
    const answerDtos = answers.map(
      (a): AnswerDto => ({
        text: a.text,
        questionId: a.questionId,
        points: a.points,
      }),
    );
    return answerDtos;
  }
}
