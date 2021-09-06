import Style from './record.module.scss'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { BoxArrowInRight } from 'react-bootstrap-icons';
import { format, intervalToDuration } from 'date-fns';
import { Link } from 'react-router-dom';

/* usar div ao invez de table
    - tela de listagem da avaliação 360
    - 
    - 1 seção minhas avaliaçoes 
    - 2 avaliação pendentes as que eu estou fazendo sobre outras pessoas
    - 3 avaliaçoes concluidas 
*/

type Props = {
    id: string;
    avaliado: string;
    dataSolicitacao: string;
    prazoResolucao: string;
    dataConclucao: string;
    status: string;
};
const AssessementRecord = ({ id, avaliado, dataSolicitacao, prazoResolucao, dataConclucao, status }: Props) => {
    const dataConclusaoFmt = format(new Date(dataConclucao), 'd MMM yyyy');
    const prazoResolucaoFmt = format(new Date(prazoResolucao), 'd MMM yyyy');
    const dataSolicitacaoFmt = format(new Date(dataSolicitacao), 'd MMM yyyy');
    const dataResolution = intervalToDuration(
        {
            start: new Date(dataSolicitacao),
            end: new Date(prazoResolucao)
        }
    )

    return (
        <div className={Style.assessementTableRecord}>
            <Row className={Style.assessementTableRecordContent}>
                <Col className={Style.userInfo}>
                    <span className={Style.avatar}>&nbsp;</span>
                    <div className={Style.details}>
                        <p className={Style.primaryInfo}>{avaliado}</p>
                        <p className={Style.secondaryInfo}>{id}</p>
                    </div>
                </Col>
                <Col className={Style.statusAssessement}>
                    <div data-status={status} className={Style.status}>
                        {status}
                    </div>
                </Col>
                <Col>
                    <p className={Style.primaryInfo}>{dataSolicitacaoFmt}</p>
                </Col>
                <Col>
                    <div className={Style.details}>
                        <p className={Style.primaryInfo} hidden={status === "Concluído"}>{`Restam ${dataResolution.days} dias ${dataResolution.hours}:${dataResolution.minutes}:${dataResolution.seconds}`}</p>
                        <p className={Style.secondaryInfo} hidden={["Concluído", "Enviado"].includes(status)}>Disponível até {prazoResolucaoFmt}</p>
                        <p className={Style.secondaryInfo} hidden={["Pendente", "Rascunho"].includes(status)}>Concluído em {dataConclusaoFmt}</p>
                    </div>
                </Col>
                <Col>
                    <Link to={`/360/${id}`}><BoxArrowInRight size={25} /></Link>
                </Col>
            </Row>
        </div>
    );
}
export default AssessementRecord;