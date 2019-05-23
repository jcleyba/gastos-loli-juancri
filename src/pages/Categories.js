import React, { useContext, useRef } from 'react';
import { IonList, IonItem, IonLabel } from '@ionic/react';

import { Context } from '../App';
import CategoriesForm from '../components/CategoriesForm';
import Page from '../components/Page';
import DeletableListItem from '../components/DeletableListItem';

function Categories(props) {
  const { categories } = useContext(Context);
  const sliding = useRef(null);

  return (
    <Page title="Categorías">
      <CategoriesForm />
      <IonList ref={sliding}>{renderObjectAsList(categories, sliding)}</IonList>
    </Page>
  );
}

function renderObjectAsList(object, ref) {
  if (!object) return 'Cargando datos...';

  const keys = Object.keys(object);

  return keys.map((item, i) => {
    const entity = object[item];

    return (
      <DeletableListItem
        key={i}
        entityName={`categories/${item}`}
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
