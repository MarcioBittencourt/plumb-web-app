import Style from './record.module.scss'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { BoxArrowInRight, PersonCircle } from 'react-bootstrap-icons';
import { format, intervalToDuration } from 'date-fns';
import { Link } from 'react-router-dom';

type Props = {
    id: string;
    name: string;
    requestDate: string;
    deadlineDate: string;
    concludedDate: Date;
    status: string;
};
const AssessementRecord = ({ id, name, requestDate, deadlineDate, concludedDate, status }: Props) => {
    const dataConclusaoFmt = format(new Date(concludedDate), 'd MMM yyyy');
    const prazoResolucaoFmt = format(new Date(deadlineDate), 'd MMM yyyy');
    const dataSolicitacaoFmt = format(new Date(requestDate), 'd MMM yyyy');
    const dataResolution = intervalToDuration(
        {
            start: new Date(),
            end: new Date(deadlineDate)
        }
    )

    var days = (dataResolution.months || 0) * 30;
    days += (dataResolution.days || 0);

    return (
        <div className={Style.tableRecord}>
            <Row className={Style.tableRecordContent}>
                <Col lg={4} className={Style.userInfo}>
                    <PersonCircle className={Style.avatar} />
                    <div className={Style.detailsAvatar}>
                        <p className={Style.primaryInfo}>{name}</p>
                        <p className={Style.secondaryInfo}>{id}</p>
                    </div>
                </Col>
                <Col lg={3} className={Style.dataColumn}>
                    <div data-status={status} className={Style.status}>
                        {status}
                    </div>
                </Col>
                <Col lg={3} className={Style.dataColumn}>
                    <div className={Style.detailsStatus}>
                        <p className={Style.tertiaryInfo}>Solicitado {dataSolicitacaoFmt}</p>
                        <p className={Style.primaryInfo} hidden={status === "Concluído"}>{`Restam ${days} dias ${dataResolution.hours}:${dataResolution.minutes}`}</p>
                        <p className={Style.secondaryInfo} hidden={["Concluído", "Enviado"].includes(status)}>Disponível até {prazoResolucaoFmt}</p>
                        <p className={Style.secondaryInfo} hidden={["Pendente", "Rascunho"].includes(status)}>Concluído em {dataConclusaoFmt}</p>
                    </div>
                </Col>
                <Col lg={2}>
                    <Link 
                        to={`/app/360/${id}`} 
                        className={Style.linkIconInside}>
                            <BoxArrowInRight className={Style.iconInside} />
                    </Link>
                </Col>
            </Row>
        </div>
    );
}
export default AssessementRecord;