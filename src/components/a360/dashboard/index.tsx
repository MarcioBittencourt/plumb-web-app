import { Col, Container, Row } from 'react-bootstrap';
import AssessementRecord from './record';
import Style from './dashboard.module.scss'
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import Survey from '../survey';
import Data360 from '../../../assets/360.json'
import { useEffect, useMemo, useState } from 'react';
import Request from './request'

type Props = {}
const Dashboard = (props: Props) => {
    let { path, url } = useRouteMatch();
    const [selectedEmployees, setSelectedEmployees] = useState<any[]>([]);

    const loggedUser = JSON.parse(localStorage.getItem("loggedUser") || '{}');

    const [colaborators, setColaborators] = useState<any[]>([]);
    const [assessements, setAssessements] = useState<any[]>([]);

    const filterSelectColaborator = () => {
        (async () => {
            const response = await fetch(`http://localhost:5000/assessements/byRated/${loggedUser.id}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });
            const ratedAssessements = await response.json();
            setRatedAssessements([...ratedAssessements]);
        })();
        return ratedAssessements
            //.filter((assessement: any) => assessement.rated.id === loggedUser.id)
            .map((assessement: any) => assessement.evaluator.id)
            .reduce((unique: any, item: any) => unique.includes(item)
                ? unique
                : [...unique, item], []);
        //adicionar mais um filtro pelo ciclo/sprint
    }

    useEffect(() => {
        (async () => {
            const url = `http://localhost:5000/employees/company/${loggedUser.companyId}`;
            const response = await fetch(url, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });
            setColaborators(await response.json());
            await filterSelectColaborator();
            await refreshPendingAssessements();
        })();
    }, []);

    const selectColaborator = (event: any, employee: any) => {
        const hasEmployee = selectedEmployees.indexOf(employee);
        const selected = [...selectedEmployees];
        hasEmployee === -1
            ? selected.push(employee)
            : selected.splice(hasEmployee, 1)
        setSelectedEmployees([...selected]);
    }

    const [ratedAssessements, setRatedAssessements] = useState<any[]>([]);

    const memoRequestedColaborators = useMemo(filterSelectColaborator, [assessements]);

    useEffect(() => {
        localStorage.setItem('assessements', JSON.stringify(assessements));
    }, [assessements]);

    const sendRequest = async () => {
        const newAssessements: any[] = await Promise.all(selectedEmployees.map(async employee => {
            const createdAssessementResponse = await fetch(`http://localhost:5000/assessements`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    evaluator: employee.id,
                    rated: loggedUser.id,
                    requestDate: new Date(),
                    status: "Pendente"
                })
            });

            const assessement: any = await createdAssessementResponse.json();

            Data360.askings.map((ask) => {
                ask.utterances.map(async (utterance) => {
                    const createdQuestionResponse = await fetch(`http://localhost:5000/questions`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            assessement: assessement.id,
                            category: ask.category,
                            ask: utterance.title,
                            questionId: utterance.questionId
                        })
                    });
                })
            });

            return {
                uuid: new Date().getTime(), //substituir por uuid
                rated: JSON.parse(localStorage.getItem("loggedUser") || '{}'),
                dataConclusao: "2021-02-02T13:00:00",
                evaluator: employee,
                dataSolicitacao: "2021-10-05T18:02:30",
                prazoResolucao: "2021-10-05T18:02:30",
                status: "Pendente"
            }
        }));
        setAssessements([...assessements, ...newAssessements]);
        setSelectedEmployees([]);
    }

    const refreshPendingAssessements = async () => {
        const response = await fetch(`http://localhost:5000/assessements/byEvaluator/${loggedUser.id}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });
        const respo = await response.json();
        setAssessements([...respo]);
    }

    return (
        <>
            <Switch>
                <Route exact path={path}>
                    <Container className={Style.pageSection}>
                        <Row className={Style.pageSectionHeader}>
                            <Col lg={10} >
                                <h3>Solicitar avaliação (X/5)</h3>
                            </Col>
                            <Col lg={2}>
                                <button 
                                    className={Style.buttonRequest} 
                                    onClick={sendRequest}>
                                        Solicitar
                                </button>
                            </Col>
                        </Row>
                        <Row className={Style.assessementTableHeader}>
                            <Col><p>Colaborador</p></Col>
                            <Col><p>Contato</p></Col>
                            <Col><p>Setor</p></Col>
                            <Col><p>Selecionar</p></Col>
                        </Row>
                        {colaborators
                            .filter(employee => loggedUser.uuid !== employee.uuid)
                            .filter(employee => !memoRequestedColaborators.includes(employee.id))
                            .map((employee) => {
                                return (
                                    <Request
                                        key={employee.uuid}
                                        id={employee.id}
                                        avatar={employee.avatar}
                                        name={employee.name}
                                        email={employee.email}
                                        departament={employee.departament}
                                        handleOnChange={event => selectColaborator(event, employee)}
                                    />
                                )
                            })
                        }
                    </Container>
                    <Container className={Style.pageSection}>
                        <Row className={Style.pageSectionHeader}>
                            <Col><h3>Avaliações sobre mim</h3></Col>
                        </Row>
                        <Row className={Style.assessementTableHeader}>
                            <Col><p>Avaliador</p></Col>
                            <Col><p>Situação</p></Col>
                            <Col><p>Solicitação</p></Col>
                            <Col><p>Resolução</p></Col>
                            <Col><p>Visualizar</p></Col>
                        </Row>
                        {assessements.filter((assessement: any) =>
                            assessement.rated.uuid === loggedUser.uuid && assessement.status === "Concluído")
                            .map((assessement: any) => {
                                return (
                                    <AssessementRecord
                                        id={assessement.id}
                                        name={assessement.evaluator.name} //verificar nome
                                        requestDate={assessement.requestDate}
                                        deadlineDate={assessement.deadlineDate}
                                        concludedDate={assessement.concludedDate}
                                        status={assessement.status}
                                    />)
                            })
                        }
                        <Row className={Style.sectionTable}>
                            <Col hidden={!(assessements.filter((assessement: any) =>
                                assessement.rated.uuid === loggedUser.uuid && assessement.status === "Concluído").length === 0)} className={Style.assessementTableHidden}>
                                <p>Nenhum registro de avaliação existente.</p>
                            </Col>
                        </Row>
                    </Container>
                    <Container className={Style.pageSection}>
                        <Row className={Style.pageSectionHeader}>
                            <Col lg={10}><h3>Avaliaçoes pendentes para mim</h3></Col>
                            <Col lg={2}>
                                <button 
                                    className={Style.buttonRequest}
                                    onClick={refreshPendingAssessements}>
                                        Atualizar
                                </button>
                            </Col>
                        </Row>
                        <Row className={Style.assessementTableHeader}>
                            <Col><p>Avaliado</p></Col>
                            <Col><p>Solicitação</p></Col>
                            <Col><p>Resolução</p></Col>
                            <Col><p>Status</p></Col>
                            <Col><p>Visualizar</p></Col>
                        </Row>
                        {assessements.filter((assessement: any) => ["Pendente", "Rascunho"]
                            .includes(assessement.status) && assessement.evaluator.id === loggedUser.id)
                            .map((assessement: any) => {
                                return (
                                    < AssessementRecord
                                        id={assessement.id}
                                        name={assessement.rated.name}
                                        requestDate={assessement.requestDate}
                                        deadlineDate={assessement.deadlineDate}
                                        concludedDate={assessement.concludedDate}
                                        status={assessement.status}
                                    />
                                )
                            })
                        }
                        <Row className={Style.sectionTable}>
                            <Col hidden={!(assessements.filter((assessement: any) => ["Pendente", "Rascunho"]
                                .includes(assessement.status) && assessement.evaluator.id === loggedUser.id).length === 0)} className={Style.assessementTableHidden}>
                                <p>Nenhum registro de avaliação existente.</p>
                            </Col>
                        </Row>
                    </Container>
                    <Container className={Style.pageSection}>
                        <Row className={Style.pageSectionHeader}>
                            <Col><h3>Avaliações realizadas por mim</h3></Col>
                        </Row>
                        <Row className={Style.assessementTableHeader}>
                            <Col><p>Avaliado</p></Col>
                            <Col><p>Solicitação</p></Col>
                            <Col><p>Resolução</p></Col>
                            <Col><p>Status</p></Col>
                            <Col><p>Visualizar</p></Col>
                        </Row>
                        {assessements.filter((assessement: any) => ["Concluído", "Enviado"]
                            .includes(assessement.status)).map((assessement: any) => {
                                return (
                                    <AssessementRecord
                                        id={assessement.id}
                                        name={assessement.rated.name}
                                        requestDate={assessement.requestDate}
                                        deadlineDate={assessement.deadlineDate}
                                        concludedDate={assessement.concludedDate}
                                        status={assessement.status}
                                    />
                                )
                            })}
                        <Row className={Style.sectionTable}>
                            <Col hidden={!(assessements.filter((assessement: any) => ["Concluído", "Enviado"]
                                .includes(assessement.status)).length === 0)} className={Style.assessementTableHidden}>
                                <p>Nenhum registro de avaliação existente.</p>
                            </Col>
                        </Row>
                    </Container>
                </Route>
                <Route path={`${path}/:id`} render={(props) => (
                    <Survey uuid={props.match.params.id} />
                )}></Route>
            </Switch>
        </>
    );
}
export default Dashboard;