import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

export enum TaskStatus {
  PENDING = 'pending',
  DONE = 'done',
  IN_PROGRESS = 'in-progress',
  PAUSED = 'paused',
}

export enum TaskPriority {
  RED = 'red',
  YELLOW = 'yellow',
  BLUE = 'blue',
}

@Entity('todos')
export class Todo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'timestamp' })
  dueDate: Date;

  @Column({ type: 'enum', enum: TaskStatus, default: TaskStatus.PENDING })
  status: TaskStatus;

  @Column({ type: 'enum', enum: TaskPriority, default: TaskPriority.BLUE })
  priority: TaskPriority;

  @CreateDateColumn({ type: 'timestamp' })
  dateOfCreation: Date;

  @Column({ default: true })
  isActive: boolean;
}

export type TodoType = {
  id: string;
  name: string;
  dueDate: Date;
  status: TaskStatus;
  priority: TaskPriority;
  dateOfCreation: Date;
  isActive: boolean;
};
