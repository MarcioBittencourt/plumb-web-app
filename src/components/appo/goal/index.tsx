import Style from "./goal.module.scss";
import { Col, Row } from "react-bootstrap";
import Smart from './smart/index';
import { Search } from "react-bootstrap-icons";

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
                    <Col className={Style.goalTitle} lg={8}>
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
                    <Col lg={2}>
                        <label>Inicio:</label>
                        <input type="date" className={Style.goalDate} />
                        <select defaultValue="none" className={`${Style.sectorInput} form-control`}>
                            <option value="none" disabled> - Selecione o setor - </option>
                            <option value="1"> - Selecione - </option>
                            <option value="2"> - Selecione - </option>
                            <option value="3"> - Selecione - </option>
                            <option value="4"> - Selecione - </option>
                        </select>
                        <div className={Style.searchEmployee}>
                            <input
                                list="employees"
                                className="form-control"
                                type="text"
                                placeholder="Search"
                                aria-label="Search" />
                            <Search className={Style.icon}/>
                            <datalist id="employees">
                                <option value="Frodo Bolseiro" />
                                <option value="Gandalf Cinzento" />
                                <option value="Aragorn" />
                                <option value="Legolas" />
                                <option value="Marcus Bittencourt" />
                                <option value="Marcio Bittencourt" />
                            </datalist>
                        </div>
                    </Col>
                    <Col lg={2}>
                        <label>Fim:</label>
                        <input type="date" />
                    </Col>
                </Row>
                <Row className={Style.goalSectionContent} lg={8}>
                    <Col lg={8}>
                        <textarea placeholder="Descreve de como o objetivo será mensurado..." id="description"></textarea>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}
export default Goal;
