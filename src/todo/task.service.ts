import { Injectable } from '@nestjs/common';
import { TaskModel } from './task.model';

@Injectable()
export class TaskService {
  _tasks: TaskModel[] = [
    { id: 1, description: 'Feed the cat' },
    { id: 2, description: 'Clean the windows' },
    { id: 3, description: 'Finish record YouTube video' },
  ];

  findAllTasks() {
    return this._tasks;
  }

  findTaskById(id: number): TaskModel {
    return this._tasks.find((t) => t.id == id);
  }
}
