import firebase from 'firebase/app';
import 'firebase/database';

export function getEvents(id, handleData) {
  firebase
    .database()
    .ref(id + '/events')
    .on('value', snap => handleData(snap.val()));
}

export function saveEvents(id, data, handleResponse) {
  firebase
    .database()
    .ref(id + '/events')
    .push(data, handleResponse);
}
