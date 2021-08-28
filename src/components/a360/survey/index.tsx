import Ask from './ask';
import Style from './survey.module.scss'

type Props = {
    askings: any;
}

function showTab() {
}

const Survey = ({ askings }: Props) => {
    return (
        <form className={Style.survey}>
            <h2>Responsabilidades</h2>
            <section className={Style.section}>
                <ol>
                    <li><Ask category={askings[0].category} title={askings[0].utterances[0].title} options={askings[0].utterances[0].options} /></li>
                    <li><Ask category={askings[0].category} title={askings[0].utterances[1].title} options={askings[0].utterances[1].options} /></li>
                </ol>
            </section>
            <h2>Comunicação</h2>
            <section className={Style.section}>
                <ol>
                    <li><Ask category={askings[1].category} title={askings[1].utterances[0].title} options={askings[1].utterances[0].options} /></li>
                    <li><Ask category={askings[1].category} title={askings[1].utterances[1].title} options={askings[1].utterances[1].options} /></li>
                </ol>
            </section>
            <h2>Trabalho em equipe</h2>
            <section className={Style.section}>
                <ol>
                    <li><Ask category={askings[2].category} title={askings[2].utterances[0].title} options={askings[2].utterances[0].options} /></li>
                    <li><Ask category={askings[2].category} title={askings[2].utterances[1].title} options={askings[2].utterances[1].options} /></li>
                </ol>
            </section>
            <h2>Feedback individual</h2>
            <section className={Style.section}>
                <ol>
                    <li>
                        <div className={Style.utterance}>
                            <p>Como posso melhorar ainda mais?</p>
                            <textarea></textarea>
                        </div>
                    </li>
                    <li>
                        <div className={Style.utterance}>
                            <p>O que eu realizei com excelência/destaque?</p>
                            <textarea></textarea>
                        </div>
                    </li>
                </ol>
            </section>
            <section>
                <p>O colaborador está alinhado aos pilares da organização?</p>
                <label className="teste">Integridade</label>
                <label className="teste">Colaboração</label>
                <label className="teste">Transparencia</label>
                <label className="teste">Organização</label>
            </section>
        </form>
    )
}
export default Survey;