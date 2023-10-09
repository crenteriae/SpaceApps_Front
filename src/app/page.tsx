"use client"
import Earth from './components/earth/';

export default function Home() {
    return (
        <div className='flex h-[90%]'>
            <main className="flex-1 bg-black">
                <Earth />
            </main>
        </div>
    );
}
