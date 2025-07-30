import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, FindOptionsWhere } from 'typeorm';
import { Todo } from './entities/todo.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { ListTodoDto } from './dto/list-todo.dto';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
  ) {}

  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    const todo = this.todoRepository.create(createTodoDto);
    return this.todoRepository.save(todo);
  }

  async findAll(
    filters: ListTodoDto,
  ): Promise<{ data: Todo[]; total: number; page: number; limit: number }> {
    const { search, status, priority, page = 1, limit = 10 } = filters;

    const where: FindOptionsWhere<Todo> = { isActive: true };
    if (status) where.status = status;
    if (priority) where.priority = priority;
    if (search) where.name = Like(`%${search}%`);

    const [data, total] = await this.todoRepository.findAndCount({
      where,
      skip: (page - 1) * limit,
      take: limit,
      order: { dateOfCreation: 'DESC' },
    });

    return { data, total, page, limit };
  }

  async findOne(id: string): Promise<Todo> {
    const todo = await this.todoRepository.findOne({ where: { id } });
    if (!todo) throw new NotFoundException(`Todo with ID ${id} not found`);
    return todo;
  }

  async update(id: string, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    const todo = await this.findOne(id);
    Object.assign(todo, updateTodoDto);
    return this.todoRepository.save(todo);
  }

  async remove(id: string): Promise<{ message: string }> {
    const todo = await this.findOne(id);
    await this.todoRepository.remove(todo);
    return { message: `Todo with ID ${id} deleted successfully` };
  }
}
