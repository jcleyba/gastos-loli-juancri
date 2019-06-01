import React, { useState } from 'react';
import {
  IonCard,
  IonCardContent,
  IonInput,
  IonLabel,
  IonItem,
  IonButton
} from '@ionic/react';

function LoginForm(props) {
  const [id, setId] = useState('');
  const [saving, setSaving] = useState(false);

  function setInput(e) {
    const val = e.target.value;
    setId(val);
  }

  function saveId() {
    setSaving(true);
    localStorage.setItem('id', id);
    props.setId(id);
    
    setSaving(false);
    setId('');
  }

  return (
    <IonCard color="default">
      <IonCardContent>
        <IonItem>
          <IonLabel position="floating">DNI</IonLabel>
          <IonInput value={id} onIonInput={setInput} />
        </IonItem>
        <IonButton
          expand="block"
          color="primary"
          disabled={!id || saving}
          onClick={saveId}
        >
          Guardar
        </IonButton>
      </IonCardContent>
    </IonCard>
  );
}

export default LoginForm;
