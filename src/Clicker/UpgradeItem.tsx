import React from 'react'
import { useScore } from './ScoreContext'
import useProgressTimer from './useProgressTimer'
import { Factory, ArrowUp, Coins, TrendingUp } from 'lucide-react'
import TimerBar from './TimerBar'
import { itemProgressions } from './db/itemProgressions'

interface UpgradeItemProps {
    item: {
        id: string
        limit: number
        level: number
    }
}

const UpgradeItem: React.FC<UpgradeItemProps> = ({ item }) => {
    const { state, dispatch } = useScore()
    const progression = itemProgressions[item.id][item.level]
    const isMaxLevel = item.level >= item.limit
    const canAfford = state.score >= progression.cost

    const progress = useProgressTimer({
        rate: progression.rate,
        gain: progression.gain,
        level: item.level,
    })

    const buyItemUpgrade = () => {
        dispatch({ type: 'BUY_ITEM_UPGRADE', payload: { id: item.id } })
    }

    return (
        <div className="bg-white text-gray-800 p-6 rounded-lg shadow-md flex flex-col items-center border border-gray-200">
            <div className="w-full flex items-center justify-between mb-4">
                <Factory className="text-2xl text-blue-500" />
                <p className="text-lg font-semibold text-blue-600">
                    {item.id.charAt(0).toUpperCase() + item.id.slice(1)}
                </p>
            </div>
            <TimerBar progress={progress} />
            <div className="w-full mt-4 space-y-2">
                <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Level:</span>
                    <span className="font-medium">
                        {item.level} / {item.limit}
                    </span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="flex items-center text-yellow-600">
                        <Coins className="w-4 h-4 mr-1" />
                        Cost:
                    </span>
                    <span className="font-bold">{progression.cost}</span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="flex items-center text-green-600">
                        <TrendingUp className="w-4 h-4 mr-1" />
                        Profit:
                    </span>
                    <span className="font-bold">{progression.gain}</span>
                </div>
            </div>
            <button
                onClick={buyItemUpgrade}
                disabled={isMaxLevel || !canAfford}
                className={`mt-6 py-2 px-4 rounded-lg font-semibold text-white w-full
          ${isMaxLevel
                        ? 'bg-gray-400 cursor-not-allowed'
                        : canAfford
                            ? 'bg-blue-500 hover:bg-blue-600 transition-colors duration-200'
                            : 'bg-blue-300 cursor-not-allowed'
                    }`}
            >
                {isMaxLevel ? (
                    'Max Level'
                ) : (
                    <>
                        <ArrowUp className="w-4 h-4 inline-block mr-1" />
                        Upgrade {item.id}
                    </>
                )}
            </button>
        </div>
    )
}

export default UpgradeItem