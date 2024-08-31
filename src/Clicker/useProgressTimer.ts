import { useEffect, useState } from 'react';
import { useScore } from './ScoreContext';

interface UseProgressTimerProps {
    rate: number;
    gain: number;
    level: number;
}

const useProgressTimer = ({ rate, gain, level }: UseProgressTimerProps) => {
    const { dispatch } = useScore();
    const [progress, setProgress] = useState(0);
    const [incrementReady, setIncrementReady] = useState(false);

    useEffect(() => {
        if (level > 0) {
            const interval = setInterval(() => {
                setProgress((prevProgress) => {
                    const nextProgress = prevProgress + (100 / (rate / 100));

                    if (nextProgress >= 100) {
                        setIncrementReady(true);
                        return 0;
                    }

                    return nextProgress;
                });
            }, 100);

            return () => clearInterval(interval);
        }
    }, [level, rate]);

    useEffect(() => {
        if (incrementReady) {
            dispatch({ type: 'INCREMENT_SCORE', payload: gain });
            setIncrementReady(false);
        }
    }, [incrementReady, gain, dispatch]);

    return progress;
};

export default useProgressTimer;
