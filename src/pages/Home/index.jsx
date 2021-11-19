import Header from '../../components/Header';
import styles from './Home.module.css';

function Home() {
    return (
        <div>
            <Header />
            <div className={styles['home']}>
                <h1>Don't let your dreams be dreams!</h1>
                <h2>Buy everything!</h2>
            </div>
        </div>
    );
}

export default Home;