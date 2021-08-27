import Ask from '../ask/ask';
import Style from './survey.module.scss'

type Props = {
    askings: {
        category: string,
        utterances: any[],
    }[];
}

function showTab() {
}

const Survey = ({ askings }: Props) => {
    return (
        <div className={Style.survey}>
            <form>
                {askings.map((ask) => {
                    return (
                        <div className={Style.title}>
                            <h2>{ask.category}</h2>
                            <Ask category={ask.category} utterances={ask.utterances}/>
                        </div>
                    )
                })}
                <div>
                    <div className={Style.title}>
                        <h2>Feedback individual</h2>
                    </div>
                    <div>
                        <div className={Style.utterance}>
                            <p>Como posso melhorar ainda mais?</p>
                        </div>
                        <div>
                            <textarea></textarea>
                        </div>
                    </div>
                    <div>
                        <div className={Style.utterance}>
                            <p>O que eu realizei com excelência/destaque?</p>
                        </div>
                        <div>
                            <textarea></textarea>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}
export default Survey;