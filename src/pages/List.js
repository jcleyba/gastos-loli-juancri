import { IonItem, IonLabel, IonList, IonText } from '@ionic/react';
import { format } from 'date-fns';
import React, { useRef, useContext } from 'react';
import { AppContext } from '../App';
import DeletableListItem from '../components/DeletableListItem';
import Page from '../components/Page';

function List() {
  const sliding = useRef(null);
  const [appState] = useContext(AppContext);
  const { id, gastos } = appState.context;

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

export default React.memo(List);
