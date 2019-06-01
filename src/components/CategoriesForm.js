import React, { useState, useContext } from 'react';
import {
  IonCard,
  IonCardContent,
  IonInput,
  IonLabel,
  IonItem,
  IonButton
} from '@ionic/react';
import { saveCategory } from '../data/categories';
import { Context } from '../App';

function CategoriesForm(props) {
  const [cat, setCat] = useState('');
  const [saving, setSaving] = useState(false);
  const { id } = useContext(Context);

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
