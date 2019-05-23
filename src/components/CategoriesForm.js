import React, { useState } from 'react';
import {
  IonCard,
  IonCardContent,
  IonInput,
  IonLabel,
  IonItem,
  IonButton
} from '@ionic/react';
import firebase from 'firebase/app';
import 'firebase/database';

function CategoriesForm(props) {
  const [cat, setCat] = useState('');
  const [saving, setSaving] = useState(false);

  function setInput(e) {
    const val = e.target.value;
    setCat(val);
  }
  
  function saveCat() {
    setSaving(true);

    firebase
      .database()
      .ref('categories')
      .push({ name: cat }, () => {
        setSaving(false);
        setCat('');
      });
  }

  return (
    <IonCard>
      <IonCardContent>
        <IonItem>
          <IonLabel position="floating">Nombre</IonLabel>
          <IonInput value={cat} onIonInput={setInput} />
        </IonItem>
        <IonButton
          expand="block"
          color="primary"
          disabled={!cat || saving}
          onClick={saveCat}
        >
          Guardar
        </IonButton>
      </IonCardContent>
    </IonCard>
  );
}

export default CategoriesForm;
