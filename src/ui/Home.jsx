import { useSelector } from 'react-redux'
import CreateUser from '../features/user/CreateUser'
import Button from './Button'

function Home() {
    const username = useSelector((state) => state.user.username)
    return (
        <div className="my-10 px-4 text-center sm:my-16">
            <h1 className="mb-8 text-xl font-semibold md:text-3xl">
                The best pizza.
                <br />
                <span className="text-yellow-500">
                    Straight out of the oven, straight to you.
                </span>
            </h1>
            {username === '' ? (
                <CreateUser />
            ) : (
                <div className="flex flex-col items-center justify-center">
                    <img
                        className="mb-16 h-40 w-40"
                        src="https://cdn-icons-png.flaticon.com/512/17845/17845842.png"
                        alt="pizza"
                    />
                    <Button to="/menu" type="primary">
                        Go to our Menu, {username}!
                    </Button>
                </div>
            )}
        </div>
    )
}

export default Home
