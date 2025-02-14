import './header.scss';
import logoSecond from '../../assets/images/logoSecond.svg'
import { useLocation, useNavigate } from "react-router-dom";

const Header = () => {
    const {pathname} = useLocation();
    const navigate = useNavigate();

    const handleClickTab = (link) => {
        navigate(link)
    }

    return (
        <div className='Header'>
            <div className='Header-content'>
                <img className='Header-content-logo-first' src={logoSecond} alt=""/>
                <div className='Header-tabs'>
                    <span onClick={() => handleClickTab('/global-search')} className={`${pathname === '/global-search' && 'active'}`}>Global search</span>
                    <span onClick={() => handleClickTab('/')} className={`${pathname === '/' && 'active'}`}>Profession</span>
                    <span onClick={() => handleClickTab('/work-type')} className={`${pathname === '/work-type' && 'active'}`}>Work type</span>
                    <span onClick={() => handleClickTab('/payment-type')} className={`${pathname === '/payment-type' && 'active'}`}>Payment type</span>
                    <span onClick={() => handleClickTab('/categories')} className={`${pathname === '/categories' && 'active'}`}>Categories</span>
                </div>
            </div>
        </div>
    )
}

export default Header;
