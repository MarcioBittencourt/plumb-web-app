import { Col, Container, Row } from "react-bootstrap";
import Account from "../components/account";
import Style from "./account.page.module.scss"

type Props = {}

const AccountPage = (props: Props) => {
    return (
        <Container className={Style.page}>
            <Row>
                <Col>
                    <h3 className={Style.pageTitle}>Cadastro</h3>
                </Col>
            </Row>
            <Row>
                <Account typeRegistration={"complete"} />
            </Row>
        </Container>
    );
}
export default AccountPage;