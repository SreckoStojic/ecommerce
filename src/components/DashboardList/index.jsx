import { Link } from 'react-router-dom';

function DashboardList({dashboardListItem, amount}) {
    return (
        <tr>
            <td>{dashboardListItem.id}</td>
            <td>{amount}</td>
            <td>{dashboardListItem.createdAt}</td>
            <td><Link to={`/dashboard/purchases/${dashboardListItem.id}`}>View</Link></td>
        </tr>
    );
};

export default DashboardList;