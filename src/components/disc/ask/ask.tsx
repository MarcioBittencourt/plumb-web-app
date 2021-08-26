import { useRef } from 'react'
import { Profile } from '../form/survey';
import Style from './ask.module.scss'

type Props = {
    utterance: string[],
    response?: string,
    profile: Profile,
    onChangeProfile: (profile: Profile) => void;
}

const Ask = ({ utterance, response, profile, onChangeProfile }: Props) => {
    const selectMoreRef = useRef<HTMLSelectElement>(null);
    const selectLessRef = useRef<HTMLSelectElement>(null);

    const handleMeasurementMore = () => {
        let index = selectMoreRef.current?.options.selectedIndex;
        console.log("index more: ", index);
        switch (index) {
            case 1:
                profile.dominant.scoreMore += index;
                break;
            case 2:
                profile.influence.scoreMore += index;
                break;
            case 3:
                profile.steadiness.scoreMore += index;
                break;
            case 4:
                profile.compliance.scoreMore += index;
                break;
        }
        onChangeProfile({...profile});
    }

    const handleMeasurementLess = () => {
        const index = selectLessRef.current?.options.selectedIndex;
        console.log("index less: ", index);
        switch (index) {
            case 1:
                profile.dominant.scoreLess -= index;
                break;
            case 2:
                profile.influence.scoreLess -= index;
                break;
            case 3:
                profile.steadiness.scoreLess -= index;
                break;
            case 4:
                profile.compliance.scoreLess -= index;
                break;
        }
        onChangeProfile({...profile});
    }

    const showOptions = () => {
        return utterance.map((option, index) => {
            return (
                <option value={option}>{option}</option>
            )
        })
    }

    return (
        <div className={Style.answer}>
            <div className={Style.options}>
                {utterance.map((option, index) => {
                    return (
                        <div className={Style.option}>
                            <p>{option}</p>
                        </div>
                    )
                })}
            </div>
            <div className={Style.responses}>
                <select defaultValue="none" onChange={handleMeasurementMore} ref={selectMoreRef} id="more">
                    <option value="none" disabled> -- Selecione -- </option>
                    {showOptions()}
                </select>
                <select defaultValue="none" onChange={handleMeasurementLess} ref={selectLessRef} id="less">
                    <option value="none" disabled> -- Selecione -- </option>
                    {showOptions()}
                </select>
            </div>
        </div>
    )
}
export default Ask;