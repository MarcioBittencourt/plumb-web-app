import Style from "./goal.module.scss";
import { Col, Row } from "react-bootstrap";
import Smart from './smart/index';
import { Search, XCircleFill } from "react-bootstrap-icons";
import { useEffect, useRef, useState } from "react";
import { convertToObject } from "typescript";

type Props = {
    uuid?: string | null;
};

type GoalType = {
    description: string;
    smartGoals: string;
    dateInit: Date;
    dateEnd: Date;
    status: "Rascunho" | "Revisado" | "Concluido";
    manager: string;
    employees: [];
};

const Goal = ({ uuid }: Props) => {
    const loggedUser = JSON.parse(localStorage.getItem("loggedUser") || '{}');

    const refTitle = useRef<HTMLInputElement>(null);
    const refGoalDetail = useRef<HTMLTextAreaElement>(null);
    const refGoalMeasuredDetail = useRef<HTMLTextAreaElement>(null);
    const refStartDate = useRef<HTMLInputElement>(null);
    const refEndDate = useRef<HTMLInputElement>(null);
    const refTaskName = useRef<HTMLInputElement>(null);
    const refTaskStatus = useRef<HTMLInputElement>(null);

    const refSearchEmployee = useRef<HTMLInputElement>(null);

    const [colaborators, setColaborators] = useState<any[]>([]);
    const [filteredColaborators, setFilteredColaborators] = useState<any[]>([]);
    const [addedColaborators, setAddedColaborators] = useState<any[]>([]);
    const [tasks, setTasks] = useState<any[]>([]);
    const [tasksData, setTasksData] = useState<any[]>([]);
    const [goal, setGoal] = useState<any>({});

    useEffect(() => {
        (async () => {
            const url = `http://localhost:5000/employees/company/${loggedUser.companyId}`;
            const company = await fetch(url, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });
            const companyData: any[] = await company.json();
            setColaborators([...companyData]);
            setFilteredColaborators([...companyData]);
            if (uuid != undefined || uuid != null) {
                const goal = await fetch(`http://localhost:5000/goals/${uuid}`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                });
                const goalData: any = await goal.json();
                setGoal(goalData);
                setAddedColaborators([...goalData.employees]);
                setTasksData([...goalData.tasks]);
                goalData.tasks.forEach((task: any, index: number) => newLine(task.name, index));
            }
        })();
    }, []);

    const saveGoal = async () => {
        const goalsResponse = await fetch(`http://localhost:5000/goals`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: refTitle.current?.value,
                goalDetail: refGoalDetail.current?.value,
                goalMeasuredDetail: refGoalMeasuredDetail.current?.value,
                startDate: refStartDate.current?.value,
                endDate: refEndDate.current?.value,
                employees: addedColaborators,
            })
        });
        const goal = await goalsResponse.json();
        tasksData.map(async (task) => {
            await fetch(`http://localhost:5000/tasks`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: task.name,
                    status: "Pendente",
                    goal: goal.id,
                })
            })
        });
        alert("O objetivo foi salvo com sucesso !!!");
    }

    const addEmployeeGoal = (colaborator: any, index: number) => {
        setAddedColaborators([...addedColaborators, colaborator]);
        setFilteredColaborators([...colaborators]);
    }

    useEffect(() => {
        (() => {
            addedColaborators.map((colaborator) => {
                filteredColaborators.filter((element, index) => {
                    if (colaborator.id === element.id) {
                        filteredColaborators.splice(index, 1);
                        setFilteredColaborators([...filteredColaborators]);
                    }
                });
            });
        })()
    }, [addedColaborators])

    const removeCollaborator = (colaborator: any, index: number) => {
        const removed = addedColaborators.splice(index, 1);
        setAddedColaborators([...addedColaborators]);
        setFilteredColaborators([...filteredColaborators, removed[0]]);
    }

    const handleTaskDataOnChange = (index: number) => {
        const changedTask = {
            name: refTaskName.current?.value,
            status: refTaskStatus.current?.value,
        }
        const newValues = [...tasksData];
        newValues.splice(index, 1, changedTask);
        setTasksData([...newValues]);
    }

    const newLine = (name?: string, row: number = tasks.length) => {
        setTasks((prevState) => [...prevState, (
            <Row className={Style.entityTableRecord}>
                <Col lg={1} className={Style.tableColumnRecordID}>
                    <p># {row + 1}</p>
                </Col>
                <Col lg={11}>
                    <input className={`${Style.taskTitle} form-control`}
                        ref={refTaskName}
                        value={name}
                        placeholder="Nome da tarefa"
                        onChange={() => handleTaskDataOnChange(row)} />
                    <XCircleFill className={`${Style.entityTableRecordAction} ${Style.removeEntityButton}`} size={25} />
                </Col>
            </Row>
        )])
    }

    return (
        <Row className={Style.pageSection}>
            <Col lg={12}>
                <Row className={Style.pageSectionHeader}>
                    <Col className={Style.goalTitle} lg={9}>
                        <input
                            type="text"
                            placeholder="Insira o titulo do objetivo aqui!"
                            value={goal.title}
                            ref={refTitle} />
                    </Col>
                    <Col lg={2}>
                        <Smart smarts={["Especifico", "Mensuravel", "Alcançavel", "Realista", "Temporal"]} />
                    </Col>
                </Row>
                <Row className={Style.goalSectionContent}>
                    <Col lg={7}>
                        <Row className={Style.rowDetailsGoal}>
                            <textarea
                                className="form-control"
                                placeholder="Descreva de forma detalhada seu objetivo..."
                                value={goal.goalDetail}
                                id="description"
                                ref={refGoalDetail}>
                            </textarea>
                        </Row>
                        <Row className={Style.rowDetailsGoal}>
                            <textarea
                                className="form-control"
                                placeholder="Descreva como o objetivo será mensurado..."
                                value={goal.goalMeasuredDetail}
                                id="description"
                                ref={refGoalMeasuredDetail}>
                            </textarea>
                        </Row>
                        <Row className={Style.entityTable}>
                            <h6>Tarefas</h6>
                            <Row className={Style.entityTableHeader}>
                                <Col lg={1}>
                                    <p>ID</p>
                                </Col>
                                <Col lg={11}>
                                    <p>Nome</p>
                                    <div className={Style.entityTableActions}>
                                        <button
                                            className={Style.btnPrimary}
                                            type="button"
                                            onClick={() => newLine()}>
                                            Adicionar
                                        </button>
                                    </div>
                                </Col>
                            </Row>
                            {tasks}
                        </Row>
                    </Col>
                    <Col lg={5}>
                        <Row className={Style.goalDates} >
                            <Col lg={6}>
                                <label>Inicio:</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    value={goal.startDate}
                                    ref={refStartDate} />
                            </Col>
                            <Col lg={6}>
                                <label>Fim:</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    value={goal.endDate}
                                    ref={refEndDate} />
                            </Col>
                        </Row>
                        <Row className={Style.rowSearchEmployee}>
                            <Col lg={12}>
                                <div className={Style.searchEmployee} >
                                    <input
                                        id="employeesInput"
                                        list="employees"
                                        ref={refSearchEmployee}
                                        className="form-control"
                                        type="text"
                                        placeholder="Pesquisar"
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
                                <div className={Style.searchCollaboratorsList}>
                                    <ul id="employees" className={Style.listSearchEmployee}>
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
                                <label className={Style.addedColaborators}>Colaboradores envolvidos</label>
                                <div className={Style.searchCollaboratorsList}>
                                    <ul id="employees" className={Style.listSearchEmployee}>
                                        {addedColaborators.map((colaborator, index) => {
                                            return (
                                                <li value={colaborator.name} className={Style.searchOption}>
                                                    <div className={Style.avatar}></div>
                                                    <p>{colaborator.name}</p>
                                                    <XCircleFill onClick={() => { removeCollaborator(colaborator, index) }} className={Style.iconXCircle} size={25} />
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Col>
            <button
                className={Style.btnPrimary}
                type="button"
                
                onClick={saveGoal}>
                Salvar
            </button>
        </Row>
    );
}
export default Goal;
