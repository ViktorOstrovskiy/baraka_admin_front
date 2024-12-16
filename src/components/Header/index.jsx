import './header.scss';
import logo from '../../assets/images/logoFirst.svg'
import logoSecond from '../../assets/images/logoSecond.svg'


const Header = () => {




    return (
        <div className='Header'>


            <div className='Header-content'>
                <img className='Header-content-logo-first' src={logo} alt=""/>
                <img src={logoSecond} alt=""/>
            </div>

        </div>
    )


}


export default Header;