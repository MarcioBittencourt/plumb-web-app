import Style from './ask.module.scss'

type Props = {
    category: string,
    utterances: string[],
    answers: string[]
}
const Ask = ({ category, utterances, answers }: Props) => {
    return (
        <div className={Style.survey}>
            <div className={Style.title}>
                <h2>{category}</h2>
            </div>
            <div className={Style.category}>
                {utterances.map((utterance) => {
                    return (
                        <div className={Style.utterance}>
                            <div>
                                <p>{utterance}</p>
                            </div>
                            <fieldset name="options">
                                {answers.map((answer) => {
                                    return (
                                        <div className={Style.options}>
                                            <div>
                                                <input id={answer} type="radio" name="options" value={answer} />
                                            </div>
                                            <div>
                                                <label htmlFor={answer}>{answer}</label>
                                            </div>
                                        </div>
                                    )
                                })
                                }
                            </fieldset>
                        </div>
                    )
                })
                }
            </div>
        </div>
    )
}
export default Ask;