import { Component, FORM_DIRECTIVES, View } from 'angular2/angular2';
import { TaskStore } from 'core/task/task-store';


@Component({
  selector: 'task-form'
})

@View({
  directives: [
    FORM_DIRECTIVES
  ],
  styleUrls: ['components/tasks/task-form/task-form.css'],
  templateUrl: 'components/tasks/task-form/task-form.html'
})

export class TaskForm {
  title: string = '';

  constructor(private tasks: TaskStore) {}

  clear(): void {
    this.title = '';
  }

  submit(): void {
    const title = this.title.trim();
    if (title.length) {
      this.tasks.add(title);
    }
    this.clear();
  }
}
