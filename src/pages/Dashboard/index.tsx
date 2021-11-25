import styles from './Dashboard.module.css';
import Header from "../../components/Header";
import DashboardList from '../../components/DashboardList';
import { useTranslation } from 'react-i18next';
import { IProduct } from '../../components/Product';
import { IDashboardListItem } from '../../components/DashboardList';
import { ReactElement } from 'react';

function Dashboard() : ReactElement {
    const { t } = useTranslation();
    const columns = ['ID', t('amount'), t('createdAt'), t('details')];
    let data : IDashboardListItem[] = JSON.parse(localStorage.getItem('data') || '{}');
    
    function calculateAmount(products : IProduct[]) : number {
        let total = 0;
        products.forEach((product : IProduct) => {
            total += product.inCart;
        });
        return total;
    }
    return (
        <div>
            <Header />
            <table className={styles['table']}>
                <thead>
                    <tr>
                        {columns.map(column => <th key={column}>{column} </th>)}
                    </tr>
                </thead>
                <tbody>
                {
                    data.map(dli => <DashboardList dashboardListItem={dli} amount={calculateAmount(dli.products)} key={dli.id} />)
                }
                </tbody>
            </table>
        </div>
    );
}

export default Dashboard;