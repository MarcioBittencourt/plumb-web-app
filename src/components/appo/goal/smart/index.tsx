import { useState } from "react";
import Style from './smart.module.scss'

type Props = {
    smarts: ["Especifico", "Mensuravel", "Alcançavel", "Realista", "Temporal"]
};

const SmartGoals = ({smarts}: Props) => {
    const [smartOption, setSmartOption] = useState<boolean[]>([false, false, false, false, false]);
    
    const handleActiveOption = (event: any, index: any) => {
        smartOption.splice(index, 1, !smartOption[index]);
        setSmartOption([...smartOption]);
        event.target.className.includes(`${Style.active}`)
        ? event.target.classList.remove(`${Style.active}`)
        : event.target.classList.add(`${Style.active}`);
    }

    return (
        <div className={Style.smartSection}>
            {smarts.map((smart, index) => {
                return(
                    <div className={`${Style.smartOption}`}
                        // eslint-disable-next-line no-restricted-globals
                        onClick={() => handleActiveOption(event, index)}>
                        {smart.substring(0, 1)}
                    </div>
                );
            })}
        </div>
    );
}
export default SmartGoals;