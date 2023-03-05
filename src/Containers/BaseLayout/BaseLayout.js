import React from 'react';
import { useMachine } from '@xstate/react';
import bookingMachine from '../../Machines/bookingMachine';
import { StepsLayout } from '../Step/StepsLayout';
import { Nav } from '../../Components/Nav/Nav';
import './BaseLayout.css';

export const BaseLayout = () => {
    const [state, send] = useMachine(bookingMachine);

    
    return (
        <div className='BaseLayout' id='BL'>
            <Nav state={state} send={send} />
            <StepsLayout state={state} send={send}/>
        </div>
    );
}
