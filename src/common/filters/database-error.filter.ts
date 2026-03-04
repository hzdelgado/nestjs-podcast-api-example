import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from "@nestjs/common";
import { Response } from "express";
import { QueryFailedError } from "typeorm";

@Catch(QueryFailedError)
export class DatabaseErrorFilter implements ExceptionFilter {
  catch(exception: QueryFailedError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status =  HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Database error ocurred';

    if(exception.message.includes('duplicate')) {
      status = HttpStatus.CONFLICT;
      message = 'Duplicate entry error';
    }

    response.status(status).json({
      statusCode: status,
      message: message,
      error: exception.name,
    });
  }
}