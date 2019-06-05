import React, { useContext } from 'react';
import { IonList, IonItem, IonText } from '@ionic/react';
import { Context } from '../App';

function Totals(props) {
  const { gastos, categories, lastMonth } = useContext(Context);

  function calcLastMonth() {
    if (!lastMonth) return null;

    const keys = Object.keys(lastMonth);
    let sum = 0;
    keys.forEach(item => {
      sum += Number(lastMonth[item].amount);
    });

    return (
      <IonItem>
        <IonText>
          Mes pasado: <b>${sum.toFixed(2)}</b>
        </IonText>
      </IonItem>
    );
  }

  function mapGastos() {
    if (!categories || !gastos) return null;

    let mapped = {};
    const keys = Object.keys(gastos);

    keys.forEach(item => {
      const gasto = gastos[item];

      if (!mapped[gasto.cat]) {
        mapped[gasto.cat] = [gasto.amount];
      } else {
        mapped[gasto.cat].push(gasto.amount);
      }
    });

    return mapped;
  }

  function renderTotals() {
    let monthlySum = 0;
    const mapped = mapGastos();
    if (!mapped || !categories) return 'Cargando datos...';

    const keys = Object.keys(mapped);

    const list = keys.map((item, i) => {
      const cat = categories[item];
      const sum = mapped[item].reduce((a, b) => Number(a) + Number(b), 0);
      monthlySum += sum;

      return (
        <IonItem key={i}>
          <IonText> {cat.name}</IonText>
          <IonText slot="end">${sum.toFixed(2)}</IonText>
        </IonItem>
      );
    });

    return (
      <IonList>
        <IonItem>
          <IonText>
            Total Mensual: <b>${monthlySum.toFixed(2)}</b>
          </IonText>
        </IonItem>
        {calcLastMonth()}
        {list}
      </IonList>
    );
  }

  return renderTotals();
}

export default Totals;
