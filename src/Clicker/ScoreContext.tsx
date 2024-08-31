import React, { createContext, useReducer, useContext, ReactNode } from 'react';
import { itemProgressions } from './itemProgressions';

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

type State = {
    score: number;
    upgrades: Upgrades;
};

type Action =
    | { type: 'INCREMENT_SCORE'; payload: number }
    | { type: 'BUY_ITEM_UPGRADE'; payload: { id: string } }
    | { type: 'AUTO_INCREMENT'; payload: { id: string; gain: number } };


const initialItemState = Object.keys(itemProgressions).map(item => {
    return {
        id: item, limit: 9, level: 0
    }
})

const initialState: State = {
    score: 0,
    upgrades: {
        items: initialItemState
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
