import { useState } from "react";
import { Row } from "react-bootstrap";
import Style from './sprint.module.scss';

type Props = {
    typeAssessment: string;
    defaultOption: string;
    options?: ["2 Semanas", "2 Meses", "3 Meses", "6 Meses", "1 Ano"];
    value: string;
    dateFinish: Date;
}

const Sprint = ({ defaultOption, typeAssessment, options, value, dateFinish }: Props) => {

    const [sprintCadencyOption, setSprintCadencyOption] = useState<string>('');

    const handleActiveSprintOption = (event: any) => {
        setSprintCadencyOption(event.target.textContent);

        if (!localStorage.getItem('cycle')) {
            localStorage.setItem('cycle', JSON.stringify([]));
        } else {
            const localStorageCycle: any[] = JSON.parse(localStorage.getItem('cycle') || '{}');
            
            localStorageCycle.map((cycle, index) => {
                if(cycle.assessment === typeAssessment) {
                    localStorageCycle.splice(index, 1)
                }
            });

            const cycles = [...localStorageCycle, {
                assessment: typeAssessment,
                cadency: event.target.textContent
            }];

            localStorage.setItem('cycle', JSON.stringify(cycles));
        }
    }

    return (
        <Row className={Style.sprint}>
            {options?.map(option => {
                const selectedOption = (sprintCadencyOption || value || defaultOption)
                const isActive = (option === selectedOption ? Style.active : '');
                return (
                    <button
                        className={`${Style.sprintOption} ${isActive}`}
                        onClick={handleActiveSprintOption}>
                        {option}
                    </button>
                )
            })}
        </Row>
    )
}
export default Sprint;