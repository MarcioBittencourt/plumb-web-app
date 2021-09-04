import { Col, Container, Row } from 'react-bootstrap';
import AssessementRecord from './record';
import Style from './dashboard.module.scss'
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import Survey from '../survey';
import Data360 from '../../../assets/360.json'
import { useEffect, useMemo, useRef, useState } from 'react';
import Request from './request'
import DataEmployees from '../../../assets/employees.json'
import DataAssessement from '../../../assets/assessements.json'

/*  Pendente - Não foi iniciado
    Rascunho - esta em andamento 
    Enviado - foi concluido mas o prazo final ainda não foi alcançado
    Concluido - o prazo final já chegou
 */

type Props = {

};

const avaliacoes = DataAssessement.assessements;
const employees = DataEmployees.employees;

const loggedUser = JSON.parse(localStorage.getItem("loggedUser") || '{}');

const Dashboard = (props: Props) => {
    let { path, url } = useRouteMatch();
    const selectFilter = useRef<HTMLSelectElement>(null);
    const [selectedEmployees, setSelectedEmployees] = useState<any[]>([]);
    const [colaborators, setColaborators] = useState<any[]>(employees);
    const [assessements, setAssessements] = useState<any[]>([]);

    const sort = () => {
        const index = selectFilter.current?.options.selectedIndex;
        switch (index) {
            case 1:
                avaliacoes.sort((avaliacaoA, avaliacaoB) => {
                    return new Date(avaliacaoA.prazoResolucao) < new Date(avaliacaoB.prazoResolucao) ? 1 : new Date(avaliacaoA.prazoResolucao) > new Date(avaliacaoB.prazoResolucao) ? -1 : 0;
                });
                console.log(avaliacoes)
                break;
            case 2:
                avaliacoes.sort((avaliacaoA, avaliacaoB) => {
                    return new Date(avaliacaoA.dataSolicitacao) < new Date(avaliacaoB.dataSolicitacao) ? 1 : new Date(avaliacaoA.dataSolicitacao) > new Date(avaliacaoB.dataSolicitacao) ? -1 : 0;
                });
                console.log(avaliacoes)
                break;
        }
    }

    const selectColaborator = (event: any, employee: any) => {
        //if(!event.target.checked) return;
        // selecionar e deselecionar pessoas adiconando ou removendo do array de colaboradores selecionados
        const hasEmployee = selectedEmployees.indexOf(employee);
        const selected = [...selectedEmployees];
        hasEmployee === -1
            ? selected.push(employee)
            : selected.splice(hasEmployee, 1)

        setSelectedEmployees([...selected]);
    }

    const memoRequestedColaborators = useMemo(() => {
        return assessements
        .filter((assessement: any) => assessement.avaliado.uuid === loggedUser.uuid)
        .map((assessement: any) => assessement.avaliador.uuid)
        .reduce((unique: any, item: any) => unique.includes(item)
            ? unique
            : [...unique, item], []);
    }, [assessements])

    useEffect(() => {
        localStorage.setItem('assessements', JSON.stringify(assessements));
    }, [assessements]);

    const enviarSolicitacao = () => {
        //salvar no local storage uma nova avaliação para cada colaborador existente no array de colaboradores selecionados
        console.log(selectedEmployees);
        const newAssessements = selectedEmployees.map(employee => {
            return {
                uuid: new Date().getTime(), //substituir por uuid
                avaliado: JSON.parse(localStorage.getItem("loggedUser") || '{}'),
                resolucao: "2021-02-02T13:00:00",
                avaliador: employee,
                dataSolicitacao: new Date(),
                prazoResolucao: "2021-10-05T18:02:30",
                status: "Pendente"
            }
        });
        setAssessements([...assessements, ...newAssessements]);
        setSelectedEmployees([]);
    }

    return (
        <>
            <Switch>
                <Route exact path={path}>
                    <Container className={Style.pageSection}>
                        <Row className={Style.pageSectionHeader}>
                            <Col><h3>Solicitar avaliação (X/5)</h3></Col>
                            <Col><button onClick={enviarSolicitacao}>Solicitar</button></Col>
                        </Row>
                        <Row className={Style.assessementTableHeader}>
                            <Col><p>Colaborador</p></Col>
                            <Col><p>Contato</p></Col>
                            <Col><p>Setor</p></Col>
                            <Col><p>Selecionar</p></Col>
                        </Row>
                        {colaborators
                            .filter(employee => !memoRequestedColaborators.includes(employee.uuid))
                            .map((employee) => {
                                return (
                                    <Request
                                        key={employee.uuid}
                                        id={employee.id}
                                        avatar={employee.avatar}
                                        nome={employee.nome}
                                        email={employee.email}
                                        setor={employee.setor}
                                        handleOnChange={event => selectColaborator(event, employee)}
                                    />
                                )
                            })
                        }
                    </Container>
                    <Container className={Style.pageSection}>
                        <Row className={Style.pageSectionHeader}>
                            <Col><h3>Minhas avaliações</h3></Col>
                            {/*<Col>
                                <select onChange={filter} defaultValue="none" ref={selectFilter}>
                                <option value="none" disabled> - Filtrar - </option>
                                <option value="Resolução">Resolução</option>
                                <option value="Solicitação">Solicitação</option>
                                </select>
                            </Col>*/}
                        </Row>
                        <Row className={Style.assessementTableHeader}>
                            <Col>Avaliado</Col>
                            <Col>Situação</Col>
                            <Col>Solicitação</Col>
                            <Col>Resolução</Col>
                            <Col> Visualizar</Col>
                        </Row>
                        {avaliacoes.filter(avaliacao => avaliacao.avaliado.uuid === loggedUser.uuid && avaliacao.status === "Concluído")
                            .map((avaliacao) => {
                            return (
                                <AssessementRecord
                                    id={avaliacao.id}
                                    avaliado={avaliacao.avaliador.name}
                                    dataSolicitacao={avaliacao.dataSolicitacao}
                                    prazoResolucao={avaliacao.prazoResolucao}
                                    dataConclucao={avaliacao.dataConclusao}
                                    status={avaliacao.status}
                                />)
                        })}
                    </Container>
                    <Container className={Style.pageSection}>
                        <Row className={Style.pageSectionHeader}>
                            <Col><h3>Avaliaçoes pendentes</h3></Col>
                        </Row>
                        <Row className={Style.assessementTableHeader}>
                            <Col >Avaliado</Col>
                            <Col >Solicitação</Col>
                            <Col>Resolução</Col>
                            <Col >Status</Col>
                            <Col > Visualizar</Col>
                        </Row>
                        {avaliacoes.filter(avaliacao => ["Pendente", "Rascunho"].includes(avaliacao.status)).map((avaliacao) => {
                            return (
                                <AssessementRecord
                                    id={avaliacao.id}
                                    avaliado={avaliacao.avaliador.name}
                                    dataSolicitacao={avaliacao.dataSolicitacao}
                                    prazoResolucao={avaliacao.prazoResolucao}
                                    dataConclucao={avaliacao.dataConclusao}
                                    status={avaliacao.status}
                                />)
                        })}
                    </Container>
                    <Container className={Style.pageSection}>
                        <Row className={Style.pageSectionHeader}>
                            <Col><h3>Avaliações realizadas</h3></Col>
                        </Row>
                        <Row className={Style.assessementTableHeader}>
                            <Col >Avaliado</Col>
                            <Col>Solicitação</Col>
                            <Col>Resolução</Col>
                            <Col >Status</Col>
                            <Col >Visualizar</Col>
                        </Row>
                        {avaliacoes.filter(avaliacao => ["Concluído"].includes(avaliacao.status )).map((avaliacao) => {
                            return (
                                <AssessementRecord
                                    id={avaliacao.id}
                                    avaliado={avaliacao.avaliador.name}
                                    dataSolicitacao={avaliacao.dataSolicitacao}
                                    prazoResolucao={avaliacao.prazoResolucao}
                                    dataConclucao={avaliacao.dataConclusao}
                                    status={avaliacao.status}
                                />
                            )
                        })}
                    </Container>
                </Route>
                <Route path={`${path}/:id`} render={(props) => (
                    <Survey askings={Data360.askings} code={props.match.params.id} />
                )}></Route>
            </Switch>
        </>
    );
}
export default Dashboard;