import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodosService {
  private todos: Todo[] = [
    { id: 1, title: 'Learn NestJS', completed: false },
    { id: 2, title: 'Build Todo API', completed: true },
  ];

  findAll(): Todo[] {
    return this.todos;
  }

  findOne(id: number): Todo {
    const todo = this.todos.find((item) => item.id === id);

    if (!todo) {
      throw new NotFoundException('Todo not found');
    }

    return todo;
  }

  create(createTodoDto: CreateTodoDto): Todo {
    const newTodo: Todo = {
      id: Date.now(),
      title: createTodoDto.title,
      completed: createTodoDto.completed ?? false,
    };

    this.todos.push(newTodo);

    return newTodo;
  }

  update(id: number, updateTodoDto: UpdateTodoDto): Todo {
    const todo = this.findOne(id);

    if (updateTodoDto.title !== undefined) {
      todo.title = updateTodoDto.title;
    }

    if (updateTodoDto.completed !== undefined) {
      todo.completed = updateTodoDto.completed;
    }

    return todo;
  }

  remove(id: number) {
    const index = this.todos.findIndex((item) => item.id === id);

    if (index === -1) {
      throw new NotFoundException('Todo not found');
    }

    this.todos.splice(index, 1);

    return { message: 'Todo deleted successfully' };
  }
}
