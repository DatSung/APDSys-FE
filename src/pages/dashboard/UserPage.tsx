import PageAccessTemplate from "../../components/dashboard/page-access/PageAccessTemplate.tsx";
import {FaUser} from "react-icons/fa";

const UserPage = () => {
    return (
        <div className='pageTemplate2'>
            <PageAccessTemplate color='#FEC223' icon={FaUser} role='User' children={null}></PageAccessTemplate>
        </div>
    )
}

export default UserPage
