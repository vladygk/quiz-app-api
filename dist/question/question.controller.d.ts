import { QuestionDto } from './dto';
import { QuestionService } from './question.service';
export declare class QuestionController {
    private questionService;
    constructor(questionService: QuestionService);
    createQuestion(dto: QuestionDto): Promise<import("@nestjs/common").BadRequestException | {
        id: number;
        createdAt: Date;
        text: string;
    }>;
    getAllQuestions(): Promise<QuestionDto[]>;
    getOneQuestion(id: string): Promise<import("./dto").QuestionExportDto>;
}
