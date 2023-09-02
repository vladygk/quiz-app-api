import { AnswerDto } from 'src/answer/dto';
export declare class QuestionDto {
    text: string;
}
export declare class QuestionExportDto {
    text: string;
    id: number;
    answers: AnswerDto[];
}
