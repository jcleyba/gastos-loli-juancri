import { IonItemOption, IonItemOptions, IonItemSliding } from '@ionic/react';
import React, { useContext } from 'react';
import { deleteEntity } from '../data/remove';
import { AppContext } from '../App';

export default function DeletableListItem(props) {
  const [, send] = useContext(AppContext);
  const { children, entityName, customRef } = props;

  return (
    <IonItemSliding>
      {children}
      <IonItemOptions side="end">
        <IonItemOption
          color="danger"
          onClick={() => {
            deleteEntity(`${entityName}`, customRef).then(() =>
              send('DELETED')
            );
          }}
        >
          Borrar
        </IonItemOption>
      </IonItemOptions>
    </IonItemSliding>
  );
}
