import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from '@ionic/react';
import { useMachine } from '@xstate/react';
import React from 'react';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import { assign, createMachine, send } from 'xstate';
import './App.css';
import LoginForm from './components/LoginForm';
import { getCategories } from './data/categories';
import { getMonthlyExpenses } from './data/expenses';
import Categories from './pages/Categories';
import Home from './pages/Home';
import List from './pages/List';

export const AppStateMachine = createMachine(
  {
    id: 'app',
    initial: 'authenticating',
    context: {
      categories: null,
      gastos: null,
      id: null,
      lastMonth: null,
    },
    states: {
      notloggedin: {
        entry: ['clear'],
        on: {
          LOGIN: {
            target: 'gettingUserData',
          },
        },
      },
      authenticating: {
        entry: send(localStorage.getItem('id') ? 'AUTHORIZED' : 'UNAUTHORIZED'),
        on: {
          AUTHORIZED: {
            target: 'gettingUserData',
          },
          UNAUTHORIZED: 'notloggedin',
        },
      },
      idle: {
        on: {
          DELETED: 'expenseUpdated',
          ADDED: 'expenseUpdated',
          LOGOUT: 'notloggedin',
        },
      },
      expenseUpdated: {
        invoke: [
          {
            id: 'fetchMonthly',
            src: 'fetchMonthly',
            onDone: {
              target: 'idle',
              actions: assign((ctx, event) => {
                return { ...ctx, gastos: event.data };
              }),
            },
          },
        ],
      },
      categoryUpdated: {},
      gettingUserData: {
        entry: ['auth'],
        invoke: [
          {
            id: 'fetchData',
            src: 'fetchData',
            onDone: {
              target: 'idle',
              actions: assign((_, event) => ({ ...event.data })),
            },
          },
        ],
      },
    },
  },
  {
    actions: {
      clear: assign({
        id: null,
        lastMonth: null,
        gastos: null,
        categories: null,
      }),
      auth: assign((ctx) => ({ ...ctx, id: localStorage.getItem('id') })),
    },
    services: {
      fetchData: async ({ id }) => {
        const month = new Date().getMonth();
        const categories = await getCategories(id);
        const gastos = await getMonthlyExpenses(id, month);
        const lastMonth = await getMonthlyExpenses(id, month - 1);

        return { categories, gastos, lastMonth };
      },
      fetchMonthly: ({ id }) => getMonthlyExpenses(id, new Date().getMonth()),
    },
  }
);

export const AppContext = React.createContext();

function App(props) {
  const { Provider } = AppContext;
  const [_state, _send] = useMachine(AppStateMachine);

  if (_state.matches('notloggedin')) {
    return (
      <Provider value={[_state, _send]}>
        <LoginForm />
      </Provider>
    );
  }

  return (
    <Provider value={[_state, _send]}>
      <Router>
        <IonApp>
          <Route exact path="/" render={() => <Redirect to="/home" />} />
          <IonTabs>
            <IonRouterOutlet>
              <Route
                path="/:tab(home)"
                render={(props) => (
                  <Home {...props} setId={() => _send('LOGOUT')} />
                )}
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
                <IonIcon icon="home" />
                <IonLabel>Inicio</IonLabel>
              </IonTabButton>
              <IonTabButton tab="speakers" href="/categories">
                <IonIcon icon="pricetag" />
                <IonLabel>Categories</IonLabel>
              </IonTabButton>
              <IonTabButton tab="map" href="/list">
                <IonIcon icon="list" />
                <IonLabel>Lista</IonLabel>
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        </IonApp>
      </Router>
    </Provider>
  );
}

export default App;
