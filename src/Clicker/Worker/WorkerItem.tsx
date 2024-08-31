import React from 'react';
import { Worker } from '../ScoreContext';

interface Props {
    item: Worker;
}

const WorkerItem: React.FC<Props> = ({ item }) => {
    return (
        <div className="bg-gray-800 text-white p-4 rounded-lg shadow-lg mb-4">
            <h3 className="text-xl font-semibold mb-2">{item.id}</h3>
        </div>
    );
};

export default WorkerItem;
