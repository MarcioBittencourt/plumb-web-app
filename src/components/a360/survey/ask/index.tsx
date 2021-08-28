import Style from './ask.module.scss'

type Props = {
    category: string,
    title: string,
    options: string[]
};

const Ask = ({ category, title, options }: Props) => {
    const uid = Math.floor(Math.random() * 100);
    return (
        <div className={Style.ask}>
            <p className={Style.title}>{title}</p>
            <fieldset className={Style.options} name={`options-${uid}`}>
                    {options.map((answer, index) => {
                        return (
                            <div className={Style.option}>
                                <input className="form-check-input" id={answer} type="radio" name={`options-${uid}`} value={answer} />
                                <label htmlFor={answer}>{answer}</label>
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