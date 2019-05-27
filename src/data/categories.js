import firebase from 'firebase/app';
import 'firebase/database';

export function getCategories(handleData) {
  firebase
    .database()
    .ref('categories')
    .on('value', snap => handleData(snap.val()));
}

export function saveCategory(data, handleResponse) {
  firebase
    .database()
    .ref('categories')
    .push(data, handleResponse);
}
