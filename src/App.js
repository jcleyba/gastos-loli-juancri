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

import firebase from 'firebase/app';
import 'firebase/database';
import { startOfMonth, endOfMonth } from 'date-fns';

import Home from './pages/Home';
import Categories from './pages/Categories';
import List from './pages/List';

export const Context = createContext();

function App(props) {
  const [categories, setCategories] = useState(null);
  const [gastos, setGastos] = useState(null);

  useEffect(() => {
    const now = new Date();

    firebase
      .database()
      .ref('gastos')
      .orderByChild('ts')
      .startAt(startOfMonth(now).getTime())
      .endAt(endOfMonth(now).getTime())
      .on('value', snap => setGastos(snap.val()));
      
    firebase
      .database()
      .ref('categories')
      .on('value', snap => setCategories(snap.val()));

    firebase
      .database()
      .ref('categories')
      .on('child_changed', snap => setCategories(snap.val()));
  }, []);

  return (
    <Context.Provider value={{ gastos, categories }}>
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
