import React from 'react';

import Totals from '../components/Totals';
import ExpenseForm from '../components/ExpenseForm';
import Page from '../components/Page';

function Home(props) {
  return (
    <Page title="Inicio">
      <ExpenseForm />
      <Totals />
    </Page>
  );
}

export default Home;
