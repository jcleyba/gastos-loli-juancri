import {
  IonButton,
  IonCard,
  IonCardContent,
  IonInput,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption
} from '@ionic/react';
import { useMachine } from '@xstate/react';
import React, { useContext } from 'react';
import { assign, createMachine } from 'xstate';
import { AppContext } from '../App';
import { saveExpenses } from '../data/expenses';

const expensesMachine = createMachine(
  {
    id: 'expense',
    initial: 'editing',
    context: {
      description: '',
      amount: '',
      category: '',
    },
    states: {
      editing: {
        on: {
          CHANGE: {
            actions: ['onChange'],
          },
          SUBMIT: 'saving',
        },
      },
      saving: {
        on: {
          SUCCESS: {
            actions: ['clearForm'],
            target: 'editing',
          },
        },
      },
    },
  },
  {
    actions: {
      // Assign
      onChange: assign((ctx, e) => ({
        ...ctx,
        [e.key]: e.value,
      })),
      clearForm: assign({
        description: '',
        amount: '',
        category: '',
      }),
    },
  }
);

function ExpenseForm() {
  const [appState, globalSend] = useContext(AppContext);
  const [state, send] = useMachine(expensesMachine);
  const { categories, id } = appState.context;
  const { description, amount, category } = state.context;

  function setInput(e) {
    e.preventDefault();
    send('CHANGE', { key: e.target.name, value: e.target.value });
  }

  async function saveExp() {
    send('SUBMIT');
    await saveExpenses(id, {
      description,
      amount,
      ts: Date.now(),
      cat: category,
    });
    send('SUCCESS');
    globalSend('ADDED');
  }

  function renderCategoriesOptions() {
    if (!categories) return 'Cargando datos...';

    const keys = Object.keys(categories);

    return keys.map((item) => {
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
            name="description"
            value={description}
            onIonInput={setInput}
          />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Monto</IonLabel>
          <IonInput
            name="amount"
            type="number"
            min="0"
            value={amount}
            onIonInput={setInput}
          />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Tipo de Gasto</IonLabel>
          <IonSelect
            name="category"
            value={category}
            interface="popover"
            onIonChange={setInput}
          >
            {renderCategoriesOptions()}
          </IonSelect>
        </IonItem>
        <IonButton
          expand="block"
          color="primary"
          disabled={
            state.matches('saving') || !category || !amount || !description
          }
          onClick={saveExp}
        >
          Guardar
        </IonButton>
      </IonCardContent>
    </IonCard>
  );
}

export default ExpenseForm;
