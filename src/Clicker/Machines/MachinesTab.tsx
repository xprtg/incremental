import React from 'react';
import { useScore } from '../ScoreContext';
import MachineItem from './MachineItem';



const MachinesTab = () => {
    const { state, dispatch } = useScore();

    const handleBuyMachine = () => {
        const newId = "machine-" + String(state.machines.list.length);
        dispatch({
            type: 'BUY_MACHINE',
            payload: { id: newId, cost: 20, rate: 1000 } // Example cost and rate
        });
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Machines Tab</h2>
            <button
                onClick={handleBuyMachine}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4"
            >
                Buy New Machine
            </button>
            <div className='grid grid-cols-2 gap-4'>
                {state.machines.list.map(machine => (
                    <MachineItem key={machine.id} machine={machine} />
                ))}
            </div>
        </div>
    );
};

export default MachinesTab;
