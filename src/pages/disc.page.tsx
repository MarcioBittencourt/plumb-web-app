import DISCData from '../assets/disc.json'
import Survey from '../components/disc/survey';
import Style from './disc.page.module.scss'

const DISCPage = () => {
    return (
        <div className={Style.page}>
            <div className={Style.instructions}>
                <p> O teste DISC é uma ferramenta útil para o autoconhecimento e conhecimento do outro.
                    É definido como uma ferramenta que possibilita a identificação do perfil dominante do indivíduo,
                    sendo frequentemente utilizado no setor de Recursos Humanos para identificar as características dos colaboradores de uma empresa.
                </p>
                <p>Para identificar seu perfil comportamental realize o teste e siga as etapas descritas a baixo!</p>
                <ul>
                    <li>
                        <p>Cada linha ao lado contém quatro palavras.
                            Escolha aquela que voçê mais se identifica na caixa de seleção "+" e aquela que voçê menos se identifica na caixa de seleção "-".
                        </p>
                    </li>
                    <li>
                        <p>Imagine-se como realmente voçê é no seu dia-a-dia.</p>
                    </li>
                    <li>
                        <p>Responda sozinho e sem interrupções.</p>
                    </li>
                    <li>
                        <p>Não pule nem uma linha</p>
                    </li>
                    <li>
                        <p>Seja espontaneo e não racional</p>
                    </li>
                </ul>
            </div>
            <div className={Style.webform}>
                <Survey askings={DISCData.askings} />
            </div>

        </div>
    )
}
export default DISCPage;