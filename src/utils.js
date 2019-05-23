import firebase from 'firebase/app';
import 'firebase/database';

export function deleteEntity(uri, ref) {
  function close() {
    if (ref.current) {
      ref.current.closeSlidingItems();
    }
  }
  firebase
    .database()
    .ref(uri)
    .remove(close);
}
