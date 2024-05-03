import PageAccessTemplate from "../../components/dashboard/page-access/PageAccessTemplate.tsx";
import {FaUserShield} from "react-icons/fa";

const AdminPage = () => {
    return (
        <div className='pageTemplate2'>
            <PageAccessTemplate color='#9333EA' icon={FaUserShield} role='Admin' children={null}></PageAccessTemplate>
        </div>
    )
}

export default AdminPage
