import React, { createContext, useReducer, useContext, ReactNode } from 'react';
import { itemProgressions } from './itemProgressions';

export interface Worker {
    id: string;
    cost: number;
    assignedMachines: string; // List of machine IDs this worker is assigned to
}

export interface Machine {
    id: string;
    cost: number;
    workers: string[]; // Number of workers assigned to this machine
    rate: number; // Rate at which this machine generates score
}

interface WorkerProgression extends ItemProgression { }

interface MachineProgression extends ItemProgression { }

interface ItemUpgrade {
    id: string;
    limit: number; // max amount of purchasables on this item
    level: number;
}

export interface ItemProgression {
    cost: number; // item cost
    rate: number; // score increment update interval in milliseconds
    gain: number; // item gain
}

type Upgrades = {
    items: ItemUpgrade[];
};

type Workers = {
    list: Worker[];
};

type Machines = {
    list: Machine[];
};

type State = {
    score: number;
    upgrades: Upgrades;
    workers: Workers;
    machines: Machines;
};

type Action =
    | { type: 'INCREMENT_SCORE'; payload: number }
    | { type: 'BUY_ITEM_UPGRADE'; payload: { id: string } }
    | { type: 'AUTO_INCREMENT'; payload: { id: string; gain: number } }
    | { type: 'BUY_WORKER'; payload: { cost: number } }
    | { type: 'ASSIGN_WORKER'; payload: { machineId: string } }
    | { type: 'UNASSIGN_WORKER'; payload: { machineId: string } }
    | { type: 'BUY_MACHINE'; payload: { id: string; cost: number; rate: number } };

const initialItemState = Object.keys(itemProgressions).map(item => ({
    id: item, limit: 9, level: 0
}));

const initialState: State = {
    score: 100,
    upgrades: {
        items: initialItemState
    },
    workers: {
        list: []
    },
    machines: {
        list: []
    },
};

const scoreReducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'INCREMENT_SCORE':
            return { ...state, score: state.score + action.payload };

        case 'BUY_ITEM_UPGRADE': {
            const itemIndex = state.upgrades.items.findIndex((item) => item.id === action.payload.id);
            if (itemIndex === -1) return state;

            const item = state.upgrades.items[itemIndex];
            if (item.level >= item.limit) return state;

            const progression = itemProgressions[item.id][item.level];
            if (state.score < progression.cost) return state;

            const newItems = [...state.upgrades.items];
            newItems[itemIndex] = { ...item, level: item.level + 1 };

            return {
                ...state,
                score: state.score - progression.cost,
                upgrades: {
                    ...state.upgrades,
                    items: newItems,
                },
            };
        }

        case 'AUTO_INCREMENT': {
            return { ...state, score: state.score + action.payload.gain };
        }

        case 'BUY_WORKER': {
            if (state.score < action.payload.cost) return state;

            const newId = "worker-" + String(state.workers.list.length);

            const newWorkers = [
                ...state.workers.list,
                { id: newId, cost: action.payload.cost, assignedMachines: "" }
            ];

            return {
                ...state,
                score: state.score - action.payload.cost,
                workers: { list: newWorkers }
            };
        }

        case 'ASSIGN_WORKER': {
            const availableWorker = state.workers.list.find(worker => worker.assignedMachines === "");
            if (!availableWorker) return state;

            const workerIndex = state.workers.list.findIndex(worker => worker.id === availableWorker.id);
            const machineIndex = state.machines.list.findIndex(machine => machine.id === action.payload.machineId);

            if (workerIndex === -1 || machineIndex === -1) return state;

            const updatedMachines = [...state.machines.list];
            const machine = updatedMachines[machineIndex];
            if (!machine.workers.includes(availableWorker.id)) {
                machine.workers.push(availableWorker.id);
            }

            const updatedWorkers = state.workers.list.map(worker =>
                worker.id === availableWorker.id
                    ? { ...worker, assignedMachines: action.payload.machineId }
                    : worker
            );

            return {
                ...state,
                workers: { list: updatedWorkers },
                machines: { list: updatedMachines }
            };
        }

        case 'UNASSIGN_WORKER': {
            const machineIndex = state.machines.list.findIndex(machine => machine.id === action.payload.machineId);

            if (machineIndex === -1) return state;

            const machine = state.machines.list[machineIndex];
            const workerIdToRemove = machine.workers[0];

            if (!workerIdToRemove) return state;

            const updatedMachines = [...state.machines.list];
            const updatedMachine = { ...updatedMachines[machineIndex] };
            updatedMachine.workers = updatedMachine.workers.filter(workerId => workerId !== workerIdToRemove);
            updatedMachines[machineIndex] = updatedMachine;

            const updatedWorkers = [...state.workers.list];
            const workerIndex = updatedWorkers.findIndex(worker => worker.id === workerIdToRemove);

            if (workerIndex !== -1) {
                const worker = updatedWorkers[workerIndex];
                updatedWorkers[workerIndex] = { ...worker, assignedMachines: "" };
            } else {
                const newWorker = {
                    id: workerIdToRemove,
                    cost: 20,
                    assignedMachines: ""
                };
                updatedWorkers.push(newWorker);
            }

            return {
                ...state,
                workers: { list: updatedWorkers },
                machines: { list: updatedMachines }
            };
        }

        case 'BUY_MACHINE': {
            if (state.score < action.payload.cost) return state;

            const newMachines = [
                ...state.machines.list,
                { id: action.payload.id, cost: action.payload.cost, workers: [], rate: action.payload.rate }
            ];

            return {
                ...state,
                score: state.score - action.payload.cost,
                machines: { list: newMachines }
            };
        }

        default:
            return state;
    }
};

interface ScoreProviderProps {
    children: ReactNode;
}

const ScoreContext = createContext<{ state: State; dispatch: React.Dispatch<Action> } | undefined>(
    undefined
);

export const ScoreProvider: React.FC<ScoreProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(scoreReducer, initialState);

    return (
        <ScoreContext.Provider value={{ state, dispatch }}>
            {children}
        </ScoreContext.Provider>
    );
};

export const useScore = () => {
    const context = useContext(ScoreContext);
    if (!context) {
        throw new Error('useScore should be used inside ScoreProvider');
    }
    return context;
};
