import Acount from "../components/acount";
import Style from "./acount.page.module.scss"

type Props = {}

const AcountPage = (props: Props) => {
    return (
        <div className={Style.page}>
            <Acount />
        </div >
    );
}
export default AcountPage;