import Table from '../table.view/table.view'

type Props = {
    
};

const avaliacoes = [
    { id: 1, avaliado: "Marcio", data: "2021-08-23 18:29:34", status: "Pendente" },
    { id: 1, avaliado: "Marcio", data: "2021-08-23 18:29:34", status: "Pendente" },
    { id: 1, avaliado: "Marcio", data: "2021-08-23 18:29:34", status: "Pendente" },
    { id: 1, avaliado: "Marcio", data: "2021-08-23 18:29:34", status: "Pendente" },
    { id: 1, avaliado: "Marcio", data: "2021-08-23 18:29:34", status: "Pendente" },
    { id: 1, avaliado: "Marcio", data: "2021-08-23 18:29:34", status: "Pendente" },
    { id: 1, avaliado: "Marcio", data: "2021-08-23 18:29:34", status: "Pendente" }
];

const title = "Minhas avaliaçoes realizadas";
const title1 = "Avaliaçoes pendentes";

const ListScreen = (props: Props) => {
    return (
        <div>
            <Table avaliacoes={avaliacoes} title={title}/>
            <Table avaliacoes={avaliacoes} title={title1}/>
        </div>
    );
}
export default ListScreen;