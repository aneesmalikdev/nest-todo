import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { TaskStatus, TaskPriority } from '../entities/todo.entity';
import { Transform, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class ListTodoDto {
  @ApiProperty({ example: 'Search term', required: false })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiProperty({
    enum: TaskStatus,
    example: TaskStatus.PENDING,
    required: false,
  })
  @IsOptional()
  @Transform(
    ({ value }: { value: string }) =>
      value && value[0].toUpperCase() + value.slice(1).toLowerCase(),
  )
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @ApiProperty({
    enum: TaskPriority,
    example: TaskPriority.RED,
    required: false,
  })
  @Transform(
    ({ value }: { value: string }) =>
      value && value[0].toUpperCase() + value.slice(1).toLowerCase(),
  )
  @IsOptional()
  @IsEnum(TaskPriority)
  priority?: TaskPriority;

  @ApiProperty({ example: 1, required: false, default: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  page?: number;

  @ApiProperty({ example: 10, required: false, default: 10 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  limit?: number;
}
