import Style from './a360.page.module.scss'
import Dashboard from '../components/a360/dashboard/index'
import { Container, Row } from 'react-bootstrap';

const Assessement360Page = () => {
    return (
        <Container className={Style.page}>
            <Row>
                <h3 className={Style.pageTitle}> Avaliação 360°</h3>
            </Row>
            <Row>
                <Dashboard />
            </Row>
        </Container>
    );
}
export default Assessement360Page;