import { Observable } from 'angular2/angular2';
import { List } from 'immutable';


export interface IFirebaseRecord {
  $key: string;
}


export function firebaseStore(ref: Firebase): Observable<any> {
  return Observable.create((subscriber: any) => {
    let list: List<any> = List();

    ref.on('child_added', created);
    ref.on('child_changed', updated);
    ref.on('child_removed', deleted);
    ref.once('value', () => emit());

    function emit(): void {
      subscriber.next(list);
    }

    function created(snapshot: FirebaseDataSnapshot): void {
      let key: string = snapshot.key();
      let index: number = findIndex(key);
      if (index === -1) {
        let record: IFirebaseRecord = snapshot.val();
        record.$key = key;
        list = list.push(record);
      }
    }

    function deleted(snapshot: FirebaseDataSnapshot): void {
      let index: number = findIndex(snapshot.key());
      if (index !== -1) {
        list = list.delete(index);
        emit();
      }
    }

    function updated(snapshot: FirebaseDataSnapshot): void {
      let key: string = snapshot.key();
      let index: number = findIndex(key);
      if (index !== -1) {
        let record: IFirebaseRecord = snapshot.val();
        record.$key = key;
        list = list.set(index, record);
        emit();
      }
    }

    function findIndex(key: string): number {
      return list.findIndex((record: IFirebaseRecord) => {
        return record.$key === key;
      });
    }

    return () => {
      ref.off();
    };
  });
}
