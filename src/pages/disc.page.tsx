import { Col, Container, Row } from 'react-bootstrap';
import { Link, useRouteMatch } from 'react-router-dom';
import DISCData from '../assets/disc.json';
import Survey from '../components/disc/survey';
import DashboardDisc from '../components/disc/dashboard';
import Style from './disc.page.module.scss';
import { ChevronCompactLeft } from 'react-bootstrap-icons';

const DISCPage = () => {
    return (
        <Container className={Style.page}>
            <Row>
                <Col className={Style.pageHeader}>
                    <h3 className={Style.pageTitle} >DISC</h3>
                    <Link className={Style.btnPrimary} to={`/app/disc`}>
                        <ChevronCompactLeft className={Style.backIcon} />
                        Voltar
                    </Link>
                </Col>
            </Row>
            <DashboardDisc />
        </Container>
    )
}
export default DISCPage;