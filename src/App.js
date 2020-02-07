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
import Events from './pages/Events';
import LoginForm from './components/LoginForm';
import { getEvents } from './data/events';
import { getCategories } from './data/categories';
import { getExpenses } from './data/expenses';

export const Context = createContext();

function App(props) {
  const [events, setEvents] = useState(null);
  const [selectedEv, setSelectedEv] = useState(null);
  const [gastos, setGastos] = useState(null);
  const [id, setId] = useState(null);
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    const uid = localStorage.getItem('id');
    setId(uid);
  }, []);

  useEffect(() => {
    getEvents(id, setEvents);
  }, [id]);

  useEffect(() => {
    if (selectedEv) {
      const url = `${id}/events/${selectedEv.id}`;

      getCategories(url, setCategories);
      getExpenses(url, setGastos);
    }
  }, [selectedEv]);

  if (!id) {
    return <LoginForm setId={setId} />;
  }

  return (
    <Context.Provider
      value={{ events, categories, selectedEv, setSelectedEv, id, gastos }}>
      <Router>
        <IonApp>
          <Route exact path="/" render={() => <Redirect to="/events" />} />
          <IonTabs>
            <IonRouterOutlet>
              <Route
                path="/:tab(events)"
                render={props => <Events {...props} setId={setId} />}
                exact={true}
              />
              <Route
                path="/:tab(home)"
                render={(props) => <Home {...props} selectedEv={selectedEv} />}
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
              <IonTabButton tab="events" href="/events">
                <IonIcon name="calendar" />
                <IonLabel>Eventos</IonLabel>
              </IonTabButton>
              <IonTabButton tab="home" href="/home" disabled={!selectedEv}>
                <IonIcon name="card" />
                <IonLabel>Gastos</IonLabel>
              </IonTabButton>
              <IonTabButton
                tab="speakers"
                href="/categories"
                disabled={!selectedEv}>
                <IonIcon name="pricetag" />
                <IonLabel>Categorías</IonLabel>
              </IonTabButton>
              <IonTabButton tab="map" href="/list" disabled={!selectedEv}>
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
