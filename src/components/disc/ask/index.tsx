import { useEffect, useRef, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { DashCircle, PatchPlus, PlusCircle } from 'react-bootstrap-icons';
import { Profile } from '../survey';
import Style from './ask.module.scss'

type Props = {
    id: string,
    utterance: string[],
    response?: string,
    profile: Profile,
    onChangeProfile: (profile: Profile) => void;
}

const Ask = ({ id, utterance, response, profile, onChangeProfile }: Props) => {
    const selectMoreRef = useRef<HTMLSelectElement>(null);
    const selectLessRef = useRef<HTMLSelectElement>(null);

    const [selectMore, setSelectMore] = useState<any>('');
    const [selectLess, setSelectLess] = useState<any>('');

    useEffect(() => {
        const disc: any = JSON.parse(localStorage.getItem('disc') || '{}');
        disc[id] = { less: selectLess, more: selectMore };
        localStorage.setItem('disc', JSON.stringify(disc));
    }, [selectMore, selectLess]);

    const handleMeasurementMore = () => {
        setSelectMore(selectMoreRef.current?.value);
        let index = selectMoreRef.current?.options.selectedIndex;
        switch (index) {
            case 1:
                profile.dominante.scoreMore += index;
                break;
            case 2:
                profile.influente.scoreMore += index;
                break;
            case 3:
                profile.estavel.scoreMore += index;
                break;
            case 4:
                profile.conforme.scoreMore += index;
                break;
        }
        onChangeProfile({ ...profile });
    }

    const handleMeasurementLess = () => {
        setSelectLess(selectLessRef.current?.value);
        const index = selectLessRef.current?.options.selectedIndex;
        switch (index) {
            case 1:
                profile.dominante.scoreLess -= index;
                break;
            case 2:
                profile.influente.scoreLess -= index;
                break;
            case 3:
                profile.estavel.scoreLess -= index;
                break;
            case 4:
                profile.conforme.scoreLess -= index;
                break;
        }
        onChangeProfile({ ...profile });
    }

    const showOptions = () => {
        return utterance.map((option, index) => {
            return (
                <option value={option}>{option}</option>
            )
        })
    }

    return (
        <Row className={Style.answer}>
            {utterance.map((option, index) => {
                return (
                    <Col lg={2} className={Style.option}>
                        <p>{option}</p>
                    </Col>
                )
            })}
            <Col lg={2} className={Style.option}>
                <PlusCircle className={Style.iconOptionMore} />
                <select 
                    defaultValue="none" 
                    onChange={handleMeasurementMore} 
                    ref={selectMoreRef} 
                    id="more"
                    className="form-control">
                        <option value="none" disabled> - Selecione - </option>
                        {showOptions()}
                </select>
            </Col>
            <Col lg={2} className={Style.option}>
                <DashCircle className={Style.iconOptionLess} />
                <select 
                    defaultValue="none" 
                    onChange={handleMeasurementLess} 
                    ref={selectLessRef} 
                    id="less"
                    className="form-control">
                    <option value="none" disabled> - Selecione - </option>
                    {showOptions()}
                </select>
            </Col>
        </Row>
    )
}
export default Ask;