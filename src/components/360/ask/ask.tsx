import Style from './ask.module.scss'

type Props = {
    category: string,
    utterances: {
        title: string,
        options: string[]
    }[]
};

const Ask = ({ category, utterances}: Props) => {
    return (
        <div className={Style.survey}>
            <div className={Style.category}>
                {utterances.map((utterance, index) => {
                    return (
                        <div className={Style.utterance}>
                            <div>
                                <p>{utterance.title}</p>
                            </div>
                            <fieldset name={`utterance-${index}-${category}`}>
                                {utterance.options.map((answer, indexOption) => {
                                    return (
                                        <div className={Style.options}>
                                            <div>
                                                <input id={answer} type="radio" name={`utterance-${index}-${category}`} value={answer} />
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