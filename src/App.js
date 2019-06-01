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

import './App.css';
import Home from './pages/Home';
import Categories from './pages/Categories';
import List from './pages/List';
import LoginForm from './components/LoginForm';
import { getMonthlyExpenses } from './data/expenses';
import { getCategories } from './data/categories';

export const Context = createContext();

function App(props) {
  const [categories, setCategories] = useState(null);
  const [gastos, setGastos] = useState(null);
  const [id, setId] = useState(null);

  useEffect(() => {
    const uid = localStorage.getItem('id');
    setId(uid);
  }, []);

  useEffect(() => {
    getMonthlyExpenses(id, setGastos);
    getCategories(id, setCategories);
  }, [id]);

  if (!id) {
    return <LoginForm setId={setId} />;
  }

  return (
    <Context.Provider value={{ gastos, categories, id }}>
      <Router>
        <IonApp>
          <Route exact path="/" render={() => <Redirect to="/home" />} />
          <IonTabs>
            <IonRouterOutlet>
              <Route
                path="/:tab(home)"
                render={props => <Home {...props} setId={setId} />}
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
                <IonIcon name="home" />
                <IonLabel>Inicio</IonLabel>
              </IonTabButton>
              <IonTabButton tab="speakers" href="/categories">
                <IonIcon name="pricetag" />
                <IonLabel>Categories</IonLabel>
              </IonTabButton>
              <IonTabButton tab="map" href="/list">
                <IonIcon name="list" />
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
