import { useRef, useState } from "react"
import { Col, Container, Row } from "react-bootstrap"
import Style from './acount.module.scss'
import Sprint from "./sprint"

type Props = {
}

const Acount = (props: Props) => {
    const refBusinessName = useRef<HTMLInputElement>(null);
    const refCompanyName = useRef<HTMLInputElement>(null);
    const refBusinessRegister = useRef<HTMLInputElement>(null);
    const refAdminName = useRef<HTMLInputElement>(null);
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

    const createAccount = () => {
        console.log(refBusinessName.current?.value)
        const account: any = {
            admin: {
                name: refAdminName.current?.value,
                email: refAdminEmail.current?.value,
                password: refAdminPassword.current?.value,
            },
            company: {
                businessName: refBusinessName.current?.value,
                companyName: refCompanyName.current?.value,
                businessRegister: refBusinessRegister.current?.value,
                employees: employeesData.map((employee, index) => { 
                    return { name: employee.name, email: employee.email, password: employee.password }
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
        }
        localStorage.setItem("Account", JSON.stringify(account));
    }

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

    const newLine = () => {
        const index = employees.length;
        setEmployees([...employees, (
            <Row className={Style.employeeTableRecord}>
                <Col><input type="text" onChange={() => handleEmployeeDataOnChange(index)} ref={refEmployeeName} name="name" placeholder="Nome do colaborador"></input></Col>
                <Col><input type="text" onChange={() => handleEmployeeDataOnChange(index)} ref={refEmployeeEmail} name="mail" placeholder="usuario@email.exemplo"></input></Col>
                <Col><input type="text" onChange={() => handleEmployeeDataOnChange(index)} ref={refEmployeePassword} disabled value={generatePassword()} name="password" placeholder="Senha"></input></Col>
            </Row>
        )])
    }

    const erase = () => {
        setEmployees([]);
        setEmployeesData([]);
    }

    return (
        <div>
            <Container className={Style.sectionContent}>
                <Row>
                    <Col><h3>Cadastro de Empresa</h3></Col>
                </Row>
                <Row className={Style.register}>
                    <Col lg={4} sm={4} className={Style.primary}>
                        <label htmlFor="businesName">Nome</label>
                        <input type="text" ref={refBusinessName} name="businesName" placeholder="Razão social" />
                    </Col>
                    <Col lg={4} sm={4} className={Style.primary}>
                        <label htmlFor="companyName">Nome fantasia</label>
                        <input type="text" ref={refCompanyName} name="companyName" placeholder="Nome fantasia" />
                    </Col>
                    <Col lg={4} sm={4} className={Style.businessRegister}>
                        <label htmlFor="businessRegister">CNPJ</label>
                        <input type="text" ref={refBusinessRegister} name="businessRegister" placeholder="12.345.678/0000-00" />
                    </Col>
                </Row>
                <Row className={Style.register}>
                    <Col lg={4} sm={4} className={Style.primary}>
                        <label htmlFor="email">Email</label>
                        <input type="text" ref={refAdminEmail} name="email" placeholder="usuario@email.exemplo"/>
                    </Col>
                    <Col lg={4} sm={4} className={Style.primary}>
                        <label htmlFor="password">Senha</label>
                        <input disabled type="text" ref={refAdminPassword} value={generatePassword()} name="password"></input>
                    </Col>
                </Row>
            </Container>
            <Container>
                <Row className={Style.sectionHeader}>
                    <Col>
                        <h3>Cadastro de colaboradores</h3>
                        <button onClick={newLine} className={Style.newUserButton}>Adicionar</button>
                        <button onClick={erase} className={Style.newUserButton}>Limpar</button>
                    </Col>
                </Row>
                <Row className={Style.employeeTableHeader}>
                    <Col>Nome</Col>
                    <Col>Email</Col>
                    <Col>Senha</Col>
                </Row>
                <Row className={Style.sectionTable}>
                    <Col>
                        <Row hidden={!(employees.length === 0)} className={Style.employeeTableRecord}>
                            <Col><p>Nenhum registro de colaborador existente.</p></Col>
                        </Row>
                        {employees}
                    </Col>
                </Row>
            </Container>
            <Container className={Style.sectionContent}>
                <Row >
                    <Col><h3>Configuração de cadência e ciclos</h3></Col>
                </Row>
                <label className={Style.sprint}>Avaliação Participativa por Objetivos</label>
                <Sprint defaultOption="3 Meses" options={["2 Semanas", "2 Meses", "3 Meses", "6 Meses", "1 Ano"]} />
                <label className={Style.sprint}>Teste psicométrico DISC</label>
                <Sprint defaultOption="6 Meses" options={["2 Semanas", "2 Meses", "3 Meses", "6 Meses", "1 Ano"]} />
                <label className={Style.sprint}>Avaliação de feedback 360</label>
                <Sprint defaultOption="2 Meses" options={["2 Semanas", "2 Meses", "3 Meses", "6 Meses", "1 Ano"]} />
            </Container>
            <Container className={Style.containerButton}>
                <button className={Style.saveButton} onClick={createAccount}>Salvar</button>
            </Container>
        </div >
    );
}
export default Acount;