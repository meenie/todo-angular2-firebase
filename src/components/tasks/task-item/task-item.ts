import {
  Component,
  CORE_DIRECTIVES,
  EventEmitter,
  FORM_DIRECTIVES,
  Input,
  Output,
  View
} from 'angular2/angular2';

import { ITask } from '../../../core/task/task';
import { Autofocus } from '../../../directives/autofocus-directive';


@Component({
  selector: 'task-item'
})

@View({
  directives: [
    Autofocus,
    CORE_DIRECTIVES,
    FORM_DIRECTIVES
  ],
  styleUrls: ['components/tasks/task-item/task-item.css'],
  templateUrl: 'components/tasks/task-item/task-item.html'
})

export class TaskItem {
  @Input() model: ITask;

  @Output() deleteTask: EventEmitter<any> = new EventEmitter();
  @Output() updateTask: EventEmitter<any> = new EventEmitter();

  editing: boolean = false;
  title: string = '';

  delete(): void {
    this.deleteTask.next({task: this.model});
  }

  editTitle(): void {
    this.editing = true;
    this.title = this.model.title;
  }

  saveTitle(): void {
    if (this.editing) {
      const title: string = this.title.trim();
      if (title.length && title !== this.model.title) {
        this.updateTask.next({
          task: this.model,
          changes: {title}
        });
      }
      this.stopEditing();
    }
  }

  stopEditing(): void {
    this.editing = false;
  }

  toggleStatus(): void {
    this.updateTask.next({
      task: this.model,
      changes: {
        completed: !this.model.completed
      }
    });
  }
}
