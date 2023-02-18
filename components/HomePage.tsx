import { BoltIcon, ExclamationTriangleIcon, SunIcon } from '@heroicons/react/24/outline'
import { Bars3CenterLeftIcon } from "@heroicons/react/24/solid"
import { Dispatch, SetStateAction } from 'react'

type HomePageProps = {
    showModal: boolean,
    setShowModal: Dispatch<SetStateAction<boolean>>
}

const HomePage = ({ showModal, setShowModal }: HomePageProps) => {

    return (
        <section className="relative flex flex-col bg-primary flex-1 items-center justify-center min-h-screen py-6 md:-0 px-2 text-white">
            <h1 className="text-5xl font-bold mb-20">ChatGPT</h1>

            <div className="flex flex-col md:flex-row space-x-2 text-center">
                <div>
                    <div className="flex flex-col items-center justify-center mb-5">
                        <SunIcon className="h-8 w-8 " />
                        <h2>Example</h2>
                    </div>

                    <div className="space-y-2">
                        <p className="infoText">"Explain quantum computing in simple terms"</p>
                        <p className="infoText">"Got any creative ideas for a 10 year {"old's"} birthday?"</p>
                        <p className="infoText">"How do I make an HTTP request in Javascript?"</p>
                    </div>
                </div>

                <div className="mt-7 md:mt-0">
                    <div className="flex flex-col items-center justify-center mb-5">
                        <BoltIcon className="h-8 w-8 " />
                        <h2>Capabilities</h2>
                    </div>

                    <div className="space-y-2">
                        <p className="infoText">Remembers what user said earlier in the conversation</p>
                        <p className="infoText">Allows user to provide follow-up corrections</p>
                        <p className="infoText">Trained to decline inappropriate requests</p>
                    </div>
                </div>


                <div className="mt-7 md:mt-0">
                    <div className="flex flex-col items-center justify-center mb-5">
                        <ExclamationTriangleIcon className="h-8 w-8 " />
                        <h2>Limitations</h2>
                    </div>

                    <div className="space-y-2">
                        <p className="infoText">May occasionally generate incorrect information</p>
                        <p className="infoText">May occasionally produce harmul instructions or biased content</p>
                        <p className="infoText">Limited Knowledge of the world and events after 2021</p>
                    </div>
                </div>
            </div>


            {/* float button */}
            <button onClick={() => setShowModal(!showModal)} className={`absolute top-[20px] md:hidden ${showModal ? "left-[150px]" : "left-[20px]"}`}>
                <Bars3CenterLeftIcon className="h-9 w-9 animate-bounce pointer-events-none" />
            </button>
        </section>
    )
}

export default HomePage
    // < ChatGptIcon class="h-7 w-7" />