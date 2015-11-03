import { FirebaseArray } from 'core/firebase/firebase-array';
import { Task } from './task';


export class TaskStore extends FirebaseArray {
  add(title: string): void {
    super.add(new Task(title));
  }
}
