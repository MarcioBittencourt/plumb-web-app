import { Slider } from '@material-ui/core';
import Ask from './ask';
import Style from './survey.module.scss'
import DataResponse360 from '../../../assets/360response.json'
import { useEffect, useState } from 'react';

type Props = {
    //askings: any;
    uuid: string;
}


// 1- consertar o banco de dados com as propriedades certas referentes a avaliação
// 2- criar o fetch para retornar a avaliação
const Survey = ({ uuid }: Props) => {
    const [askings, setAskings] = useState<any[]>([]);

    useEffect(() => {
        (async () => {
            const response = await fetch(`http://localhost:5000/questions/byAssessement/${uuid}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });
            const resp = response.json();
            setAskings(await resp);
            console.log("resp:", resp);
        })();
    }, []);

    console.log("state:", askings);

    const assessement: any = DataResponse360.assessements.find((assessement) => assessement.uuid === uuid)

    const marks = [
        //{value: 0, label: ""},
        { value: 0, label: "Não atende" },
        { value: 1, label: "Abaixo" },
        { value: 2, label: "Atende Plenamente" },
        { value: 3, label: "Supera" },
        //{value: 5, label: ""}
    ]
    return (
        <form className={Style.survey}>
            <h2>Responsabilidades</h2>
            <section className={Style.section}>
                <ol>
                    <li><Ask checked={assessement?.responses[0].radiogroup[0]} category={askings[0].category} title={askings[0].utterances[0].title} options={askings[0].utterances[0].options} /></li>
                    <li><Ask checked={assessement?.responses[0].radiogroup[1]} category={askings[0].category} title={askings[0].utterances[1].title} options={askings[0].utterances[1].options} /></li>
                </ol>
            </section>
            <h2>Comunicação</h2>
            <section className={Style.section}>
                <ol>
                    <li><Ask checked={assessement?.responses[1].radiogroup[0]} category={askings[1].category} title={askings[1].utterances[0].title} options={askings[1].utterances[0].options} /></li>
                    <li><Ask checked={assessement?.responses[1].radiogroup[1]} category={askings[1].category} title={askings[1].utterances[1].title} options={askings[1].utterances[1].options} /></li>
                </ol>
            </section>
            <h2>Trabalho em equipe</h2>
            <section className={Style.section}>
                <ol>
                    <li><Ask checked={assessement?.responses[2].radiogroup[0]} category={askings[2].category} title={askings[2].utterances[0].title} options={askings[2].utterances[0].options} /></li>
                    <li><Ask checked={assessement?.responses[2].radiogroup[1]} category={askings[2].category} title={askings[2].utterances[1].title} options={askings[2].utterances[1].options} /></li>
                </ol>
            </section>
            <h2>Feedback individual</h2>
            <section className={Style.section}>
                <ol>
                    <li>
                        <div className={Style.utterance}>
                            <p>Como posso melhorar ainda mais?</p>
                            <textarea>{assessement?.responses[3].textarea[0]}</textarea>
                        </div>
                    </li>
                    <li>
                        <div className={Style.utterance}>
                            <p>O que eu realizei com excelência/destaque?</p>
                            <textarea>{assessement?.responses[3].textarea[1]}</textarea>
                        </div>
                    </li>
                </ol>
            </section>
            <h2>Expectativas</h2>
            <section className={Style.section}>
                <div className={Style.essential}>
                    <p>O colaborador está alinhado aos pilares da organização?</p>
                    <label className="teste">Integridade</label>
                    <p>The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.
                        Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced
                        in their exact original form, accompanied by English versions from the 1914 translation
                        by H. Rackham.</p>
                    <div className={Style.slider}>
                        <Slider className={Style.slider} defaultValue={3} valueLabelDisplay="auto" value={assessement.responses[4].slider[0]} marks={marks} step={1} min={0} max={3}></Slider>
                    </div>
                </div>
                <div className={Style.essential}>
                    <label className="teste">Colaboração</label>
                    <p>The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.
                        Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced
                        in their exact original form, accompanied by English versions from the 1914 translation
                        by H. Rackham.</p>
                    <div className={Style.slider}>
                        <Slider className={Style.slider} defaultValue={3} valueLabelDisplay="auto" value={assessement.responses[4].slider[1]} marks={marks} step={1} min={0} max={3}></Slider>
                    </div>
                </div>
                <div className={Style.essential}>
                    <label className="teste">Transparencia</label>
                    <p>The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.
                        Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced
                        in their exact original form, accompanied by English versions from the 1914 translation
                        by H. Rackham.</p>
                    <div className={Style.slider}>
                        <Slider className={Style.slider} defaultValue={3} valueLabelDisplay="auto" value={assessement.responses[4].slider[2]} marks={marks} step={1} min={0} max={3}></Slider>
                    </div>
                </div>
                <div className={Style.essential}>
                    <label className="teste">Organização</label>
                    <p>The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.
                        Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced
                        in their exact original form, accompanied by English versions from the 1914 translation
                        by H. Rackham.</p>
                    <div className={Style.slider}>
                        <Slider defaultValue={3} valueLabelDisplay="auto" value={assessement.responses[4].slider[3]} marks={marks} step={1} min={0} max={3}></Slider>
                    </div>
                </div>
            </section>
        </form>
    )
}
export default Survey;