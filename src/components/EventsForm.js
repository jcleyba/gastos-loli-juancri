import React, { useState, useContext } from 'react';
import {
  IonCard,
  IonCardContent,
  IonInput,
  IonLabel,
  IonItem,
  IonButton,
  IonDatetime
} from '@ionic/react';
import { saveEvents } from '../data/events';
import { Context } from '../App';

function EventsForm(props) {
  const [ev, setEv] = useState('');
  const [date, setDate] = useState('');
  const [saving, setSaving] = useState(false);
  const { id } = useContext(Context);

  function setInput(e) {
    const val = e.target.value;
    setEv(val);
  }

  function setDateTime(e) {
    const val = e.target.value;
    setDate(val);
  }

  function saveEvt() {
    setSaving(true);

    saveEvents(id, { name: ev, ts: new Date(date).getTime() }, () => {
      setSaving(false);
      setEv('');
      setDate('');
    });
  }

  return (
    <IonCard color="default">
      <IonCardContent>
        <IonItem>
          <IonLabel position="floating">Nombre</IonLabel>
          <IonInput value={ev} onIonInput={setInput} />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Fecha</IonLabel>
          <IonDatetime
            displayFormat="DD/MM/YYYY"
            placeholder="Seleccionar"
            value={date}
            onIonChange={setDateTime}
          />
        </IonItem>
        <IonButton
          expand="block"
          color="primary"
          disabled={!ev || !date || saving}
          onClick={saveEvt}>
          Guardar
        </IonButton>
      </IonCardContent>
    </IonCard>
  );
}

export default EventsForm;
