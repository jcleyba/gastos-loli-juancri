import React, { useContext, useRef } from 'react';
import { IonList, IonItem, IonLabel } from '@ionic/react';

import { Context } from '../App';
import CategoriesForm from '../components/CategoriesForm';
import Page from '../components/Page';
import DeletableListItem from '../components/DeletableListItem';

function Categories(props) {
  const { categories, id, selectedEv } = useContext(Context);
  const sliding = useRef(null);
  const url = `${id}/events/${selectedEv.id}`;

  return (
    <Page title={`${selectedEv.name}: Categorías`}>
      <CategoriesForm />
      <IonList ref={sliding}>
        {renderObjectAsList(categories, sliding, url)}
      </IonList>
    </Page>
  );
}

function renderObjectAsList(object, ref, id) {
  if (!object) return 'Sin datos...';

  const keys = Object.keys(object);

  return keys.map((item, i) => {
    const entity = object[item];

    return (
      <DeletableListItem
        key={i}
        entityName={`${id}/categories/${item}`}
        customRef={ref}>
        <IonItem>
          <IonLabel>{entity.name}</IonLabel>
        </IonItem>
      </DeletableListItem>
    );
  });
}

export default Categories;
