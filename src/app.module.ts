import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { QuestionModule } from './question/question.module';
import { PrismaModule } from './prisma/prisma.module';
import { AnswerModule } from './answer/answer.module';

@Module({
  imports: [
    AuthModule,
    QuestionModule,
    PrismaModule,
    AnswerModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
})
export class AppModule {}
