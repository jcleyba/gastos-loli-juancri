import React, { useState, useEffect, useContext } from 'react';
import {
  IonCard,
  IonCardContent,
  IonInput,
  IonLabel,
  IonItem,
  IonButton,
  IonSelect,
  IonSelectOption
} from '@ionic/react';

import { Context } from '../App';
import { saveExpenses } from '../data/expenses';

function ExpenseForm(props) {
  const { categories, id } = useContext(Context);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [saving, setSaving] = useState(false);

  function setInput(e, callback) {
    const val = e.target.value;
    callback(val);
  }

  useEffect(() => {
    setCategory('');
  }, [categories]);

  function saveExp() {
    setSaving(true);

    saveExpenses(
      id,
      { description, amount, ts: Date.now(), cat: category },
      () => {
        setSaving(false);
        setDescription('');
        setAmount('');
        setCategory('');
      }
    );
  }

  function renderCategoriesOptions() {
    if (!categories) return 'Cargando datos...';

    const keys = Object.keys(categories);

    return keys.map(item => {
      const cat = categories[item];

      return (
        <IonSelectOption key={item} value={item}>
          {cat.name}
        </IonSelectOption>
      );
    });
  }

  return (
    <IonCard color="default">
      <IonCardContent>
        <IonItem>
          <IonLabel position="floating">Descripción</IonLabel>
          <IonInput
            value={description}
            onIonInput={e => setInput(e, setDescription)}
          />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Monto</IonLabel>
          <IonInput
            type="number"
            min="0"
            value={amount}
            onIonInput={e => setInput(e, setAmount)}
          />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Tipo de Gasto</IonLabel>
          <IonSelect
            value={category}
            interface="popover"
            onIonChange={e => setInput(e, setCategory)}
          >
            {renderCategoriesOptions()}
          </IonSelect>
        </IonItem>
        <IonButton
          expand="block"
          color="primary"
          disabled={!description || !amount || !category || saving}
          onClick={saveExp}
        >
          Guardar
        </IonButton>
      </IonCardContent>
    </IonCard>
  );
}

export default ExpenseForm;
