import React, { useRef } from 'react';
import { IonList, IonItem, IonLabel } from '@ionic/react';
import { useMachine } from '@xstate/react';
import { AppStateMachine } from '../App';
import CategoriesForm from '../components/CategoriesForm';
import Page from '../components/Page';
import DeletableListItem from '../components/DeletableListItem';

function Categories(props) {
  const [appState] = useMachine(AppStateMachine);
  const { categories, id } = appState.context;
  const sliding = useRef(null);

  return (
    <Page title="Categorías">
      <CategoriesForm />
      <IonList ref={sliding}>
        {renderObjectAsList(categories, sliding, id)}
      </IonList>
    </Page>
  );
}

function renderObjectAsList(object, ref, id) {
  if (!object) return 'Cargando datos...';

  const keys = Object.keys(object);

  return keys.map((item, i) => {
    const entity = object[item];

    return (
      <DeletableListItem
        key={i}
        entityName={`${id}/categories/${item}`}
        customRef={ref}
      >
        <IonItem>
          <IonLabel>{entity.name}</IonLabel>
        </IonItem>
      </DeletableListItem>
    );
  });
}

export default Categories;
