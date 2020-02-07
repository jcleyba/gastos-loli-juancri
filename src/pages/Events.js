import React, { useContext, useRef } from 'react';
import { IonList, IonItem, IonLabel, IonCheckbox } from '@ionic/react';

import { Context } from '../App';
import EventsForm from '../components/EventsForm';
import Page from '../components/Page';
import DeletableListItem from '../components/DeletableListItem';

function Events(props) {
  const { events, selectedEv, setSelectedEv, id } = useContext(Context);
  const sliding = useRef(null);

  const callback = item => {
    setSelectedEv(item);
    props.history.push('/home');
  };

  return (
    <Page {...props} title="Eventos">
      <EventsForm />
      <IonList ref={sliding}>
        {renderObjectAsList(events, sliding, id, callback, selectedEv)}
      </IonList>
    </Page>
  );
}

function renderObjectAsList(object, ref, id, cb, selectedEv) {
  if (!object) return 'Cargando datos...';

  const keys = Object.keys(object);

  return keys.map((item, i) => {
    const { id: selectedEvId } = selectedEv || {};
    const entity = { id: item, ...object[item] };

    return (
      <DeletableListItem
        key={i}
        entityName={`${id}/events/${item}`}
        customRef={ref}>
        <IonItem onClick={() => cb(entity)}>
          <IonLabel>{entity.name}</IonLabel>
          <IonCheckbox checked={selectedEvId === item} slot="end" />
        </IonItem>
      </DeletableListItem>
    );
  });
}

export default Events;
