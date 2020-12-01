import firebase from 'firebase/app';
import 'firebase/database';

export function getCategories(id) {
  return new Promise((resolve, reject) => {
    firebase
      .database()
      .ref(id + '/categories')
      .on('value', (snap) => resolve(snap.val()));
  });
}

export function saveCategory(id, data) {
  return new Promise((resolve, reject) => {
    firebase
      .database()
      .ref(id + '/categories')
      .push(data, (error) => {
        if (error) reject(error);
        resolve();
      });
  });
}
