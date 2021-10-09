import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Style from './navigation.module.scss'
import Profile from '../../assets/person-circle.svg'
import Collapse from 'react-bootstrap/NavbarCollapse'
import Button from 'react-bootstrap/NavbarToggle'

const Navigation = () => {
    const loggedUser: any = JSON.parse(localStorage.getItem('loggedUser') || '{}');
    return (
        <Navbar className={Style.navbar} expand="md" bg="dark" variant="dark">
            <Navbar.Brand href="/home">Plumb-Web</Navbar.Brand>
            <Button type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02">
                <span className="navbar-toggler-icon"></span>
            </Button>
            <div className={Style.menu}>
                <Collapse id="navbarTogglerDemo02">
                    <Nav>
                        <Nav.Link href="/app/home">Home</Nav.Link>
                        <Nav.Link href="/app/360">360°</Nav.Link>
                        <Nav.Link href="/app/disc">DISC</Nav.Link>
                        <Nav.Link href="/app/appo">APPO</Nav.Link>
                        <Nav.Link href="/app/account">Account</Nav.Link>
                    </Nav>
                    <img className={Style.avatar} alt="user avatar" src={loggedUser.avatar ? loggedUser.avatar : Profile} />
                </Collapse>
            </div>
        </Navbar>
    );
}
export default Navigation;