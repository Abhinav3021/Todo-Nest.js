import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  ParseIntPipe,
} from '@nestjs/common';

import { DrizzleService } from '../drizzle/drizzle.service';
import { todos } from '../drizzle/schema';
import { eq } from 'drizzle-orm';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Controller('todos')
export class TodosController {
  constructor(
    private readonly todosService: TodosService,
    private readonly drizzleService: DrizzleService,
  ) {}

  // Prisma Routes
  @Get()
  findAll() {
    return this.todosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.todosService.findOne(id);
  }

  @Post()
  create(@Body() createTodoDto: CreateTodoDto) {
    return this.todosService.create(createTodoDto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTodoDto: UpdateTodoDto,
  ) {
    return this.todosService.update(id, updateTodoDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.todosService.remove(id);
  }

  // Drizzle Routes
  @Get('drizzle/all')
  async drizzleFindAll() {
    return await this.drizzleService.db.select().from(todos);
  }

  @Get('drizzle/:id')
  async drizzleFindOne(@Param('id', ParseIntPipe) id: number) {
    return await this.drizzleService.db.select().from(todos).where(eq(todos.id,id));
  }

  @Post('drizzle')
  async drizzleCreate(@Body() dto: CreateTodoDto) {
    return await this.drizzleService.db.insert(todos).values({title:dto.title,completed:dto.completed ?? false,}).returning();
  }

  @Patch('drizzle/:id')
  async drizzleUpdate(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateTodoDto,
  ) {
    return await this.drizzleService.db.update(todos).set({ ...dto, updatedAt: new Date() }).where(eq(todos.id, id)).returning(); 
  }

  @Delete('drizzle/:id')
  async drizzleDelete(@Param('id', ParseIntPipe) id: number) {
    return await this.drizzleService.db.delete(todos).where(eq(todos.id, id)).returning();
  }
}
