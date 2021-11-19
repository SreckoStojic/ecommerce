import styles from './Dashboard.module.css';
import Header from "../../components/Header";
import DashboardList from '../../components/DashboardList';

const columns = ['ID', 'Amount', 'Created At', 'Details'];

function Dashboard() {
    let data = JSON.parse(localStorage.getItem('data'));

    function calculateAmount(products) {
        let total = 0;
        products.forEach(product => {
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
                    data.map(dli => <DashboardList dashboardListItem={dli} products={dli.products} amount={calculateAmount(dli.products)} key={dli.id} />)
                }
                </tbody>
            </table>
        </div>
    );
}

export default Dashboard;