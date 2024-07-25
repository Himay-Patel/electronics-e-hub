import React from 'react'

const marquee = () => {
    return (

        // animate-marquee class imported from 'tailwind.config.ts' file
        <div className="w-full h-16 relative flex overflow-x-hidden bg-e_hub_gray justify-center items-center">
            <div className="py-0 animate-marquee whitespace-nowrap text-white">
                <span className="mx-4 text-md">✦ Unbeatable Deals Inside!</span>
                <span className="mx-4 text-md">✷ Last Chance to Save Big!</span>
                <span className="mx-4 text-md">✦ Unbeatable Deals Inside!</span>
                <span className="mx-4 text-md">✷ Last Chance to Save Big!</span>
                <span className="mx-4 text-md">✦ Unbeatable Deals Inside!</span>
                <span className="mx-4 text-md">✷ Last Chance to Save Big!</span>
                <span className="mx-4 text-md">✦ Unbeatable Deals Inside!</span>
                <span className="mx-4 text-md">✷ Last Chance to Save Big!</span>
            </div>
        </div>
    )
}

export default marquee