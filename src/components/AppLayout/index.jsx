import './AppLayout.scss';
import Header from "../Header/index.jsx";

const AppLayout = ({children}) => {
    return (
        <div className='AppLayout'>
            <Header/>
            <div className='AppLayout-content'>
                {children}
            </div>
        </div>
    )
}



export default AppLayout