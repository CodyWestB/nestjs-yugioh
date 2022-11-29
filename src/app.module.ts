import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TodoModule } from './todo/todo.module';
import { TasksController } from './todo/tasks.controller';
import { TaskService } from './todo/task.service';
import { DeckModule } from './decks/deck.module';
import { DecksController } from './decks/decks.controller';
import { DeckService } from './decks/deck.service';
import { ApiModule } from './api/api.module';
import { ApiController } from './api/api.controller';
import { ApiService } from './api/api.service';

@Module({
  imports: [ApiModule, DeckModule, TodoModule, HttpModule],
  controllers: [ApiController, DecksController, TasksController],
  providers: [ApiService, DeckService, TaskService],
})
export class AppModule {}
