import { useTranslation } from 'react-i18next';
import Header from '../../components/Header';
import styles from './Home.module.css';
import { ReactElement } from 'react';

function Home() : ReactElement {
    const { t } = useTranslation();
    return (
        <div>
            <Header />
            <div className={styles['home']}>
                <h1>{t('homeH1')}</h1>
                <h2>{t('homeH2')}</h2>
            </div>
        </div>
    );
}

export default Home;