import firebase from 'firebase/app';
import 'firebase/database';
import { startOfMonth, endOfMonth } from 'date-fns';

export function getMonthlyExpenses(id, month) {
  const now = new Date().setMonth(month);
  return new Promise((resolve, reject) => {
    firebase
      .database()
      .ref(id + '/gastos')
      .orderByChild('ts')
      .startAt(startOfMonth(now).getTime())
      .endAt(endOfMonth(now).getTime())
      .on('value', (snap) => resolve(snap.val()));
  });
}

export function getLastExpenses(id, limit = 40) {
  return new Promise((resolve, reject) => {
    firebase
      .database()
      .ref(id + '/gastos')
      .limitToLast(limit)
      .orderByChild('ts')
      .on('value', (snap) => resolve(snap.val()));
  });
}

export function saveExpenses(id, data) {
  return new Promise((resolve, reject) => {
    firebase
      .database()
      .ref(id + '/gastos')
      .push(data, (error) => {
        if (error) reject(error);
        resolve();
      });
  });
}
