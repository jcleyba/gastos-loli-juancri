import firebase from 'firebase/app';
import 'firebase/database';

export function getCategories(id, handleData) {
  firebase
    .database()
    .ref(id + '/categories')
    .on('value', snap => handleData(snap.val()));
}

export function saveCategory(id, data, handleResponse) {
  firebase
    .database()
    .ref(id + '/categories')
    .push(data, handleResponse);
}
