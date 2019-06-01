import firebase from 'firebase/app';
import 'firebase/database';
import { startOfMonth, endOfMonth } from 'date-fns';

export function getMonthlyExpenses(id, handleData) {
  const now = new Date();

  firebase
    .database()
    .ref(id + '/gastos')
    .orderByChild('ts')
    .startAt(startOfMonth(now).getTime())
    .endAt(endOfMonth(now).getTime())
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
