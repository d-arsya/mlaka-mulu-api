import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { ZodValidationException } from 'nestjs-zod';
import { EntityNotFoundError, TypeORMError } from 'typeorm';
import { ZodError } from 'zod';

@Catch()
export class ErrorFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    if (exception instanceof EntityNotFoundError) {
      const info = (exception as any).criteria.where;
      const rawId = info?.id;
      const id =
        typeof rawId === 'string'
          ? rawId.replace(/[^0-9a-fA-F-]/g, '')
          : '(unknown)';
      const entity = exception.message.match(/type \"(.+?)\"/)?.[1] || 'Entity';

      return response.status(404).json({
        success: false,
        code: 404,
        data: null,
        error: [],
        message: `Cannot find ${entity} with id ${id}`,
      });
    }
    if (exception instanceof ZodValidationException) {
      const zodError = exception.getZodError() as unknown as ZodError;

      const simpleErrors = zodError.issues.map((issue) => ({
        path: issue.path.join('.') || '(root)',
        message: issue.message,
      }));

      return response.status(400).json({
        success: false,
        code: 400,
        data: null,
        error: simpleErrors,
        message: 'Validation failed',
      });
    }
    if (exception instanceof TypeORMError) {
      const field = this.extractFieldName(exception.stack!);
      return response.status(400).json({
        success: false,
        code: 400,
        data: null,
        error: [field],
        message: exception.message,
      });
    }

    const status =
      exception instanceof HttpException ? exception.getStatus() : 500;

    const message =
      exception instanceof HttpException
        ? exception.getResponse()
        : 'Internal server error';

    response.status(status).json({
      success: false,
      code: status,
      data: null,
      error: [],
      message:
        typeof message === 'string' ? message : message?.['message'] || 'Error',
    });
  }
  private extractFieldName(errorMessage: string): string | null {
    if (!errorMessage) return null;

    const match = errorMessage.match(/Key \((\w+)\)=/);

    if (match && match[1]) {
      return match[1];
    }

    return null;
  }
}
