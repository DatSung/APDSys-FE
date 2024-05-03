import PageAccessTemplate from "../../components/dashboard/page-access/PageAccessTemplate.tsx";
import {FaUserTie} from "react-icons/fa";

const ManagerPage = () => {
    return (
        <div className='pageTemplate2'>
            <PageAccessTemplate color='#0B96BC' icon={FaUserTie} role='Manager' children={null}></PageAccessTemplate>
        </div>
    )
}

export default ManagerPage
