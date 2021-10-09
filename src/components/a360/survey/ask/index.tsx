import { useEffect, useState } from 'react';
import Style from './ask.module.scss'

type Props = {
    category: string,
    title: string,
    options: string[],
    checked: string,
    uuidAssessement: string,
    questionId: string,
    status: string,
    //handleUpdateData: (event: any, newValue: any, questionId: any) => void;
}; 

const Ask = ({ category, title, options, checked, uuidAssessement, questionId, status }: Props) => {

    const uid = Math.floor(Math.random() * 100);

    const [selectedValue, setSelectedValue ] = useState<string>(checked);

    useEffect(() => {
        setSelectedValue(checked);
    }, [checked]);

    const handleUpdateData = (event: any) => {
        const data: any = JSON.parse(localStorage.getItem(uuidAssessement) || '{}');
        data[questionId].answer = event.target.value;
        setSelectedValue(event.target.value);
        localStorage.setItem(uuidAssessement, JSON.stringify(data));
    }

    return (
        <div className={Style.ask}>
            <p className={Style.title}>{title}</p>
            <fieldset className={Style.options} name={`options-${uid}`}>
                    {options.map((answer, index) => {
                        return (
                            <div className={Style.option}>
                                <input
                                    className="form-check-input"
                                    id={`${category}-answer-${questionId}-option-${index}`}
                                    type="radio"
                                    checked={answer === selectedValue}
                                    disabled={"Concluído" === status}
                                    name={`options-${questionId}`}
                                    value={answer}
                                    onChange={handleUpdateData}/>
                                <label htmlFor={`${category}-answer-${questionId}-option-${index}`}>{answer}</label>
                            </div>
                        )
                    })
                    }
                {/** TODO: Validar o tipo (typeof) da pergunta para reutilizar o componente ask em diversos tipos de questão */}
            </fieldset>
        </div>
    )
}
export default Ask;