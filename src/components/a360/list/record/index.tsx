import Style from './table.view.module.scss'
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
    id: number;
    avaliado: string;
    data: string;
    status: string;
};
const AssessementRecord = ({ id, avaliado, data, status }: Props) => {
    return (
        <Row id="row" className={Style.row}>
            <Col id="cell" md="auto">{id}</Col>
            <Col id="cell">{avaliado}</Col>
            <Col id="cell">{data}</Col>
            <Col id="cell"><span className="badge rounded-pill bg-success">{status}</span></Col>
            <Col id="cell"><Button size="sm">Abrir</Button></Col>
        </Row>
    );
}
export default AssessementRecord;