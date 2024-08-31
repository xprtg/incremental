import React from 'react';
import { useScore } from './ScoreContext';
import { itemProgressions } from './itemProgressions';
import TimerBar from './TimerBar';
import useProgressTimer from './useProgressTimer';
import { Factory } from 'lucide-react';

interface UpgradeItemProps {
    item: {
        id: string;
        limit: number;
        level: number;
    };
}

const UpgradeItem: React.FC<UpgradeItemProps> = ({ item }) => {
    const { state, dispatch } = useScore();
    const progression = itemProgressions[item.id][item.level];
    const isMaxLevel = item.level >= item.limit;
    const canAfford = state.score >= progression.cost;

    const progress = useProgressTimer({
        rate: progression.rate,
        gain: progression.gain,
        level: item.level,
    });

    const buyItemUpgrade = () => {
        dispatch({ type: 'BUY_ITEM_UPGRADE', payload: { id: item.id } });
    };

    return (
        <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg mb-4 flex flex-col items-center">
            <div className="w-full flex items-center justify-between mb-4">
                <Factory className="text-2xl" />
                <p className="text-lg font-semibold">
                    {item.id.charAt(0).toUpperCase() + item.id.slice(1)}
                </p>
            </div>
            <TimerBar progress={progress} />
            <div className="w-full mt-4">
                <p className="text-sm">
                    Level: {item.level} / {item.limit}
                </p>
                <p className="text-lg font-bold mt-2">
                    Cost: {progression.cost}
                </p>
                <p className="text-lg font-bold mt-2">
                    Profit: {progression.gain}
                </p>
            </div>
            <button
                onClick={buyItemUpgrade}
                disabled={isMaxLevel || !canAfford}
                className={`mt-4 py-2 px-4 rounded-lg font-semibold text-white 
                    ${isMaxLevel ? 'bg-gray-500' : 'bg-blue-600 hover:bg-blue-700'} 
                    ${!canAfford ? 'opacity-50 cursor-not-allowed' : 'opacity-100'}`}
            >
                Buy {item.id} Upgrade
            </button>
        </div>
    );
};

export default UpgradeItem;
