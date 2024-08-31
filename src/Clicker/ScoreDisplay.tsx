import React, { useEffect, useState } from 'react';
import { useScore } from './ScoreContext';
import { useSpring, animated } from '@react-spring/web';
import { Factory } from 'lucide-react';

const ScoreDisplay: React.FC = () => {
    const { state } = useScore();
    const [displayScore, setDisplayScore] = useState(0);

    const springProps = useSpring({
        number: state.score,
        from: { number: displayScore },
        config: { tension: 200, friction: 20 },
    });

    useEffect(() => {
        setDisplayScore(state.score);
    }, [state.score]);

    return (
        <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg mb-4 flex flex-col items-center">
            <Factory className="text-4xl mb-4" />
            <div className="w-full flex flex-col items-center">
                <animated.h1 className="text-4xl font-bold">
                    {springProps.number.to(n => Math.floor(n))}
                </animated.h1>
                <p className="text-lg mt-2">Current Score</p>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-2.5 mt-4">
                <animated.div
                    className="bg-green-500 h-2.5 rounded-full"
                    style={{
                        width: springProps.number.to(n => `${Math.min(n / 10, 100)}%`) // Update progress bar width
                    }}
                />
            </div>
        </div>
    );
};

export default ScoreDisplay;
