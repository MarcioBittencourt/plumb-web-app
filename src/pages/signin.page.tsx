import { Col, Container, Row } from 'react-bootstrap';
import Login from '../components/account/login/login';
import Style from './signin.page.module.scss';
import discLogoImage from '../assets/img/disc_logo_small.png';
import thasLogoImage from '../assets/img/360_logo.png';
import appoLogoImage from '../assets/img/appo_logo.png';

type Props = {}

const SigninPage = (props: Props) => {
    return (
        <div className={Style.pageLogin}>
            <div className={Style.authenticationSide}>
                <Login />
                <div className={Style.functionalities}>
                    <img src={discLogoImage} alt="" className={Style.logoImages} />
                    <img src={thasLogoImage} alt="" className={Style.logoImages} />
                    <img src={appoLogoImage} alt="" className={Style.logoImages} />
                </div>
            </div>
            <div className={Style.wallpaperSide}>
                <div className={Style.layer} />
            </div>
        </div>
    );
}
export default SigninPage