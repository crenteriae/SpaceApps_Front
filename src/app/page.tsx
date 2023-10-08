import styles from './page.module.scss';
import Earth from './components/earth/';
import StarfieldAnimation from 'react-starfield-animation';

export default function Home() {
    return (
        <div className='flex h-[90%]'>
            <main className="flex-1 bg-black">
                <Earth />
            </main>
        </div>
    );
}
