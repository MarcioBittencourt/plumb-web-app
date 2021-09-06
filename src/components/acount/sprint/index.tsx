import { useState } from "react";
import { Row } from "react-bootstrap";
import Style from './sprint.module.scss';

type Props = {
    defaultOption: string;
    options?: ["2 Semanas", "2 Meses", "3 Meses", "6 Meses", "1 Ano"];
}
const Sprint = ({ defaultOption, options }: Props) => {
    const [sprintCadencyOption, setSprintCadencyOption] = useState<string>('');

    const handleActiveSprintOption = (event: any) => {
        setSprintCadencyOption(event.target.textContent);
    }
    return (
        <Row className={Style.sprint}>
            {options?.map(option => {
                const isActive = (option === (sprintCadencyOption || defaultOption) ? Style.active : '');
                return (
                    <div className={`${Style.sprintOption} ${isActive}`} onClick={handleActiveSprintOption}>{option}</div>
                )
            })}
        </Row>
    )
}

export default Sprint;