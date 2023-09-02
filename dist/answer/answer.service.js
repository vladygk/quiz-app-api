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
exports.AnswerService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
let AnswerService = class AnswerService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createAnswer(dto) {
        try {
            const answer = await this.prisma.answer.create({
                data: {
                    text: dto.text,
                    questionId: dto.questionId,
                    isCorrect: dto.isCorrect,
                },
            });
            return {
                text: answer.text,
                questionId: answer.questionId,
                isCorrect: answer.isCorrect,
            };
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                return new common_1.BadRequestException('Error in db').getResponse();
            }
            throw error;
        }
    }
    async getAllAnswersPerQuestionId(quiestionId) {
        const answers = await this.prisma.answer.findMany({
            where: { questionId: Number(quiestionId) },
        });
        const answerDtos = answers.map((a) => ({
            text: a.text,
            questionId: a.questionId,
            isCorrect: a.isCorrect,
        }));
        return answerDtos;
    }
};
exports.AnswerService = AnswerService;
exports.AnswerService = AnswerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AnswerService);
//# sourceMappingURL=answer.service.js.map