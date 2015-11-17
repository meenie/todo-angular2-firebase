import { Observable, provide } from 'angular2/angular2';
import Firebase from 'firebase';
import { AuthService } from '../auth/auth-service';
import { firebaseStore } from '../firebase/firebase-store';
import { TaskService } from './task-service';
import { TaskStore } from './task-store';


export const TASK_PROVIDERS: any[] = [
  provide(TaskService, {
    deps: [AuthService],
    useFactory: (auth: AuthService): TaskService => {
      return new TaskService(new Firebase(`https://ng2-todo-app.firebaseio.com/tasks/${auth.id}`));
    }
  }),

  provide(TaskStore, {
    deps: [AuthService],
    useFactory: (auth: AuthService): Observable<any> => {
      return firebaseStore(new Firebase(`https://ng2-todo-app.firebaseio.com/tasks/${auth.id}`));
    }
  })
];
