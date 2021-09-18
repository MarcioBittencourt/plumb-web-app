import { Slider } from '@material-ui/core';
import Ask from './ask';
import Style from './survey.module.scss'
import Data360 from '../../../assets/360.json'
import { useEffect, useState } from 'react';

type Props = {
    //askings: any;
    uuid: string;
}

const Survey = ({ uuid }: Props) => {
    const [askings, setAskings] = useState<any>({});
    useEffect(() => {
        (async () => {
            const response = await fetch(`http://localhost:5000/questions/byAssessement/${uuid}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            })
            const resp = await response.json();
            const questions: any = {};
            resp.map((q: any) => {
                questions[q.questionId] = q;
            });
            setAskings(questions);
        })();
    }, []);

    const options = [
        "Nunca",
        "Algumas vezes",
        "Sempre"
    ];

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
                    <li>
                        <Ask
                            checked={askings["a360-responsability-1"]?.answer}
                            category={askings["a360-responsability-1"]?.category}
                            title={askings["a360-responsability-1"]?.ask}
                            options={options} />
                    </li>
                    <li>
                        <Ask
                            checked={askings["a360-responsability-2"]?.answer}
                            category={askings["a360-responsability-2"]?.category}
                            title={askings["a360-responsability-2"]?.ask}
                            options={options} />
                    </li>
                </ol>
            </section>
            <h2>Comunicação</h2>
            <section className={Style.section}>
                <ol>
                    <li>
                        <Ask
                            checked={askings["a360-comunication-1"]?.answer}
                            category={askings["a360-comunication-1"]?.category}
                            title={askings["a360-comunication-1"]?.ask}
                            options={options} />
                    </li>
                    <li>
                        <Ask
                            checked={askings["a360-comunication-2"]?.answer}
                            category={askings["a360-comunication-2"]?.category}
                            title={askings["a360-comunication-2"]?.ask}
                            options={options} />
                    </li>
                </ol>
            </section>
            <h2>Trabalho em equipe</h2>
            <section className={Style.section}>
                <ol>
                    <li>
                        <Ask
                            checked={askings["a360-teamwork-1"]?.answer}
                            category={askings["a360-teamwork-1"]?.category}
                            title={askings["a360-teamwork-1"]?.ask}
                            options={options} />
                    </li>
                    <li>
                        <Ask
                            checked={askings["a360-teamwork-2"]?.answer}
                            category={askings["a360-teamwork-2"]?.category}
                            title={askings["a360-teamwork-2"]?.ask}
                            options={options} />
                    </li>
                </ol>
            </section>
            <h2>Feedback individual</h2>
            <section className={Style.section}>
                <ol>
                    <li>
                        <div className={Style.utterance}>
                            <p>Como posso melhorar ainda mais?</p>
                            <textarea value={askings["a360-feedback-1"]?.answer}></textarea>
                        </div>
                    </li>
                    <li>
                        <div className={Style.utterance}>
                            <p>O que eu realizei com excelência/destaque?</p>
                            <textarea value={askings["a360-feedback-2"]?.answer}></textarea>
                        </div>
                    </li>
                </ol>
            </section>
            <h2>Expectativas</h2>
            <section className={Style.section}>
                <div className={Style.essential}>
                    <p>O colaborador está alinhado aos pilares da organização?</p>
                    <label className="teste">Integridade</label>
                    <p>significa a qualidade de alguém ou algo a ser integre,
                        de conduta reta, pessoa de honra, ética, educada, brioso,
                        pundonoroso, cuja natureza de ação nos dá uma imagem de inocência,
                        pureza ou castidade, o que é íntegro, é justo e perfeito,
                        é puro de alma e de espírito.</p>
                    <div className={Style.slider}>
                        <Slider
                            className={Style.slider}
                            defaultValue={3}
                            valueLabelDisplay="auto"
                            value={marks.findIndex(mark => mark.label === askings['a360-expectation-1']?.answer)}
                            marks={marks}
                            step={1}
                            min={0}
                            max={3}>
                        </Slider>
                    </div>
                </div>
                <div className={Style.essential}>
                    <label className="teste">Colaboração</label>
                    <p>The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.
                        Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced
                        in their exact original form, accompanied by English versions from the 1914 translation
                        by H. Rackham.</p>
                    <div className={Style.slider}>
                        <Slider
                            className={Style.slider}
                            defaultValue={3}
                            valueLabelDisplay="auto"
                            value={marks.findIndex(mark => mark.label === askings['a360-expectation-2']?.answer)}
                            marks={marks}
                            step={1}
                            min={0}
                            max={3}>
                        </Slider>
                    </div>
                </div>
                <div className={Style.essential}>
                    <label className="teste">Transparência</label>
                    <p>The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.
                        Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced
                        in their exact original form, accompanied by English versions from the 1914 translation
                        by H. Rackham.</p>
                    <div className={Style.slider}>
                        <Slider
                            className={Style.slider}
                            defaultValue={3}
                            valueLabelDisplay="auto"
                            value={marks.findIndex(mark => mark.label === askings['a360-expectation-3']?.answer)}
                            marks={marks}
                            step={1}
                            min={0}
                            max={3}>
                        </Slider>
                    </div>
                </div>
                <div className={Style.essential}>
                    <label className="teste">Organização</label>
                    <p>The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.
                        Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced
                        in their exact original form, accompanied by English versions from the 1914 translation
                        by H. Rackham.</p>
                    <div className={Style.slider}>
                        <Slider
                            defaultValue={3}
                            valueLabelDisplay="auto"
                            value={marks.findIndex(mark => mark.label === askings['a360-expectation-4']?.answer)}
                            marks={marks}
                            step={1}
                            min={0}
                            max={3}>
                        </Slider>
                    </div>
                </div>
            </section>
        </form >
    )
}
export default Survey;