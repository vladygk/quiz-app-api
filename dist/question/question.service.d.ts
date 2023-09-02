import { BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { QuestionDto, QuestionExportDto } from './dto';
import { AnswerService } from 'src/answer/answer.service';
export declare class QuestionService {
    private prisma;
    private answerService;
    constructor(prisma: PrismaService, answerService: AnswerService);
    createQuestion(dto: QuestionDto): Promise<{
        id: number;
        createdAt: Date;
        text: string;
    } | BadRequestException>;
    getAllQuestions(): Promise<QuestionDto[]>;
    getOneQuestion(id: string): Promise<QuestionExportDto>;
}
