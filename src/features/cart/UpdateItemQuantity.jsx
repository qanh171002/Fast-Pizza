import { useDispatch } from 'react-redux'
import Button from '../../ui/Button'
import { decreaseItemQuantity, increseItemQuantity } from './cartSlice'

function UpdateItemQuantity({ pizzaId, currentQuantity }) {
    const dispatch = useDispatch()
    return (
        <div className="flex items-center gap-2 md:gap-x-3">
            <Button
                type="round"
                onClick={() => dispatch(decreaseItemQuantity(pizzaId))}
            >
                -
            </Button>
            <span className="text-sm font-medium">{currentQuantity}</span>
            <Button
                type="round"
                onClick={() => dispatch(increseItemQuantity(pizzaId))}
            >
                +
            </Button>
        </div>
    )
}

export default UpdateItemQuantity
