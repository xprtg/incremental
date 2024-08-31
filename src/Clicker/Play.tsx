import React from 'react';
import { useScore } from './ScoreContext';
import UpgradeItem from './UpgradeItem';
import ScoreDisplay from './ScoreDisplay';
import Clicker from './Clicker';

const Play: React.FC = () => {
    const { state, dispatch } = useScore();

    const handleIncrement = () => {
        dispatch({ type: 'INCREMENT_SCORE', payload: 1 });
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-6xl mx-auto">
                <div style={{ textAlign: 'center' }}>
                    <ScoreDisplay />
                    <Clicker onClick={handleIncrement} label="Click Me!" />
                    <div className='mt-5'>
                        <div className='bg-white text-black p-6 rounded-lg shadow-lg mb-4 flex flex-col items-center'>
                            <h2 >Upgrades</h2>
                        </div>
                        {state.upgrades.items.map((item) => (
                            <UpgradeItem key={item.id} item={item} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Play;
