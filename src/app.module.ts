import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
import { TasksController } from './todo/tasks.controller';
import { TaskService } from './todo/task.service';

@Module({
  imports: [TodoModule],
  controllers: [AppController, TasksController],
  providers: [AppService, TaskService],
})
export class AppModule {}
