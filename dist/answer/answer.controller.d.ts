import { AnswerService } from './answer.service';
import { AnswerDto } from './dto';
export declare class AnswerController {
    private answerService;
    constructor(answerService: AnswerService);
    createAnswer(dto: AnswerDto): Promise<string | object | AnswerDto>;
    getAllAnswersPerQuestionId(questionId: string): Promise<AnswerDto[]>;
}
