import React from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent
} from '@ionic/react';

function Page(props) {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="default">
          <IonTitle>{props.title}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>{props.children}</IonContent>
    </IonPage>
  );
}

export default Page;
