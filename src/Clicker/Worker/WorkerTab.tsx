import { useScore } from '../ScoreContext';

const WorkerTab = () => {
    const { state, dispatch } = useScore();

    const handleBuyWorker = () => {
        dispatch({
            type: 'BUY_WORKER',
            payload: { cost: 10 }
        });
    };

    const workerCount = state.workers.list.length;
    const workerGroups = Math.floor(workerCount / 5);
    const remainingWorkers = workerCount % 5;

    return (
        <div className="bg-white text-gray-900 p-6 rounded-xl shadow-md">
            <h2 className="text-3xl font-extrabold mb-6 text-center text-blue-600">Worker Command Center</h2>

            <div className="flex justify-between items-center mb-8">
                <div className="text-center">
                    <span className="text-4xl font-bold text-gray-800">{workerCount}</span>
                    <span className="ml-2 text-xl text-gray-600">Workers</span>
                </div>
                <button
                    onClick={handleBuyWorker}
                    className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                    Hire Worker
                </button>
            </div>

            <div className="grid grid-cols-5 gap-4 mb-8">
                {[...Array(workerGroups)].map((_, index) => (
                    <div key={index} className="bg-blue-600 p-3 rounded-lg flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <span className="ml-2 font-bold text-white">x5</span>
                    </div>
                ))}
                {remainingWorkers > 0 && (
                    <div className="bg-blue-600 p-3 rounded-lg flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <span className="ml-2 font-bold text-white">x{remainingWorkers}</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default WorkerTab;
