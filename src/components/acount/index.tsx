import { useEffect, useRef, useState } from "react"
import { Col, Container, Row } from "react-bootstrap"
import Style from './acount.module.scss'
import Sprint from "./sprint"

type Props = {
}

const Acount = (props: Props) => {

    const account = JSON.parse(localStorage.getItem("account") || '{}');
    const admin = account.admin;
    const company = account.company;
    const colaborators = account.company.employees;
    const sprints = account.company.sprints;

    const refBusinessName = useRef<HTMLInputElement>(null);
    const refCompanyName = useRef<HTMLInputElement>(null);
    const refBusinessRegister = useRef<HTMLInputElement>(null);
    const refCompanyCountry = useRef<HTMLInputElement>(null);
    const refAdminEmail = useRef<HTMLInputElement>(null);
    const refAdminPassword = useRef<HTMLInputElement>(null);
    const refEmployeeName = useRef<HTMLInputElement>(null);
    const refEmployeeEmail = useRef<HTMLInputElement>(null);
    const refEmployeePassword = useRef<HTMLInputElement>(null);
    const refDiscCadency = useRef<HTMLInputElement>(null);
    const refA360Cadency = useRef<HTMLInputElement>(null);
    const refAppoCadency = useRef<HTMLInputElement>(null);

    const [employees, setEmployees] = useState<any[]>([]);
    const [employeesData, setEmployeesData] = useState<any[]>([]);



    const createAccount = async () => {
        const account: any = {
            admin: {
                name: refCompanyName.current?.value,
                email: refAdminEmail.current?.value,
                password: refAdminPassword.current?.value,
            },
            company: {
                businessName: refBusinessName.current?.value,
                companyName: refCompanyName.current?.value,
                businessRegister: refBusinessRegister.current?.value,
                country: refCompanyCountry.current?.value,
                employees: employeesData.map((employee, index) => {
                    return { name: employee.name, photo: employee.photo, email: employee.email, password: employee.password, role: "user" }
                }),
                sprints: {
                    appo: {
                        cadency: refAppoCadency.current?.value,
                        period: { startDay: 1, endDay: 1 }
                    },
                    disc: {
                        cadency: refDiscCadency.current?.value,
                        period: { startDay: 1, endDay: 1 }
                    },
                    a360: {
                        cadency: refA360Cadency.current?.value,
                        period: { startDay: 1, endDay: 1 }
                    },
                }
            }
        };
        localStorage.setItem("account", JSON.stringify(account));

        const response = await fetch(`http://localhost:5000/companies`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                companyName: account.company.businessName,
                businessName: account.company.businessName,
                recoverEmail: account.admin.email,
                country: account.company.country,
                password: account.admin.password,
                businessRegister: account.company.businessRegister,
                employees: account.company.employees,
            })
        });
    }

    useEffect(() => {
        setEmployeesData([...colaborators]);
        colaborators.forEach((employee: any, index: number) => {
            newLine(employee.name, employee.uuid, employee.email, employee.password, index);
        });
    }, []);

    const handleEmployeeDataOnChange = (index: number) => {
        const changedEmployee = {
            name: refEmployeeName.current?.value,
            email: refEmployeeEmail.current?.value,
            password: refEmployeePassword.current?.value,
        }
        const newValues = [...employeesData];
        newValues.splice(index, 1, changedEmployee);
        setEmployeesData([...newValues]);
    }

    const generatePassword = () => {
        return Math.random().toString(36).slice(-8);
    }

    const newLine = (name?: string, uuid?: string, email?: string, password?: string, row: number = employees.length) => {
        setEmployees((prevState) => [...prevState, (
            <Row className={Style.entityTableRecord}>
                <Col lg={4}>
                    <input
                        key={`name-${uuid}`}
                        value={name}
                        type="text"
                        className="form-control"
                        onChange={() => handleEmployeeDataOnChange(row)}
                        ref={refEmployeeName}
                        name="name"
                        placeholder="Nome do colaborador" />
                </Col>
                <Col lg={4}>
                    <input
                        key={`mail-${uuid}`}
                        value={email}
                        type="text"
                        className="form-control"
                        onChange={() => handleEmployeeDataOnChange(row)}
                        ref={refEmployeeEmail}
                        name="mail"
                        placeholder="usuario@email.exemplo" />
                </Col>
                <Col lg={4}>
                    <input
                        key={`pass-${uuid}`}
                        disabled
                        value={password || generatePassword()}
                        type="text"
                        className="form-control"
                        onChange={() => handleEmployeeDataOnChange(row)}
                        ref={refEmployeePassword}
                        name="password"
                        placeholder="Senha" />
                </Col>
            </Row>
        )])
    }

    const erase = () => {
        setEmployees([]);
        setEmployeesData([]);
    }

    return (
        <div>
            <Container className={Style.pageSection}>
                <Row>
                    <Col lg={12}>
                        <h3>Cadastro da Empresa</h3>
                    </Col>
                </Row>
                <Row className={Style.register}>
                    <Col lg={12} sm={12} className={Style.fild}>
                        <label htmlFor="businessName">Nome</label>
                        <input
                            className="form-control"
                            type="text"
                            ref={refBusinessName}
                            name="businessName"
                            value={company.businessName}
                            placeholder="Razão social" />
                    </Col>
                </Row>
                <Row className={Style.register}>
                    <Col lg={12} sm={12} className={Style.fild}>
                        <label htmlFor="companyName">Nome fantasia</label>
                        <input
                            className="form-control"
                            type="text"
                            ref={refCompanyName}
                            name="companyName"
                            value={company.companyName}
                            placeholder="Nome fantasia" />
                    </Col>
                </Row>
                <Row className={Style.register}>
                    <Col lg={5} sm={5} className={Style.businessRegister}>
                        <label htmlFor="businessRegister">CNPJ</label>
                        <input
                            className="form-control"
                            type="text"
                            ref={refBusinessRegister}
                            name="businessRegister"
                            value={company.businessRegister}
                            placeholder="12.345.678/0000-00" />
                    </Col>
                    <Col lg={5} sm={5} className={Style.businessRegister}>
                        <label htmlFor="companyCountry">País</label>
                        <input
                            className="form-control"
                            type="text"
                            ref={refCompanyCountry}
                            name="companyCountry"
                            value={company.country}
                            placeholder="Uzuberquistão" />
                    </Col>
                </Row>
                <Row className={Style.register}>
                    <Col lg={5} sm={5} className={Style.fild}>
                        <label htmlFor="email">Email</label>
                        <input
                            className="form-control"
                            type="text"
                            ref={refAdminEmail}
                            name="email"
                            value={admin.email}
                            placeholder="usuario@email.exemplo" />
                    </Col>
                    <Col lg={5} sm={5} className={Style.fild}>
                        <label htmlFor="password">Senha</label>
                        <input
                            className="form-control"
                            disabled
                            type="text"
                            ref={refAdminPassword}
                            value={admin.password || generatePassword()}
                            name="password"></input>
                    </Col>
                </Row>
            </Container>
            <Container className={Style.entityTable}>
                <Row className={Style.pageSectionHeader}>
                    <Col lg={8}>
                        <h3>Cadastro de colaboradores</h3>
                    </Col>
                    <Col lg={2}>
                        <button
                            onClick={() => newLine()}
                            className={Style.btnPrimary}>Adicionar</button>
                    </Col>
                    <Col lg={2}>
                        <button
                            onClick={erase}
                            className={Style.btnPrimary}>Limpar</button>
                    </Col>
                </Row>
                <Row className={Style.entityTableHeader}>
                    <Col lg={4}>
                        <p>Nome</p>
                    </Col>
                    <Col lg={4}>
                        <p>Email</p>
                    </Col>
                    <Col lg={4}>
                        <p>Senha</p>
                    </Col>
                </Row>
                <Row hidden={!(employees.length === 0)} className={Style.entityTableRecord}>
                    <Col lg={12}><p>Nenhum registro de colaborador existente.</p></Col>
                </Row>
                {employees}
            </Container>
            <Container className={Style.pageSection}>
                <Row>
                    <Col><h3>Configuração de cadência e ciclos</h3></Col>
                </Row>
                <label className={Style.sprint}>Avaliação Participativa por Objetivos</label>
                <Sprint
                    defaultOption="3 Meses"
                    value={sprints.appo.cadency}
                    options={["2 Semanas", "2 Meses", "3 Meses", "6 Meses", "1 Ano"]}
                    dateFinish={new Date()}
                />
                <label className={Style.sprint}>Teste psicométrico DISC</label>
                <Sprint
                    defaultOption="6 Meses"
                    value={sprints.disc.cadency}
                    options={["2 Semanas", "2 Meses", "3 Meses", "6 Meses", "1 Ano"]}
                    dateFinish={new Date()} />
                <label className={Style.sprint}>Avaliação de feedback 360</label>
                <Sprint
                    defaultOption="2 Meses"
                    value={sprints.a360.cadency}
                    options={["2 Semanas", "2 Meses", "3 Meses", "6 Meses", "1 Ano"]}
                    dateFinish={new Date()} />
            </Container>
            <Container className={Style.containerButton}>
                <button
                    className={Style.btnPrimary}
                    onClick={createAccount}>
                    Salvar
                </button>
            </Container>
        </div >
    );
}
export default Acount;