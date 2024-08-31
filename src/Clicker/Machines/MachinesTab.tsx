import React from 'react';
import { useScore } from '../ScoreContext';
import MachineItem from './MachineItem';
import BuyMachineList from './BuyMachineList';



const MachinesTab = () => {
    const { state } = useScore();

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Machines Tab</h2>
            <div className='grid grid-cols-2 gap-4'>
                <BuyMachineList />
            </div>
            <br />
            <div className='grid grid-cols-2 gap-4'>
                {state.machines.list.map(machine => (
                    <MachineItem key={machine.id} machine={machine} />
                ))}
            </div>
        </div>
    );
};

export default MachinesTab;
