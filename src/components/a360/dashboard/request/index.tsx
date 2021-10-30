import { Col, Row } from "react-bootstrap";
import { PersonCircle } from "react-bootstrap-icons";
import Style from './request.module.scss'

type Props = {
    id: string,
    avatar: string,
    name: string,
    email: string,
    departament: string,
    handleOnChange: (event: any) => void
}

const Request = ({ id, avatar, name, email, departament, handleOnChange }: Props) => {
    return (
        <Row className={Style.assessementTableRecordContent}>
            <Col lg={4} sm={4} className={Style.userInfo}>
                <PersonCircle className={Style.avatar} />
                <div className={Style.details}>
                    <p className={Style.primayInfo}>{name}</p>
                    <p className={Style.secondaryInfo}>{id}</p>
                </div>
            </Col>
            <Col lg={3} sm={4}><p>{email}</p></Col>
            <Col lg={3} sm={4}><p>Administração{departament}</p></Col>
            <Col lg={2} sm={1}><input className={Style.checkbox} type="checkbox" onChange={handleOnChange} /></Col>
        </Row>
    );
}
export default Request;