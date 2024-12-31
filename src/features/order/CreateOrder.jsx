import { useState } from 'react'
import { Form, redirect, useActionData, useNavigation } from 'react-router-dom'
import { createOrder } from '../../services/apiRestaurant'
import Button from '../../ui/Button'
import EmptyCart from '../cart/EmptyCart'
import { useSelector } from 'react-redux'
import { clearCart, getCart, getTotalCartPrice } from '../cart/cartSlice'
import store from '../../store'
import { formatCurrency } from '../../utils/helpers'

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
    /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
        str
    )

function CreateOrder() {
    const [withPriority, setWithPriority] = useState(false)
    const username = useSelector((state) => state.user.username)

    const navigation = useNavigation()
    const isSubmitting = navigation.state === 'submitting'

    const formErrors = useActionData()

    const cart = useSelector(getCart)
    const totalCartPrice = useSelector(getTotalCartPrice)
    const prioriryPrice = withPriority ? 0.2 * totalCartPrice : 0
    const totalPrice = totalCartPrice + prioriryPrice

    if (!cart.length) return <EmptyCart />

    return (
        <div className="px-4 py-6">
            <h2 className="mb-8 text-xl font-semibold">
                Ready to order? Let&apos;s go!
            </h2>

            <Form method="POST">
                <div className="sm:items mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
                    <label className="sm:basis-36">First Name</label>
                    <input
                        className="input grow"
                        type="text"
                        name="customer"
                        defaultValue={username}
                        required
                    />
                </div>

                <div className="sm:items mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
                    <label className="sm:mb-auto sm:mt-2 sm:basis-36">
                        Phone number
                    </label>
                    <div className="grow">
                        <input
                            className="input w-full"
                            type="tel"
                            name="phone"
                            required
                        />
                        {formErrors?.phone && (
                            <p className="mt-2 rounded-md bg-red-100 p-1.5 text-xs text-red-700">
                                {formErrors.phone}
                            </p>
                        )}
                    </div>
                </div>

                <div className="sm:items mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
                    <label className="sm:basis-36">Address</label>
                    <div className="grow">
                        <input
                            className="input w-full"
                            type="text"
                            name="address"
                            required
                        />
                    </div>
                </div>

                <div className="mb-12 flex items-center gap-5">
                    <input
                        className="h-6 w-6 accent-yellow-400 outline-none focus:ring-1 focus:ring-yellow-400 focus:ring-offset-2"
                        type="checkbox"
                        name="priority"
                        id="priority"
                        value={withPriority}
                        onChange={(e) => setWithPriority(e.target.checked)}
                    />
                    <label htmlFor="priority" className="font-medium">
                        Want to yo give your order priority?
                    </label>
                </div>

                <div>
                    <input
                        type="hidden"
                        name="cart"
                        value={JSON.stringify(cart)}
                    />
                    <Button disabled={isSubmitting} type="primary">
                        {isSubmitting
                            ? 'Placing order....'
                            : `Order now for ${formatCurrency(totalPrice)}`}
                    </Button>
                </div>
            </Form>
        </div>
    )
}

export async function action({ request }) {
    const formData = await request.formData()
    const data = Object.fromEntries(formData)

    const order = {
        ...data,
        cart: JSON.parse(data.cart),
        priority: data.priority === 'true',
    }

    const errors = {}
    if (!isValidPhone(order.phone)) {
        errors.phone =
            'Please give us your correct phone number. We might need to call you to confirm your order.'
    }
    if (Object.keys(errors).length > 0) return errors

    // no error -> create new order
    const newOrder = await createOrder(order)

    // NOT overuse this
    store.dispatch(clearCart())

    return redirect(`/order/${newOrder.id}`)
}

export default CreateOrder
