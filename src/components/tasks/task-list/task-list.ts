import { Component, NgFor, View } from 'angular2/angular2';
import { RouterLink, RouteParams } from 'angular2/router';
import { TaskStore } from '../../../core/task/task-store';
import { TaskItem } from '../task-item/task-item';
import { TaskListFilterPipe } from './task-list-filter-pipe';


@Component({
  selector: 'task-list'
})

@View({
  directives: [
    NgFor,
    RouterLink,
    TaskItem
  ],
  pipes: [
    TaskListFilterPipe
  ],
  styleUrls: ['components/tasks/task-list/task-list.css'],
  templateUrl: 'components/tasks/task-list/task-list.html'
})

export class TaskList {
  filter: string;
  tasks: TaskStore;

  constructor(params: RouteParams, tasks: TaskStore) {
    this.filter = params.get('filter');

    tasks.loaded.then(() => {
      this.tasks = tasks;
    });
  }

  deleteTask(data: any): void {
    this.tasks.remove(data.task);
  }

  updateTask(data: any): void {
    const { task, changes } = data;
    this.tasks.update(task, changes);
  }
}
