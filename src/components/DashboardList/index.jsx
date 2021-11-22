import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

function DashboardList({dashboardListItem, amount}) {
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