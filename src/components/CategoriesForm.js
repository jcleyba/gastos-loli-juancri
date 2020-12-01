import {
  IonButton,
  IonCard,
  IonCardContent,
  IonInput,
  IonItem,
  IonLabel,
} from '@ionic/react';
import { useMachine } from '@xstate/react';
import React, { useState } from 'react';
import { saveCategory } from '../data/categories';
import { AppStateMachine } from '../App';

function CategoriesForm() {
  const [cat, setCat] = useState('');
  const [saving, setSaving] = useState(false);
  const [appState] = useMachine(AppStateMachine);
  const { id } = appState.context;

  function setInput(e) {
    const val = e.target.value;
    setCat(val);
  }

  function saveCat() {
    setSaving(true);

    saveCategory(id, { name: cat }, () => {
      setSaving(false);
      setCat('');
    });
  }

  return (
    <IonCard color="default">
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
