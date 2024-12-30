import LinkButton from '../../ui/LinkButton'

function EmptyCart() {
    return (
        <div className="px-4 py-3">
            <LinkButton to="/menu">&larr; Back to menu</LinkButton>
            <div className="mt-7 flex flex-col items-center justify-center">
                <img
                    className="h-20 w-20"
                    src="https://cdn-icons-png.flaticon.com/512/17569/17569003.png"
                ></img>
                <p className="mt-7 text-center font-semibold">
                    Your cart is still empty. Start adding some pizzas.
                </p>
            </div>
        </div>
    )
}

export default EmptyCart
