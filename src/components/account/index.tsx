import { useEffect, useRef, useState } from "react"
import { Col, Container, Row } from "react-bootstrap"
import Style from './account.module.scss'
import Sprint from "./sprint"

type Props = {
    typeRegistration: string;
}

const Account = ({ typeRegistration }: Props) => {

    const loggedUser = JSON.parse(localStorage.getItem("loggedUser") || '{}');

    const [employees, setEmployees] = useState<any[]>([]);
    const [employeesData, setEmployeesData] = useState<any[]>([]);
    const [company, setCompany] = useState<any>({});
    const [account, setAccount] = useState<any>({})
    const [colaborators, setColaborators] = useState<any[]>([]);

    //const admin = account.admin;
    const admin = loggedUser;
    //setCompany(account.company.employees);
    //const company = account.company;
    //const colaborators = company.employees;
    //const sprints = account.company.sprints;

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

    useEffect(() => {
        (async () => {
            const response = await fetch(`http://localhost:5000/companies/${loggedUser.company}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });
            const companyData: any = await response.json();
            setColaborators(await companyData.employees);
            setCompany(await companyData);
        })();
    }, []);

    useEffect(() => {
        setEmployeesData([...colaborators]);
        colaborators.forEach((employee: any, index: number) => {
            newLine(employee.name, employee.uuid, employee.email, employee.password, index);
        });
    }, [colaborators]);

    const createAccount = async () => {
        if (loggedUser.company === company.id) {
            await fetch(`http://localhost:5000/companies`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    businessName: refBusinessName.current?.value,
                    companyName: refCompanyName.current?.value,
                    country: refCompanyCountry.current?.value,
                    recoverEmail: refAdminEmail.current?.value,
                    password: refAdminPassword.current?.value,
                    businessRegister: refBusinessRegister.current?.value,
                    employees: employeesData.map((employee, index) => {
                        return { name: employee.name, photo: employee.photo, email: employee.email, password: employee.password, role: "user" }
                    }),
                })
            });
        } else {
            await fetch(`http://localhost:5000/companies`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    businessName: refBusinessName.current?.value,
                    companyName: refCompanyName.current?.value,
                    country: refCompanyCountry.current?.value,
                    recoverEmail: refAdminEmail.current?.value,
                    password: refAdminPassword.current?.value,
                    businessRegister: refBusinessRegister.current?.value,
                    employees: employeesData.map((employee, index) => {
                        return { name: employee.name, photo: employee.photo, email: employee.email, password: employee.password, role: "user" }
                    }),
                })
            });
        }
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

    const showSectionCompany = () => {
        console.log("show section company");
        return (
            <Container className={Style.pageSection}>
                <Row>
                    <Col lg={12}>
                        <h3>Empresa</h3>
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
                    <Col lg={6} sm={6} className={Style.businessRegister}>
                        <label htmlFor="businessRegister">CNPJ</label>
                        <input
                            className="form-control"
                            type="text"
                            ref={refBusinessRegister}
                            name="businessRegister"
                            value={company.businessRegister}
                            placeholder="12.345.678/0000-00" />
                    </Col>
                    <Col lg={6} sm={6} className={Style.businessRegister}>
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
                    <Col lg={6} sm={6} className={Style.fild}>
                        <label htmlFor="email">Email</label>
                        <input
                            className="form-control"
                            type="text"
                            ref={refAdminEmail}
                            name="email"
                            value={admin.email}
                            placeholder="usuario@email.exemplo" />
                    </Col>
                    <Col lg={6} sm={6} className={Style.fild}>
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
        )
    }
    const showSectionColaborators = () => {
        return (
            <Container className={Style.pageSectionForDashboard}>
                <Row className={Style.pageSectionHeader}>
                    <Col lg={8}>
                        <h3>Colaboradores</h3>
                    </Col>
                    <Col lg={4} className={Style.btnsColumn}>
                        <div>
                            <button
                                onClick={() => newLine()}
                                className={Style.btnPrimary}>Adicionar
                            </button>
                            <button
                                onClick={erase}
                                className={Style.btnPrimary}>Limpar
                            </button>
                        </div>
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
        )
    }
    const showSectionCicle = () => {
        {/* <Container className={Style.pageSection}>
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
            </Container> */}
    }
    const showRegistration = () => {
        switch (typeRegistration) {
            case "complete":
                return (<>
                {showSectionCompany()};
                {showSectionColaborators()};
                {showSectionCicle()};
                </>);
            case "simple":
                return showSectionCompany();
        }
    }

    return (
        <Container>
            {showRegistration()}
            <Container className={Style.containerButton}>
                <button
                    className={Style.btnPrimary}
                    onClick={createAccount}>
                    Salvar
                </button>
            </Container>
        </Container>
    );
}
export default Account;