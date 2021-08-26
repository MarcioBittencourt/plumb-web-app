import Slider from "./slider";

type Props = {};

const AskStandard = (props: Props) => {
    return (
        <div>
            <div>
                <p>O colaborador está alinhado aos pilares da organização?</p>
            </div>
            <label className="teste">Integridade</label>
            <Slider />
            <label className="teste">Colaboração</label>
            <Slider />
            <label className="teste">Transparencia</label>
            <Slider />
            <label className="teste">Organização</label>
            <Slider />
        </div>
    );
}
export default AskStandard;