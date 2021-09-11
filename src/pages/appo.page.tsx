import Style from './appo.page.module.scss';
import Goal from '../components/appo/goal'
import { Col, Container, Row } from 'react-bootstrap';
type Props = {}

// - Declaração do resultado que se pretende alcançar em um tempo estipulado</p>
// - objetivos pessoais e departamentais</p>
// - beneficios que a organização irá receber </p>
// - beneficios que o colaborador irá receber </
// - Comprometimento pessoal quanto ao alcance dos objetivos conjuntamente formulados</p>
// - Em certas situações, firma-se contratos formais ou psicológico para formalizar o acordo aceitado.</
// - Negociação sobre a alocação de recursos e meios necessários para o alcance dos objetivos</p>
// - Após os objetivos aprovados e o compromisso pessoal firmado, planeja-se os recursos e os meios fundamentais para atingi-los efetivamente</
// - O desempenho é o método especifico selecionado para o atingimento dos objetivos intencionados. O colaborador deve ter autonomia e independência para definir os meios para aproximar-se dos objetivos firmados. </
// - Constante monitoramento dos resultados e comparação com os objetivos formulados</p>
// - é a averiguação das despesas e vantagens relacionados no seguimento do processo. A mensuração continua dos resultados conforme a conquista dos objetivos</p>
// - o colaborador deve realizar sua autoavaliação, compreender os resultados e equiparar com os objetivos definidos. Contanto com a ajuda do gerente nesse processo.( a ferramenta não irá implementar)</p>

const APPOPage = (props: Props) => {
    return (
        <Container>
            <Row className={Style.pageHeader}>
                <Col><h3>Avaliação participativa por objetivos</h3></Col>
            </Row>
            <Goal />
            <Goal />
            <Goal />
        </Container >
    );
}
export default APPOPage;