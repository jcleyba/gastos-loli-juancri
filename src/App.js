import React, { useState, useEffect, createContext } from 'react';
import {
  IonApp,
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
  IonRouterOutlet
} from '@ionic/react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import Home from './pages/Home';
import Categories from './pages/Categories';
import List from './pages/List';
import { getMonthlyExpenses } from './data/expenses';
import { getCategories } from './data/categories';

export const Context = createContext();

function App(props) {
  const [categories, setCategories] = useState(null);
  const [gastos, setGastos] = useState(null);
  const [lastMonth, setLastMonth] = useState(null);

  useEffect(() => {
    const month = new Date().getMonth();
    getMonthlyExpenses(setGastos, month);
    getMonthlyExpenses(setLastMonth, month - 1);
    getCategories(setCategories);
  }, []);

  return (
    <Context.Provider value={{ gastos, categories, lastMonth }}>
      <Router>
        <IonApp>
          <Route exact path="/" render={() => <Redirect to="/home" />} />
          <IonTabs>
            <IonRouterOutlet>
              <Route
                path="/:tab(home)"
                render={props => <Home {...props} />}
                exact={true}
              />
              <Route
                path="/:tab(categories)"
                component={Categories}
                exact={true}
              />
              <Route path="/:tab(list)" component={List} exact={true} />
            </IonRouterOutlet>
            <IonTabBar slot="bottom">
              <IonTabButton tab="schedule" href="/home">
                <IonIcon name="calendar" />
                <IonLabel>Inicio</IonLabel>
              </IonTabButton>
              <IonTabButton tab="speakers" href="/categories">
                <IonIcon name="contacts" />
                <IonLabel>Categories</IonLabel>
              </IonTabButton>
              <IonTabButton tab="map" href="/list">
                <IonIcon name="map" />
                <IonLabel>Lista</IonLabel>
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        </IonApp>
      </Router>
    </Context.Provider>
  );
}

export default App;
