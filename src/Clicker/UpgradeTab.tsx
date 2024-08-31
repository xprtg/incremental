import { useScore } from "./ScoreContext"
import UpgradeItem from "./UpgradeItem"

const UpgradeTab = () => {
    const { state } = useScore()
    return (
        <div className='mt-5'>
            <div className='grid grid-cols-5 gap-4'>
                {state.upgrades.items.map((item) => (
                    <UpgradeItem key={item.id} item={item} />
                ))}
            </div>
        </div>
    )
}

export default UpgradeTab;