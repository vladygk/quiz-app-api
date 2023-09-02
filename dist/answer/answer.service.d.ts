import { AnswerDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class AnswerService {
    private prisma;
    constructor(prisma: PrismaService);
    createAnswer(dto: AnswerDto): Promise<AnswerDto | string | object>;
    getAllAnswersPerQuestionId(quiestionId: string): Promise<AnswerDto[]>;
}
