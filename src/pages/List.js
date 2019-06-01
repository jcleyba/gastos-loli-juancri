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
  const { id } = useContext(Context);

  useEffect(() => {
    getLastExpenses(id, 40, setGastos);
  }, []);

  return (
    <Page title="Inicio">
      <IonList ref={sliding}>{renderObjectAsList(id, gastos, sliding)}</IonList>
    </Page>
  );
}

function renderObjectAsList(id, object, ref) {
  if (!object) return 'Cargando datos...';

  const keys = Object.keys(object);

  return keys.reverse().map((item, i) => {
    const gasto = object[item];

    return (
      <DeletableListItem
        key={i}
        entityName={`${id}/gastos/${item}`}
        customRef={ref}
      >
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
