import { Link } from 'react-router-dom';
import Logo from '../../assets/images/logo.png';

const Header =()=>{
    return(
        <>
       <div className="header">
            <div className="top-strip">
            <div className="container">

            </div>
        </div>
        <div className="header">
            <div className="container">
                <div className="row">
                    <div className="logowrapper d-flex align-items-center col-sm-2">
                    <Link to={'/'}><img src={Logo} alt='logo'/></Link>
                    </div>
                </div>
            </div>
        </div>
       </div>
        </>
    )
}

export default Header;