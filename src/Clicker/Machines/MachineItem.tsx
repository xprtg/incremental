import React, { useCallback, useMemo } from 'react';
import { Machine, useScore } from '../ScoreContext';
import { Users, DollarSign, TrendingUp, UserPlus, UserMinus } from 'lucide-react';
import { machineProgression } from '../db/machines';

interface Props {
    machine: Machine;
}

export default function MachineItem({ machine }: Props) {
    const { state, dispatch } = useScore();
    const availableWorker = state.workers.list.find(worker => worker.assignedMachines === "");

    // Determine if the machine can accept another worker based on its progression
    const canAssignWorker = useMemo(() => {
        const progressionLimit = machineProgression[machine.id][machine.workers.length];
        return availableWorker && progressionLimit;
    }, [machine.id, machine.workers.length, availableWorker]);

    const handleAssignWorker = useCallback(() => {
        if (canAssignWorker) {
            dispatch({ type: 'ASSIGN_WORKER', payload: { machineId: machine.id } });
        }
    }, [canAssignWorker, machine.id, dispatch]);

    const handleUnassignWorker = useCallback(() => {
        if (machine.workers.length > 0) {
            dispatch({ type: 'UNASSIGN_WORKER', payload: { machineId: machine.id } });
        }
    }, [machine.workers.length, machine.id, dispatch]);

    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4">
                <h3 className="text-2xl font-bold text-white">{machine.name}</h3>
            </div>
            <div className="p-6">
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <InfoItem icon={<DollarSign />} label={`Gain: ${machine.gain}`} />
                    <InfoItem icon={<TrendingUp />} label={`Rate: ${machine.rate}`} />
                </div>
                <div className="mb-4">
                    <div className="flex items-center mb-2">
                        <Users className="w-5 h-5 text-gray-500 mr-2" />
                        <span className="text-gray-700 font-semibold">Workers Assigned: {machine.workers.length}</span>
                    </div>
                </div>
                <div className="flex space-x-2">
                    <ActionButton
                        onClick={handleAssignWorker}
                        disabled={!canAssignWorker}
                        className="bg-green-500 hover:bg-green-600"
                        icon={<UserPlus />}
                        label="Assign Worker"
                    />
                    <ActionButton
                        onClick={handleUnassignWorker}
                        disabled={machine.workers.length === 0}
                        className="bg-red-500 hover:bg-red-600"
                        icon={<UserMinus />}
                        label="Unassign Worker"
                    />
                </div>
            </div>
        </div>
    );
}

interface InfoItemProps {
    icon: React.ReactNode;
    label: string;
}

const InfoItem: React.FC<InfoItemProps> = ({ icon, label }) => (
    <div className="flex items-center">
        {icon}
        <span className="text-gray-700 ml-2">{label}</span>
    </div>
);

interface ActionButtonProps {
    onClick: () => void;
    disabled: boolean;
    className: string;
    icon: React.ReactNode;
    label: string;
}

const ActionButton: React.FC<ActionButtonProps> = ({ onClick, disabled, className, icon, label }) => (
    <button
        onClick={onClick}
        className={`flex-1 flex items-center justify-center px-4 py-2 rounded-md text-white font-semibold transition-colors duration-300 ${disabled
            ? 'bg-gray-400 cursor-not-allowed'
            : className
            }`}
        disabled={disabled}
        aria-label={label}
    >
        {icon}
        <span className="ml-2">{label}</span>
    </button>
);
