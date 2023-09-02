"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
const answer_service_1 = require("../answer/answer.service");
let QuestionService = class QuestionService {
    constructor(prisma, answerService) {
        this.prisma = prisma;
        this.answerService = answerService;
    }
    async createQuestion(dto) {
        try {
            const question = await this.prisma.question.create({
                data: { text: dto.text },
            });
            return question;
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                return new common_1.BadRequestException('Error in DB');
            }
            throw error;
        }
    }
    async getAllQuestions() {
        const questions = (await this.prisma.question.findMany({
            include: { answers: true },
        })).map((q) => ({
            text: q.text,
            answers: q.answers,
            id: q.id,
        }));
        return questions;
    }
    async getOneQuestion(id) {
        const question = await this.prisma.question.findUnique({
            where: { id: Number(id) },
        });
        const answers = await this.answerService.getAllAnswersPerQuestionId(id);
        const questionDto = {
            answers,
            text: question.text,
            id: question.id,
        };
        return questionDto;
    }
};
exports.QuestionService = QuestionService;
exports.QuestionService = QuestionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        answer_service_1.AnswerService])
], QuestionService);
//# sourceMappingURL=question.service.js.map