import firebase from 'firebase/app';
import 'firebase/database';

export function getExpenses(id, handleData) {
  firebase
    .database()
    .ref(id + '/gastos')
    .orderByChild('ts')
    .on('value', snap => handleData(snap.val()));
}

export function getLastExpenses(id, limit = 40, handleData) {
  firebase
    .database()
    .ref(id + '/gastos')
    .limitToLast(limit)
    .orderByChild('ts')
    .on('value', snap => handleData(snap.val()));
}

export function saveExpenses(id, data, handleResponse) {
  firebase
    .database()
    .ref(id + '/gastos')
    .push(data, handleResponse);
}
