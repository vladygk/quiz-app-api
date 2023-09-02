import { ExceptionFilter, Catch, BadRequestException } from '@nestjs/common';

@Catch(BadRequestException)
export class BadRequestExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: any) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception.getStatus(); // Get the HTTP status code

    response.status(status).json({
      statusCode: status,
      message: exception.message,
    });
  }
}
