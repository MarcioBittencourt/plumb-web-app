import { format, intervalToDuration } from "date-fns";
import { Col, Row } from "react-bootstrap";
import Style from './record.module.scss';

type Props = {
  title: string;
  startDate: string;
  endDate: string;
  tasks: any[];
  employees: any[];
  status: string;
}
const Record = ({ title, endDate, startDate, tasks, employees, status }: Props) => {
  const endDateFmt = format(new Date(endDate), 'd MMM yyyy');
  const dataResolution = intervalToDuration(
    {
      start: new Date(startDate),
      end: new Date(endDate)
    }
  )
  var days = (dataResolution.months || 0) * 30;
  days += (dataResolution.days || 0);

  return (
    <Row className={Style.goal}>
      <Col lg={4}>
        <p className={Style.taskTitle}>{title}</p>
      </Col>
      <Col lg={2}>
        <p className={Style.primaryInfo}>{`Restam ${days} dias`}</p>
        <p className={Style.secondaryInfo}>{`Disponível até ${endDateFmt}`}</p>
      </Col>
      <Col lg={2}>
        <div data-status={status} className={Style.status}>
          {status}
        </div>
      </Col>
      <Col lg={2}>
        <p className={Style.tasksLabel}>Tarefas</p>
        <div className={Style.infoRound}>
          <p className={Style.tasksCount}>{tasks.length}</p>
        </div>
      </Col>
      <Col lg={2}>
        <p className={Style.stakeholdersLabel}>Envolvidos</p>
        <div className={Style.infoRound}>
          <p className={Style.stakeholdersCount}>{employees.length}</p>
        </div>
      </Col>
    </Row>
  )
}
export default Record;