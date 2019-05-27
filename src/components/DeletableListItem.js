import React from 'react';
import { IonItemSliding, IonItemOptions, IonItemOption } from '@ionic/react';
import { deleteEntity } from '../data/remove';

export default function DeletableListItem(props) {
  const { children, entityName, customRef } = props;
  return (
    <IonItemSliding>
      {children}
      <IonItemOptions side="end">
        <IonItemOption
          color="danger"
          onClick={() => deleteEntity(`${entityName}`, customRef)}
        >
          Borrar
        </IonItemOption>
      </IonItemOptions>
    </IonItemSliding>
  );
}
