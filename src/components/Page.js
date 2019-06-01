import React from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonButton
} from '@ionic/react';

function Page(props) {
  const { setId } = props;

  const clearSession = () => {
    setId(null);
    localStorage.clear();
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>{props.title}</IonTitle>
          {setId && (
            <IonButtons slot="end">
              <IonButton onClick={clearSession}>Cerrar sesión</IonButton>
            </IonButtons>
          )}
        </IonToolbar>
      </IonHeader>
      <IonContent color="light">
        {props.children}
      </IonContent>
    </IonPage>
  );
}

export default Page;
