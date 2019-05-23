import React, { useEffect, useState, useRef } from 'react';
import { IonItem, IonList, IonLabel, IonText } from '@ionic/react';
import { format } from 'date-fns';
import firebase from 'firebase/app';
import 'firebase/database';

import Page from '../components/Page';
import DeletableListItem from '../components/DeletableListItem';

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
      <DeletableListItem key={i} entityName={`gastos/${item}`} customRef={ref}>
        <IonItem>
          <IonLabel>
            {gasto.description} <br />
            {format(new Date(gasto.ts), 'DD/MM/YYYY')}
          </IonLabel>
          <IonText slot="end">${gasto.amount}</IonText>
        </IonItem>
      </DeletableListItem>
    );
  });
}

export default List;
