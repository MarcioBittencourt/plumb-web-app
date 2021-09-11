import Style from "./goal.module.scss";
import { Col, Container, Row } from "react-bootstrap";
import Smart from './smart/index';

type Props = {};

type Goal = {
    description: string;
    smartGoals: string;
    dateInit: Date;
    dateEnd: Date;
    status: "Rascunho" | "Revisado" | "Concluido";
    manager: string;
    employees: [];
};

const Goal = (props: Props) => {
    return (
        <Row className={Style.goalSection}>
            <Col>
                <Row className={Style.goalSectionHeader}>
                    <Col className={Style.goalTitle} lg={9}>
                        <input type="text" placeholder="Insira o titulo do objetivo aqui!" />
                    </Col>
                    <Col lg={3}>
                        <Smart smarts={["Especifico", "Mensuravel", "Alcançavel", "Realista", "Temporal"]} />
                    </Col>
                </Row>
                <Row className={Style.goalSectionContent} lg={8}>
                    <Col lg={8}>
                        <textarea placeholder="Descreve de forma detalhada seu objetivo..." id="description"></textarea>
                    </Col>
                </Row>
                <Row className={Style.goalSectionContent} lg={8}>
                    <Col lg={8}>
                        <textarea placeholder="Descreve de forma detalhada seu objetivo..." id="description"></textarea>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}
export default Goal;
