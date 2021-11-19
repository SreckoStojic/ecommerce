import { useParams } from 'react-router';
import Header from '../../components/Header';
import styles from './DashboardItem.module.css';

const columns = ['ID', 'Name', 'Weight', 'Color', 'Amount', 'Price'];
function DashboardItem() {
    let { purchaseId } = useParams();
    let dashboardItem = getDashboardItemById(purchaseId);

    function getDashboardItemById(id) {
        let products = [];
        let data = JSON.parse(localStorage.getItem('data'));
        data.forEach(dataItem => {
            if(String(dataItem.id) === String(id)) {
                products = dataItem.products;
            }
        });
        return products;
    }

    function calculateTotalPrice() {
        let total = 0;
        dashboardItem.forEach(item => {
            total += item.price * item.inCart;
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
                        dashboardItem.map(product => 
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td>{product.name}</td>
                                <td>{product.weight} g</td>
                                <td>{product.color}</td>
                                <td>{product.inCart}</td>
                                <td>{product.price} RSD</td>
                            </tr>
                        )
                    }
                    <tr className={styles['total-price-tr']}>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td><span>Total Price:</span></td> 
                        <td><span>{calculateTotalPrice()} RSD</span></td>
                    </tr>
                </tbody>
            </table>
        </div>
       
    );
};

export default DashboardItem;