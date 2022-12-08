import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TodoModule } from './api/todo/todo.module';
import { TasksController } from './api/todo/tasks.controller';
import { TaskService } from './api/todo/task.service';
import { DeckModule } from './api/decks/deck.module';
import { DecksController } from './api/decks/decks.controller';
import { DeckService } from './api/decks/deck.service';
import { ApiModule } from './api/api.module';
import { ApiController } from './api/api.controller';
import { ApiService } from './api/api.service';

@Module({
  imports: [ApiModule, DeckModule, TodoModule, HttpModule],
  controllers: [ApiController, DecksController, TasksController],
  providers: [ApiService, DeckService, TaskService],
})
export class AppModule {}
