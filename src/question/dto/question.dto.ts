import { IsNotEmpty, IsString } from 'class-validator';
import { AnswerDto } from 'src/answer/dto';

export class QuestionDto {
  @IsString()
  @IsNotEmpty()
  text: string;
}

export class QuestionExportDto {
  @IsString()
  @IsNotEmpty()
  text: string;

  id: number;
  answers: AnswerDto[];
}
