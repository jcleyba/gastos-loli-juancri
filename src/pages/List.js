import React, { useEffect, useState, useRef, useContext } from 'react';
import { IonItem, IonList, IonLabel, IonText } from '@ionic/react';
import { format } from 'date-fns';

import Page from '../components/Page';
import DeletableListItem from '../components/DeletableListItem';
import { getLastExpenses } from '../data/expenses';
import { Context } from '../App';

function List(props) {
  const [gastos, setGastos] = useState(null);
  const sliding = useRef(null);
  const { id, selectedEv } = useContext(Context);
  const url = `${id}/events/${selectedEv.id}`;

  useEffect(() => {
    getLastExpenses(url, 50, setGastos);
  }, []);

  return (
    <Page title={`${selectedEv.name}: Movimientos`}>
      <IonList ref={sliding}>
        {renderObjectAsList(url, gastos, sliding)}
      </IonList>
    </Page>
  );
}

function renderObjectAsList(id, object, ref) {
  if (!object) return 'Sin datos...';

  const keys = Object.keys(object);

  return keys.reverse().map((item, i) => {
    const gasto = object[item];

    return (
      <DeletableListItem
        key={i}
        entityName={`${id}/gastos/${item}`}
        customRef={ref}>
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
