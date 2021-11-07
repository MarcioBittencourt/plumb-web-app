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
    concludedDate?: string;
    status: string;
    typePresentation?: string;
};
const AssessementRecord = ({ id, name, requestDate, deadlineDate, concludedDate, status, typePresentation }: Props) => {
    const dataConclusaoFmt = concludedDate ? format(new Date(concludedDate), 'd MMM yyyy') : null;
    const prazoResolucaoFmt = deadlineDate ? format(new Date(deadlineDate), 'd MMM yyyy') : null;
    const dataSolicitacaoFmt = requestDate ? format(new Date(requestDate), 'd MMM yyyy') : null;
    const dataResolution = intervalToDuration(
        {
            start: new Date(),
            end: deadlineDate ? new Date(deadlineDate) : new Date(),
        }
    )

    var reaminingTotalTimeInDay = ((dataResolution.months || 0) * 30) + (dataResolution.days || 0);

    const showIcon = () => {
        if (typePresentation !== "aboutMe" || status === "Concluído") {
            return (
                <>
                    <Link
                        to={`/app/360/${id}`}
                        className={Style.linkIconInside}>
                        <BoxArrowInRight className={Style.iconInside} />
                    </Link>
                </>
            )
        }
    }

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
                            <p className={Style.primaryInfo} hidden={status === "Concluído"}>{`Restam ${reaminingTotalTimeInDay} dias ${dataResolution.hours}:${dataResolution.minutes}`}</p>
                            <p className={Style.secondaryInfo} hidden={["Concluído", "Enviado"].includes(status)}>Disponível até {prazoResolucaoFmt}</p>
                            <p className={Style.secondaryInfo} hidden={["Pendente", "Rascunho"].includes(status)}>Concluído em {dataConclusaoFmt}</p>
                        </div>
                    </Col>
                    <Col lg={2}>
                        {showIcon()}
                    </Col>
                </Row>
            </div>
        );
    }
    export default AssessementRecord;