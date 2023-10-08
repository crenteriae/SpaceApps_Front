import styles from './page.module.scss';
import Earth from './components/earth/';
export default function Home() {
    return (
        <main className={styles.main}>
            <Earth />
        </main>
    );
}
