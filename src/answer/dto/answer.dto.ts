import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AnswerDto {
  @IsString()
  @IsNotEmpty()
  text: string;

  @IsNumber()
  @IsNotEmpty()
  questionId: number;

  @IsNumber()
  @IsNotEmpty()
  points: number;
}
