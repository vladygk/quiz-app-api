import { QuestionDto } from './dto';
import { QuestionService } from './question.service';
export declare class QuestionController {
    private questionService;
    constructor(questionService: QuestionService);
    createQuestion(dto: QuestionDto): Promise<{
        id: number;
        createdAt: Date;
        text: string;
    } | import("@nestjs/common").BadRequestException>;
    getAllQuestions(): Promise<QuestionDto[]>;
    getOneQuestion(id: string): Promise<import("./dto").QuestionExportDto>;
}
