import { format } from "date-fns";
import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Style from './sprint.module.scss';

type Props = {
    defaultOption: string;
    options?: ["2 Semanas", "2 Meses", "3 Meses", "6 Meses", "1 Ano"];
    value: string;
    dateFinish: Date;
}
const Sprint = ({ defaultOption, options, value, dateFinish }: Props) => {
    const [periodStart, setPeriodStart] = useState<number>(1);
    const [periodEnd, setPeriodEnd] = useState<number>(7);
    const [sprintCadencyOption, setSprintCadencyOption] = useState<string>('');
    const [dateConclusion, setDateConclusion] = useState<Date>(dateFinish);

    const handleActiveSprintOption = (event: any) => {
        setSprintCadencyOption(event.target.textContent);
    }
    return (
        <Container className={Style.sprint}>
            <Row className={Style.sectionDate}>
                <Col lg={4} sm={4}>
                    <label htmlFor="start">Período de:</label>
                    <input
                        className="form-control"
                        type="number"
                        value={periodStart}
                        onChange={(event: any) => setPeriodStart(event?.target.value)}
                        name="start"
                        min="1"
                        max="31" />
                </Col>
                <Col lg={2} sm={2}>
                    <label htmlFor="start">até:</label>
                    <input
                        className="form-control"
                        type="number"
                        value={periodEnd}
                        onChange={(event: any) => setPeriodEnd(event?.target.value)}
                        name="end"
                        min="1"
                        max="31" />
                </Col>
                <Col lg={5} sm={5}>
                    <label htmlFor="end">Término:</label>
                    <input
                        className="form-control"
                        type="date"
                        value={format(dateConclusion, 'yyyy-MM-dd')}
                        onChange={(event: any) => setDateConclusion(new Date(event?.target.value))}
                        name="dateFinish" />
                </Col>
            </Row>
            <Row className={Style.sectionCadency}>
                {options?.map(option => {
                    const selectedOption = (sprintCadencyOption || value || defaultOption)
                    const isActive = (option === selectedOption ? Style.active : '');
                    return (
                        <div
                            className={`${Style.sprintOption} ${isActive}`}
                            onClick={handleActiveSprintOption}>
                            {option}
                        </div>
                    )
                })}
            </Row>
        </Container>
    )
}
export default Sprint;