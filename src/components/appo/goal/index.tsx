import Style from "./goal.module.scss";
import { Col, Row } from "react-bootstrap";
import Smart from './smart/index';
import { Search, XCircleFill } from "react-bootstrap-icons";
import { useEffect, useRef, useState } from "react";

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
    const loggedUser = JSON.parse(localStorage.getItem("loggedUser") || '{}');

    const refTitle = useRef<HTMLInputElement>(null);
    const refGoalDetail = useRef<HTMLTextAreaElement>(null);
    const refGoalMeasuredDetail = useRef<HTMLTextAreaElement>(null);
    const refStartDate = useRef<HTMLInputElement>(null);
    const refEndDate = useRef<HTMLInputElement>(null);
    const refSector = useRef<HTMLSelectElement>(null);
    const refEmployee = useRef<HTMLInputElement>(null);

    const refSearchEmployee = useRef<HTMLInputElement>(null);

    const [colaborators, setColaborators] = useState<any[]>([]);
    const [filteredColaborators, setFilteredColaborators] = useState<any[]>([]);
    const [addedColaborators, setAddedColaborators] = useState<any[]>([]);

    useEffect(() => {
        (async () => {
            const url = `http://localhost:5000/employees/company/${loggedUser.companyId}`;
            const response = await fetch(url, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });
            const result: any[] = await response.json();
            setColaborators([...result]);
            setFilteredColaborators([...result]);
        })();
    }, []);

    const saveGoal = async () => {
        await fetch(`http://localhost:5000/goals`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: refTitle.current?.value,
                goalDetail: refGoalDetail.current?.value,
                goalMeasuredDetail: refGoalMeasuredDetail.current?.value,
                startDate: refStartDate.current?.value,
                endDate: refEndDate.current?.value,
                sector: refSector.current?.value,
                employees: addedColaborators
            })
        });
    }

    const addEmployeeGoal = (colaborator: any, index: number) => {
        setAddedColaborators([...addedColaborators, colaborator]);
        setFilteredColaborators([...colaborators]);
        console.log("teste", colaborators);
    }

    const removeCollaborator = (colaborator: any, index: number) => {
        const removed = addedColaborators.splice(index, 1);
        setAddedColaborators([...addedColaborators]);
    }

    return (
        <Row className={Style.pageSection}>
            <Col>
                <Row className={Style.pageSectionHeader}>
                    <Col className={Style.goalTitle} lg={9}>
                        <input
                            type="text"
                            placeholder="Insira o titulo do objetivo aqui!"
                            ref={refTitle} />
                    </Col>
                    <Col lg={2}>
                        <Smart smarts={["Especifico", "Mensuravel", "Alcançavel", "Realista", "Temporal"]} />
                    </Col>
                </Row>
                <Row className={Style.goalSectionContent} lg={8}>
                    <Col lg={8}>
                        <textarea
                            placeholder="Descreva de forma detalhada seu objetivo..."
                            id="description"
                            ref={refGoalDetail}>
                        </textarea>
                    </Col>
                    <Col lg={2}>
                        <label>Inicio:</label>
                        <input type="date" className={Style.goalDate} ref={refStartDate} />
                        <select ref={refSector} defaultValue="none" className={`${Style.sectorInput} form-control`}>
                            <option value="none" disabled> - Selecione o setor - </option>
                            <option value="1"> - Selecione - </option>
                            <option value="2"> - Selecione - </option>
                            <option value="3"> - Selecione - </option>
                            <option value="4"> - Selecione - </option>
                        </select>
                    </Col>
                    <Col lg={2}>
                        <label>Fim:</label>
                        <input type="date" ref={refEndDate} />
                    </Col>
                </Row>
                <Row className={Style.goalSectionContent} lg={8}>
                    <Col lg={8}>
                        <textarea
                            placeholder="Descreva como o objetivo será mensurado..."
                            id="description"
                            ref={refGoalMeasuredDetail}>
                        </textarea>
                    </Col>
                    <Col>
                        <div className={Style.searchEmployee}>
                            <input
                                id="employeesInput"
                                list="employees"
                                ref={refSearchEmployee}
                                className="form-control"
                                type="text"
                                placeholder="Search"
                                aria-label="Search"
                                onKeyUp={() => {
                                    const value = refSearchEmployee.current?.value;
                                    setFilteredColaborators(
                                        colaborators.filter(
                                            colaborator => colaborator.name.toLowerCase().includes(value?.toLowerCase())
                                        ));
                                }} />
                            <Search className={Style.iconSearch} />
                        </div>
                        <div className="scroll">
                            <ul id="employees" className={Style.listSearch}>
                                {filteredColaborators.filter(colaborator => !addedColaborators.includes(colaborator)).map((colaborator, index) => {
                                    return (
                                        <li
                                            value={colaborator.name}
                                            className={Style.searchOption}
                                            onClick={() => addEmployeeGoal(colaborator, index)}>
                                            <div className={Style.avatar}></div>
                                            <p>{colaborator.name}</p>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col lg={8} className={Style.addedColaborators}>
                        <label>Colaboradores envolvidos</label>
                        <ul id="employees" className={Style.listSearch}>
                            {addedColaborators.map((colaborator, index) => {
                                return (
                                    <li value={colaborator.name} className={Style.searchOption}>
                                        <div className={Style.avatar}></div>
                                        <p>{colaborator.name}</p>
                                        <XCircleFill onClick={() => {removeCollaborator(colaborator, index)}} className={Style.iconXCircle} size={25} />
                                    </li>
                                )
                            })}
                        </ul>
                    </Col>
                </Row>
            </Col>
            <button type="button" onClick={saveGoal}>Salvar</button>
        </Row>
    );
}
export default Goal;
