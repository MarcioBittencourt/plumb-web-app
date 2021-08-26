import Style from './table.view.module.scss'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

/* usar div ao invez de table
    - tela de listagem da avaliação 360
    - 
    - 1 seção minhas avaliaçoes 
    - 2 avaliação pendentes as que eu estou fazendo sobre outras pessoas
    - 3 avaliaçoes concluidas 
*/

type Props = {
    avaliacoes: {
        id: number;
        avaliado: string;
        data: string;
        status: string;
    }[];
    title: string;
};

const TableView = ({ avaliacoes, title}: Props) => {
    return (
        <div>
            <Container id="table" className={Style.table}>
                <h3>{title}</h3>
                <Row id="headRow" className={Style.headRow}>
                    <Col id="cell" className={Style.cell} md="auto">#</Col>
                    <Col id="cell">Avaliado</Col>
                    <Col id="cell">Data</Col>
                    <Col id="cell">Status</Col>
                    <Col id="cell">Visualizar</Col>
                </Row>
                {avaliacoes.map((avaliacao) => {
                    return (
                        <Row id="row" className={Style.row}>
                            <Col id="cell" md="auto">{avaliacao.id}</Col>
                            <Col id="cell">{avaliacao.avaliado}</Col>
                            <Col id="cell">{avaliacao.data}</Col>
                            <Col id="cell"><span className="badge rounded-pill bg-success">{avaliacao.status}</span></Col>
                            <Col id="cell"><Button size="sm">Abrir</Button></Col>
                        </Row>
                    );
                })
                }
            </Container>
        </div>
    )
}
export default TableView;