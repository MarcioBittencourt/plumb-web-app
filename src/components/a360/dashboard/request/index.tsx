import { Col, Row } from "react-bootstrap";
import Style from './request.module.scss'

type Props = {
    id: string,
    avatar: string,
    nome: string,
    email: string,
    setor: string,
    handleOnChange: (event: any) => void
}

const Request = ({ id, avatar, nome, email, setor, handleOnChange }: Props) => {
    return (
        <Row className={Style.assessementTableRecordContent}>
            <Col className={Style.userInfo}>
                <div className={Style.avatar}></div>
                <div className={Style.details}>
                    <p className={Style.primayInfo}>{nome}</p>
                    <p className={Style.secondaryInfo}>{id}</p>
                </div>
            </Col>
            <Col><p>{email}</p></Col>
            <Col><p>{setor}</p></Col>
            <Col><input className={Style.checkbox} type="checkbox" onChange={handleOnChange} /></Col>
        </Row>
    );
}
export default Request;