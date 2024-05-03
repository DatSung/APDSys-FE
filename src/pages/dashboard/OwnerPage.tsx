import PageAccessTemplate from "../../components/dashboard/page-access/PageAccessTemplate.tsx";
import {FaUserCog} from "react-icons/fa";

const OwnerPage = () => {
    return (
        <div className='pageTemplate2'>
            <PageAccessTemplate color='#3b3549' icon={FaUserCog} role='Owner' children={null}></PageAccessTemplate>
        </div>
    )
}

export default OwnerPage
