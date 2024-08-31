import { DollarSign, TrendingUp, Users } from "lucide-react";
import { machineList } from "../db/machines";
import { Machine, useScore } from "../ScoreContext";

const BuyMachineList = () => {
    const { state, dispatch } = useScore();

    const handleBuyMachine = (machine: Machine) => {
        dispatch({
            type: 'BUY_MACHINE',
            payload: machine
        });
    };

    const availableMachines = machineList.filter(machine =>
        !state.machines.list.some(stateMachine => stateMachine.id === machine.id)
    );

    return (
        <>
            {availableMachines.length > 0 ? (
                availableMachines.map(machine => (
                    <div
                        key={machine.id}
                        className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
                    >
                        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4">
                            <h3 className="text-2xl font-bold text-white">{machine.name}</h3>
                        </div>
                        <div className="p-6">
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div className="flex items-center">
                                    <DollarSign className="w-5 h-5 text-gray-500 mr-2" />
                                    <span className="text-gray-700">Cost: {machine.cost}</span>
                                </div>
                                <div className="flex items-center">
                                    <TrendingUp className="w-5 h-5 text-gray-500 mr-2" />
                                    <span className="text-gray-700">Rate: {machine.rate}</span>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={() => handleBuyMachine(machine)}
                            className="bg-green-500 p-4 hover:bg-green-700 disabled:bg-red-500 text-white font-bold rounded w-full"
                            disabled={state.score < machine.cost}
                        >
                            Buy New Machine
                        </button>
                    </div>
                ))
            ) : (
                <p className="text-gray-700">All machines have been purchased.</p>
            )}
        </>
    );
}

export default BuyMachineList;
