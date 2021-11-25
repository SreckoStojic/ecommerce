import { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { IProduct } from '../../components/Product';
 
interface PropsTypeDashboardList {
    dashboardListItem: IDashboardListItem;
    amount: number;
}

export interface IDashboardListItem {
    id: string;
    createdAt: Date;
    products: IProduct[];
}

function DashboardList({dashboardListItem, amount} : PropsTypeDashboardList) : ReactElement {
    const { t } = useTranslation();
    return (
        <tr>
            <td>{dashboardListItem.id}</td>
            <td>{amount}</td>
            <td>{dashboardListItem.createdAt}</td>
            <td><Link to={`/dashboard/purchases/${dashboardListItem.id}`}>{t('view')}</Link></td>
        </tr>
    );
};

export default DashboardList;