import React from 'react';

interface TimerBarProps {
    progress: number;
}

const TimerBar: React.FC<TimerBarProps> = ({ progress }) => {
    return (
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div
                className="bg-blue-600 h-2.5 rounded-full"
                style={{ width: `${progress}%`, transition: 'width 0.1s linear' }}
            ></div>
        </div>
    );
};

export default TimerBar;
