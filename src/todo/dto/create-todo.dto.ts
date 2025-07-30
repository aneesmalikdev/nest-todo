import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsDateString,
  IsString,
  IsOptional,
} from 'class-validator';
import { TaskStatus, TaskPriority } from '../entities/todo.entity';

export class CreateTodoDto {
  @ApiProperty({ example: 'Finish project report', required: true })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '2025-07-30T17:00:00Z', required: true })
  @IsDateString()
  dueDate: string;

  @ApiProperty({
    enum: TaskStatus,
    example: TaskStatus.PENDING,
    default: TaskStatus.PENDING,
    required: false,
  })
  @IsEnum(TaskStatus)
  @IsOptional()
  status?: TaskStatus;

  @ApiProperty({
    enum: TaskPriority,
    example: TaskPriority.RED,
    required: true,
  })
  @IsEnum(TaskPriority)
  priority: TaskPriority;
}
