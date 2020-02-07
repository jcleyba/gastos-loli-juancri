import React from 'react';

import Totals from '../components/Totals';
import ExpenseForm from '../components/ExpenseForm';
import Page from '../components/Page';

function Home(props) {
  const { selectedEv, history } = props;

  if (!selectedEv) {
    history.push('/events');
  }
  const { name } = selectedEv || {};
  return (
    <Page title={`${name}: Flujo de caja`}>
      <ExpenseForm />
      <Totals />
    </Page>
  );
}

export default Home;
