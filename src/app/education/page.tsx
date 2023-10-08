import React from 'react'
import Image from 'next/image'

export default function page() {
  return (
    <div className='p-5'>
        <h1 className='text-2xl my-2.5 font-bold'>What to do in a fire</h1>
        <div className='flex justify-between'>
            <div>
                <p className='mb-1 indent-6 ml-0.5'>There is a wildfire near you? Do not panic, call 911 and report the fire. Keep monitoring local broadcast, a keep a lookout </p>
                <p className='mb-1 font-bold ml-1 text-lg'>Prepare to evacuate</p>
                <li className='ml-1'>If there is a wildfire nearby, be ready to evacuate.</li>
                <li className='ml-1'>Prepare your pets to be transported.</li>
                <li className='ml-1'>Wear protective cloths: sturdy shoes, cotton or wool long pants, long-sleeved shirt, and gloves.</li>
                <li className='ml-1'>Have a handkerchief to protect your face.</li>
                <li className='ml-1'>Park the car facing the direction of escape.</li>
                <li className='ml-1'>Have everything important ready in the car, ready to go.</li>
                <li className='ml-1'>Inform an out-of-town contact where and when you leave.</li>
                <li className='ml-1'>Stay informed. Keep a look out and be attentive with the local news. Evacuate immediately at moment noticed by the official authorities.</li>
                <p className='mb-1 font-bold ml-1 text-lg'>Prepare you home</p>
                <p>IF AND ONLY IF time permits, prepare your home. </p>
                <li className='ml-1'>Shut off natural gas/propane.</li>
                <li className='ml-1'>Close all windows and doors.-	Close all windows and doors.</li>
                <li className='ml-1'>Close shutters, blind or heavy non-combustible window coverings. Remove all flammable drapes and curtains from the windows.</li>
                <li className='ml-1'>Open fireplace dampers, bur close fireplace screens.</li>
                <li className='ml-1'>Close all vents.</li>
                <li className='ml-1'>Remove all sources of combustibles such as wood piles, lawn furniture, or tarps as far as possible from the house. Connect garden hoses, fill pools, hot tubs, garbage cans, tubs or other containers with water.</li>
            </div>
            <div>   
                <img src="/protect-yourself.png" className='flex w-80 content-center object-cover mb-4'/>
                <img src="/wildfires-infographic.png" className='flex w-80 content-center object-cover mt-4'/>
            </div>
        </div>
        
        <h1 className='text-2xl my-2.5 font-bold'>What to do after a fire</h1>
        <div className='flex justify-between'>
            <div>
                <p className='mb-1 indent-6 ml-0.5'>Once the authority authorizes to enter home again is important to be extremely careful, there could still be dangers.</p>
                <p className='mb-1 font-bold ml-1 text-lg'>Be cautious</p>
                <li className='ml-1'>Use protective clothing.</li>
                <li className='ml-1'>Wet debris to minimize breathing dust.</li>
                <li className='ml-1'>If a fire starts to break, ask your neighbors for help, and use the water storage before to fight the fire.</li>
                <li className='ml-1'>Check for embers in the rooftop, and in the attic.</li>
                <li className='ml-1'>For several hours after the fire maintain vigilant for smoke and sparks around the house.</li>
                <li className='ml-1'>Discard any food that have been exposed to heat, smoke or soot.</li>
                <li className='ml-1'>Never use water that might be contaminated, to clean anything or prepared food.</li>
            </div>
        </div>
            <img src="/ash-clean-up.png" className='flex w-4/12 content-center object-cover m-auto mt-4'/>
        <h1 className='text-2xl my-2.5 font-bold'>How to prevent a fire</h1>
        <div className='flex justify-between'>
            <div>
                <p className='mb-1 indent-6 ml-0.5'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                <p className='mb-1 indent-6'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div>
        </div>
    </div>
    
  )
}