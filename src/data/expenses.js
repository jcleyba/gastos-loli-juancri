import firebase from 'firebase/app';
import 'firebase/database';
import { startOfMonth, endOfMonth } from 'date-fns';

export function getMonthlyExpenses(handleData, month) {
  const now = new Date().setMonth(month);

  firebase
    .database()
    .ref('gastos')
    .orderByChild('ts')
    .startAt(startOfMonth(now).getTime())
    .endAt(endOfMonth(now).getTime())
    .on('value', snap => handleData(snap.val()));
}

export function getLastExpenses(limit = 40, handleData) {
  firebase
    .database()
    .ref('gastos')
    .limitToLast(limit)
    .orderByChild('ts')
    .on('value', snap => handleData(snap.val()));
}

export function saveExpenses(data, handleResponse) {
  firebase
    .database()
    .ref('gastos')
    .push(data, handleResponse);
}
