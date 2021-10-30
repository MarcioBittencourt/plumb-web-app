import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import DISCData from '../assets/disc.json';
import Survey from '../components/disc/survey';
import DashboardDisc from '../components/disc/dashboard';
import Style from './disc.page.module.scss';

const DISCPage = () => {
    return (
        <Container className={Style.page}>
            <Row>
                <Col>
                    <h3 className={Style.pageTitle} >DISC</h3>
                </Col>
            </Row>
            {/* <Row className={Style.content}>
                <Col lg={6} className={Style.webform}>
                    <Survey askings={DISCData.askings} />
                </Col>
            </Row>  */}
            <DashboardDisc />
        </Container>
    )
}
export default DISCPage;