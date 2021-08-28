import { Col, Container, Row } from 'react-bootstrap';
import AssessementRecord from './record';

type Props = {

};

const avaliacoes = [
    { id: 1, avaliado: "Marcio", data: "2021-08-23 18:29:34", status: "Pendente" },
    { id: 1, avaliado: "Marcio", data: "2021-08-23 18:29:34", status: "Pendente" },
    { id: 1, avaliado: "Marcio", data: "2021-08-23 18:29:34", status: "Pendente" },
    { id: 1, avaliado: "Marcio", data: "2021-08-23 18:29:34", status: "Pendente" },
    { id: 1, avaliado: "Marcio", data: "2021-08-23 18:29:34", status: "Pendente" },
    { id: 1, avaliado: "Marcio", data: "2021-08-23 18:29:34", status: "Pendente" },
    { id: 1, avaliado: "Marcio", data: "2021-08-23 18:29:34", status: "Pendente" }
];

const AssessementList = (props: Props) => {
    return (
        <>
            <Container>
                <h3>Minhas avaliaçoes</h3>
                <Row>
                    <Col md="auto">#</Col>
                    <Col>Avaliado</Col>
                    <Col>Data</Col>
                    <Col>Status</Col>
                    <Col>Visualizar</Col>
                </Row>
                {avaliacoes.map((avaliacao) => {
                    return (
                        <AssessementRecord
                            id={avaliacao.id}
                            avaliado={avaliacao.avaliado}
                            data={avaliacao.data}
                            status={avaliacao.status}
                        />)
                })}
            </Container>
            <Container>
                <h3>Avaliaçoes pendentes</h3>
                <Row>
                    <Col md="auto">#</Col>
                    <Col>Avaliado</Col>
                    <Col>Data</Col>
                    <Col>Status</Col>
                    <Col>Visualizar</Col>
                </Row>
                {avaliacoes.map((avaliacao) => {
                    return (
                        <AssessementRecord
                            id={avaliacao.id}
                            avaliado={avaliacao.avaliado}
                            data={avaliacao.data}
                            status={avaliacao.status}
                        />)
                })}
            </Container>
            <Container>
                <h3>Avaliações realizadas</h3>
                <Row>
                    <Col md="auto">#</Col>
                    <Col>Avaliado</Col>
                    <Col>Data</Col>
                    <Col>Status</Col>
                    <Col>Visualizar</Col>
                </Row>
                {avaliacoes.map((avaliacao) => {
                    return (
                        <AssessementRecord
                            id={avaliacao.id}
                            avaliado={avaliacao.avaliado}
                            data={avaliacao.data}
                            status={avaliacao.status}
                        />)
                })}
            </Container>
        </>
    );
}
export default AssessementList;