import React from 'react';
import { Welcome } from '../../Components/Welcome/Welcome';
import { Search } from '../../Components/Search/Search';
import { Passengers } from '../../Components/Passengers/Passengers';
import { Tickets } from '../../Components/Ticket/Tickets';
import './StepsLayout.css';

export const StepsLayout = ({ state, send }) => {
  const renderContent = () => {
    if(state.matches('initial')) return <Welcome send={send}/>;
    if(state.matches('search')) return <Search state={state} send={send}/>;
    if(state.matches('tickets')) return <Tickets send={send} context={state.context}/>;
    if(state.matches('passengers')) return <Passengers state={state} send={send}/>;
    return null;
  };

  return (
    <div className='StepsLayout'>
      {renderContent()}
    </div>
  );
}; 