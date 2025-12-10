// src/common/dto/api-response.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class ApiResponseDto<T = any> {
  @ApiProperty()
  success: boolean;

  @ApiProperty()
  code: number;

  @ApiProperty()
  data: T;

  @ApiProperty({ type: [String] })
  error: string[];

  @ApiProperty()
  message: string;
}
