import React from 'react'
import Image from 'next/image'

export default function page() {
  return (
    <div className='p-5 '>
        <h1 className='text-2xl mb-3 font-bold text-center '>What to do in a fire?</h1>
        <p className='mx-8 indent-6 ml-0.5 font-sans'>If there is a wildfire near you, do not panic, call 911 and report the fire. Keep monitoring local broadcasts, and keep a lookout for instructions.</p>
        <div className='flex flex-col justify-between content-center my-8'>
            <div className='flex flex-row bg-slate-100 rounded'>
                <div className='m-3'>
                    <div className='flex flex-row mb-1 aling-center items-center'>
                        <h1 className='font-bold mr-6 text-6xl'>1</h1>
                        <h2 className='font-bold ml-1 text-lg'>Prepare to evacuate</h2>
                    </div>
                    <li className='ml-1 font-sans'>If there is a wildfire nearby, be ready to evacuate.</li>
                    <li className='ml-1 font-sans'>Prepare your pets to be transported.</li>
                    <li className='ml-1 font-sans'>Wear protective cloths: sturdy shoes, cotton or wool long pants, long-sleeved shirt, and gloves.</li>
                    <li className='ml-1 font-sans'>Have a handkerchief to protect your face.</li>
                    <li className='ml-1 font-sans'>Park the car facing the direction of escape.</li>
                    <li className='ml-1 font-sans'>Have everything important ready in the car, ready to go.</li>
                    <li className='ml-1 font-sans'>Inform an out-of-town contact where and when you leave.</li>
                    <li className='ml-1 font-sans'>Stay informed. Keep a look out and be attentive with the local news. Evacuate immediately at moment noticed by the official authorities.</li>
                </div>
                <img src="/protect-yourself.png" className='flex w-1/4 content-center object-cover my-auto mx-5 rounded-md shodow-sm'/>
            </div>
            <div className='flex flex-row'>
                <div className='m-3'> 
                    <div className='flex flex-row mb-1 items-center'>
                        <h1 className='font-bold mr-6 text-6xl'>2</h1>
                        <h2 className='font-bold ml-1 text-lg'>Prepare your home</h2>
                    </div>
                    <p className='font-sans'>IF AND ONLY IF time permits, prepare your home. </p>
                    <li className='ml-1 font-sans'>Shut off natural gas/propane.</li>
                    <li className='ml-1 font-sans'>Close all windows and doors.-	Close all windows and doors.</li>
                    <li className='ml-1 font-sans'>Close shutters, blind or heavy non-combustible window coverings. Remove all flammable drapes and curtains from the windows.</li>
                    <li className='ml-1 font-sans'>Open fireplace dampers, bur close fireplace screens.</li>
                    <li className='ml-1 font-sans'>Close all vents.</li>
                    <li className='ml-1 font-sans'>Remove all sources of combustibles such as wood piles, lawn furniture, or tarps as far as possible from the house. Connect garden hoses, fill pools, hot tubs, garbage cans, tubs or other containers with water.</li>
                </div>    
                <img src="/wildfires-infographic.png" className='flex w-1/4 content-center object-cover my-auto mx-5 rounded-md shodow-sm'/>
            </div>
        </div>
        <h1 className='text-2xl my-8 font-bold text-center'>What to do after a fire?</h1>
        <div className='flex flex-col justify-between content-center my-8'>
            <p className='mx-8 mb-8 indent-6 font-sans'>Once authorities authorize entry to your home, it is important to be extremely careful. It may still be very dangerous, as the fire may have weakened important structural supports.</p>
            <div className='flex flex-row bg-slate-100 rounded justify-between'>
                <div className='m-3'>
                    <div className='flex flex-row mb-1 aling-center items-center'>
                        <h1 className='font-bold mr-6 text-6xl'>1</h1>
                        <h2 className='font-bold ml-1 text-lg'>Be careful</h2>
                    </div>    
                    <li className='ml-1 font-sans'>Use protective clothing.</li>
                    <li className='ml-1 font-sans'>Wet debris to minimize breathing dust.</li>
                    <li className='ml-1 font-sans'>If a fire starts to break, ask your neighbors for help, and use the water storage before to fight the fire.</li>
                    <li className='ml-1 font-sans'>Check for embers in the rooftop, and in the attic.</li>
                    <li className='ml-1 font-sans'>For several hours after the fire maintain vigilant for smoke and sparks around the house.</li>
                    <li className='ml-1 font-sans'>Discard any food that have been exposed to heat, smoke or soot.</li>
                    <li className='ml-1 font-sans'>Never use water that might be contaminated, to clean anything or prepared food.</li>
                </div>
                <img src="/ash-clean-up.png" className='flex w-1/4 content-center object-cover my-auto mx-5 rounded-md shodow-sm'/>
            </div>
        </div>
        <h1 className='text-2xl my-8 font-bold text-center'>How to prevent a fire</h1>
        <div className='flex flex-col justify-between content-center my-8'>
            <p className='mb-1 indent-6 ml-0.5 font-sans'>The best way to fight a wildfire is to prevent it. Keeping with good practices around fire and being prepared for everything is the best way to protect your home and family form wildfires.</p>
            <div className='flex flex-row'>
                <div>
                    <div className='bg-slate-100 rounded p-3'>
                        <div className='flex flex-row mb-1 aling-center items-center'>
                            <h1 className='font-bold mr-6 text-6xl'>1</h1>
                            <h2 className='font-bold ml-1 text-lg'>Smoking</h2>
                        </div>    
                        <li className='ml-1 font-sans'>Use ashtrays.</li>
                        <li className='ml-1 font-sans'>Do not drop lit cigarettes in the ground, bush, or leaves.</li>
                        <li className='ml-1 font-sans'>Grind out your cigarette in dirt.</li>
                    </div>
                    <div className='flex flex-row mb-1 mt-8 aling-center items-center'>
                        <h1 className='font-bold mr-6 text-6xl'>2</h1>
                        <h2 className='font-bold ml-1 text-lg'>Barbecues / Campfires</h2>
                    </div>
                    <div className='flex flex-row justify-between'>
                        <div>
                            <li className='ml-1 font-sans'>Clear a 10-foot area around a barbecue.</li>
                            <li className='ml-1 font-sans'>When disposing of briquettes and ash outside, drown the with lots of water and make sure they are out.</li>
                            <li className='ml-1 font-sans'>When building a campfire, make sure it is not dry or windy or where is not allowed to.</li>
                            <li className='ml-1 font-sans'>Clear 10-foot diameter area around the spot.</li>
                            <li className='ml-1 font-sans'>Have your gear at least 15 feet away from the campfire.</li>
                            <li className='ml-1 font-sans'>When making a fire pit, dig a hole about a foot deep, circle the pit with rocks.</li>
                            <li className='ml-1 font-sans'>NEVER leave the fire unattended.</li>
                            <li className='ml-1 font-sans'>When ready to extinguish the campfire, pour lots of water on the fire until hissing stops. Drown all embers, make sure that they are wet and cold to the touch. If there is no water use ample of dirt or sand.</li>
                        </div>
                        <img src="/PreventFire.jpg" className='flex w-1/4 content-center object-cover my-auto mx-5 rounded-md shodow-sm'/>
                    </div>
                </div>
            </div>
        </div>
    </div >
    
  )
}