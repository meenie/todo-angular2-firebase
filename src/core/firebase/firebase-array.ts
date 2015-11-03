export interface IFirebaseRecord {
  $key: string;
}


export class FirebaseArray extends Array {
  loaded: Promise<any>;

  constructor(private ref: Firebase) {
    super();

    this.ref.on('child_added', this.created.bind(this));
    this.ref.on('child_changed', this.updated.bind(this));
    this.ref.on('child_removed', this.removed.bind(this));

    this.loaded = new Promise((resolve: () => void) => {
      this.ref.once('value', () => {
        resolve();
      });
    });
  }

  add(data: any): void {
    this.ref.push(data, (error: Error) => {
      if (error) {
        console.error('ERROR @ FirebaseArray#add :', error);
      }
    });
  }

  remove(record: IFirebaseRecord): void {
    this.ref.child(record.$key).remove((error: Error) => {
      if (error) {
        console.error('ERROR @ FirebaseArray#remove :', error);
      }
    });
  }

  update(record: IFirebaseRecord, changes: any): void {
    this.ref.child(record.$key).update(changes, (error: Error) => {
      if (error) {
        console.error('ERROR @ FirebaseArray#update :', error);
      }
    });
  }

  protected created(snapshot: FirebaseDataSnapshot): void {
    let record = this.recordFromSnapshot(snapshot);
    if (this.indexOfKey(record.$key) === -1) {
      this.push(this.recordFromSnapshot(snapshot));
    }
  }

  protected removed(snapshot: FirebaseDataSnapshot): void {
    let index: number = this.indexOfKey(snapshot.key());
    if (index !== -1) {
      this.splice(index, 1);
    }
  }

  protected updated(snapshot: FirebaseDataSnapshot): void {
    let record: IFirebaseRecord = this.recordFromSnapshot(snapshot);
    let index: number = this.indexOfKey(record.$key);
    if (index !== -1) {
      this[index] = record;
    }
  }

  protected indexOfKey(key: string): number {
    return this.findIndex((record: IFirebaseRecord) => {
      return record.$key === key;
    });
  }

  protected recordFromSnapshot(snapshot: FirebaseDataSnapshot): IFirebaseRecord {
    let record: IFirebaseRecord = snapshot.val();
    record.$key = snapshot.key();
    return record;
  }
}
