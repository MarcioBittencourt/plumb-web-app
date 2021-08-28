import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Style from './navigation.module.scss'
import Profile from '../../assets/person-circle.svg'
import Collapse from 'react-bootstrap/NavbarCollapse'
import Button from 'react-bootstrap/NavbarToggle'

const Navigation = () => {
    return (
        <Navbar className={Style.navbar} expand="md" bg="light" variant="light">
            <Container className={Style.container}>
                <Navbar.Brand href="/home">Plumb-Web</Navbar.Brand>
                <Button type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02">
                    <span className="navbar-toggler-icon"></span>
                </Button>
                <div className={Style.menu}>
                    <Collapse id="navbarTogglerDemo02">
                        <Nav>
                            <Nav.Link href="/home">Home</Nav.Link>
                            <Nav.Link href="/360">360°</Nav.Link>
                            <Nav.Link href="/disc">DISC</Nav.Link>
                            <Nav.Link href="/appo">APPO</Nav.Link>
                        </Nav>
                        <div className={Style.img}>
                            <img src={Profile} width="22" height="22" />
                        </div>
                    </Collapse>
                </div>
            </Container>
        </Navbar>
    );
}
export default Navigation;