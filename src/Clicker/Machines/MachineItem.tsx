import React from 'react'
import { Machine, useScore } from '../ScoreContext'
import { Users, DollarSign, TrendingUp, UserPlus, UserMinus } from 'lucide-react'

interface Props {
    machine: Machine
}

export default function MachineItem({ machine }: Props) {
    const { state, dispatch } = useScore()
    const availableWorker = state.workers.list.find(worker => worker.assignedMachines === "")

    const handleAssignWorker = () => {
        if (availableWorker) {
            dispatch({ type: 'ASSIGN_WORKER', payload: { machineId: machine.id } })
        }
    }

    const handleUnassignWorker = () => {
        if (machine.workers.length > 0) {
            dispatch({ type: 'UNASSIGN_WORKER', payload: { machineId: machine.id } })
        }
    }

    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4">
                <h3 className="text-2xl font-bold text-white">Machine {machine.id}</h3>
            </div>
            <div className="p-6">
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-gray-500 mr-2" />
                        <span className="text-gray-700">Cost: {machine.cost}</span>
                    </div>
                    <div className="flex items-center">
                        <TrendingUp className="w-5 h-5 text-gray-500 mr-2" />
                        <span className="text-gray-700">Rate: {machine.rate}</span>
                    </div>
                </div>
                <div className="mb-4">
                    <div className="flex items-center mb-2">
                        <Users className="w-5 h-5 text-gray-500 mr-2" />
                        <span className="text-gray-700 font-semibold">Workers Assigned: {machine.workers.length}</span>
                    </div>
                </div>
                <div className="flex space-x-2">
                    <button
                        onClick={handleAssignWorker}
                        className={`flex-1 flex items-center justify-center px-4 py-2 rounded-md text-white font-semibold transition-colors duration-300 ${availableWorker
                            ? 'bg-green-500 hover:bg-green-600'
                            : 'bg-gray-400 cursor-not-allowed'
                            }`}
                        disabled={!availableWorker}
                    >
                        <UserPlus className="w-5 h-5 mr-2" />
                        Assign Worker
                    </button>
                    <button
                        onClick={handleUnassignWorker}
                        className={`flex-1 flex items-center justify-center px-4 py-2 rounded-md text-white font-semibold transition-colors duration-300 ${machine.workers.length > 0
                            ? 'bg-red-500 hover:bg-red-600'
                            : 'bg-gray-400 cursor-not-allowed'
                            }`}
                        disabled={machine.workers.length === 0}
                    >
                        <UserMinus className="w-5 h-5 mr-2" />
                        Unassign Worker
                    </button>
                </div>
            </div>
        </div>
    )
}