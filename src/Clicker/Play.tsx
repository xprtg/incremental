import React from 'react';
import { useScore } from './ScoreContext';
import ScoreDisplay from './ScoreDisplay';
import Clicker from './Clicker';

const Play: React.FC = () => {
    const { state, dispatch } = useScore();

    const handleIncrement = () => {
        dispatch({ type: 'INCREMENT_SCORE', payload: 1 });
    };

    return (
        <div className="max-w-6xl mx-auto mb-4">
            <div style={{ textAlign: 'center' }}>
                <ScoreDisplay />
                <Clicker onClick={handleIncrement} label="Click Me!" />
            </div>
        </div>
    );
};

export default Play;
