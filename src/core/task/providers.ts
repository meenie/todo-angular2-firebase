import { provide } from 'angular2/angular2';
import Firebase from 'firebase';
import { AuthService } from '../auth/auth-service';
import { TaskStore } from './task-store';


export const TASK_PROVIDERS: any[] = [
  provide(TaskStore, {
    deps: [AuthService],
    useFactory: (auth: AuthService): TaskStore => {
      return new TaskStore(new Firebase(`https://ng2-todo-app.firebaseio.com/tasks/${auth.id}`));
    }
  })
];
