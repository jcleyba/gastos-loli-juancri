import React, { useContext, useRef } from 'react';
import {
  IonList,
  IonItem,
  IonItemSliding,
  IonLabel,
  IonItemOptions,
  IonItemOption
} from '@ionic/react';

import { Context } from '../App';
import CategoriesForm from '../components/CategoriesForm';
import { deleteEntity } from '../utils';
import Page from '../components/Page';

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
      <IonItemSliding key={i}>
        <IonItem>
          <IonLabel>{entity.name}</IonLabel>
        </IonItem>
        <IonItemOptions side="end">
          <IonItemOption
            color="danger"
            onClick={() => deleteEntity(`categories/${item}`, ref)}
          >
            Borrar
          </IonItemOption>
        </IonItemOptions>
      </IonItemSliding>
    );
  });
}

export default Categories;
