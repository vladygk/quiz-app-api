import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { QuestionModule } from './question/question.module';
import { PrismaModule } from './prisma/prisma.module';
import { AnswerModule } from './answer/answer.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    AuthModule,
    QuestionModule,
    PrismaModule,
    AnswerModule,
    ConfigModule.forRoot({ isGlobal: true }),
    UserModule,
  ],
})
export class AppModule {}
