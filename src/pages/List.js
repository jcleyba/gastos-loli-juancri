import React, { useEffect, useState, useRef } from 'react';
import {
  IonItem,
  IonList,
  IonItemSliding,
  IonLabel,
  IonItemOptions,
  IonItemOption,
  IonText
} from '@ionic/react';
import { format } from 'date-fns';

import firebase from 'firebase/app';
import 'firebase/database';
import { deleteEntity } from '../utils';
import Page from '../components/Page';

function List(props) {
  const [gastos, setGastos] = useState(null);
  const sliding = useRef(null);

  useEffect(() => {
    firebase
      .database()
      .ref('gastos')
      .limitToLast(40)
      .orderByChild('ts')
      .on('value', snap => setGastos(snap.val()));
  }, []);

  return (
    <Page title="Inicio">
      <IonList ref={sliding}>{renderObjectAsList(gastos, sliding)}</IonList>
    </Page>
  );
}

function renderObjectAsList(object, ref) {
  if (!object) return 'Cargando datos...';

  const keys = Object.keys(object);

  return keys.reverse().map((item, i) => {
    const gasto = object[item];

    return (
      <IonItemSliding key={i}>
        <IonItem>
          <IonLabel>
            {gasto.description} <br />
            {format(new Date(gasto.ts), 'DD/MM/YYYY')}
          </IonLabel>
          <IonText slot="end">${gasto.amount}</IonText>
        </IonItem>
        <IonItemOptions side="end">
          <IonItemOption
            color="danger"
            onClick={() => deleteEntity(`gastos/${item}`, ref)}
          >
            Borrar
          </IonItemOption>
        </IonItemOptions>
      </IonItemSliding>
    );
  });
}

export default List;
