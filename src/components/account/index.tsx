import { format } from "date-fns"
import { useEffect, useRef, useState } from "react"
import { Col, Container, Row } from "react-bootstrap"
import { XCircleFill, XSquareFill } from "react-bootstrap-icons"
import { Redirect, Route } from "react-router"
import Style from './account.module.scss'
import Sprint from "./sprint"

type Props = {
  typeRegistration: string;
}

const Account = ({ typeRegistration }: Props) => {

  let loggedUser = JSON.parse(localStorage.getItem("loggedUser") || '{}');

  const [employees, setEmployees] = useState<any[]>([]);
  const [employeesData, setEmployeesData] = useState<any[]>([]);
  const [employeesRemove, setEmployeesRemove] = useState<any[]>([]);
  const [company, setCompany] = useState<any>({});
  const [businessName, setBusinessName] = useState<string>();
  const [companyName, setCompanyName] = useState<string>();
  const [businessRegister, setBusinessRegister] = useState<string>();
  const [companyCountry, setCompanyCountry] = useState<string>();
  const [adminEmail, setAdminEmail] = useState<string>();
  const [adminPassword, setAdminPassword] = useState<string>();
  const [periodStart, setPeriodStart] = useState<Date>(new Date());
  const [periodEnd, setPeriodEnd] = useState<Date>(new Date());
  const [accountRedirection, setAccountRedirection] = useState<string>('/signin');
  const [errorMessage, setErrorMessage] = useState<any>();

  const refEmployeeName = useRef<HTMLInputElement>(null);
  const refEmployeeEmail = useRef<HTMLInputElement>(null);
  const refEmployeePassword = useRef<HTMLInputElement>(null);

  useEffect(() => {
    (async () => {
      const response = await fetch(`http://localhost:5000/companies/${loggedUser.company}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      const companyData: any = await response.json();
      if (loggedUser?.email) {
        setCompany(await companyData);
        setBusinessName(await companyData.businessName);
        setCompanyName(await companyData.companyName);
        setBusinessRegister(await companyData.businessRegister);
        setCompanyCountry(await companyData.country);
        setAdminEmail(await companyData.recoverEmail);
        setAdminPassword(await companyData.password);
        setEmployeesData(await companyData.employees);
      }
    })();
  }, []);

  useEffect(() => {
    setEmployees([]);
    if (employeesData.length > 0) {
      employeesData.forEach((employee: any, index: number) => {
        newLine(employee.name, employee.uuid, employee.email, employee.password, index);
      });
    }
  }, [employeesData]);

  const createAccount = async () => {
    const localStorageCycle: any[] = JSON.parse(localStorage.getItem('cycle') || '{}');
    let data: any = {
      id: company.id,
      businessName: businessName,
      companyName: companyName,
      country: companyCountry,
      recoverEmail: adminEmail,
      password: adminPassword,
      businessRegister: businessRegister,
    };

    const complementaryData = (typeRegistration === "simple") ? {
      employees: [
        {
          name: companyName,
          password: adminPassword,
          email: adminEmail,
          photo: "imagem",
          role: "admin"
        }
      ],
    } : {
      employees: employeesData.map((employee, index) => {
        return {
          id: employee.id,
          name: employee.name,
          photo: employee.photo,
          email: employee.email,
          password: employee.password,
          role: "user"
        }
      }),
      cycles: localStorageCycle.map((cycle) => {
        return {
          typeAssessment: cycle.assessment,
          cadency: cycle.cadency,
          periodStart: periodStart,
          periodEnd: periodEnd
        }
      }),
    };

    const cadasterResponse = await fetch(`http://localhost:5000/companies`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, ...complementaryData }),
    });

    if (typeRegistration === "simple") {
      if (cadasterResponse.ok) {
        const userCadaster = await cadasterResponse.json();
        const userResponse = await fetch(`http://localhost:5000/auth`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: userCadaster.recoverEmail,
            password: userCadaster.password,
          }),
        });
        const user = await userResponse.json();
        localStorage.setItem("loggedUser", JSON.stringify(user));
        setAccountRedirection('/app/home');
      } else {
        setErrorMessage({ title: cadasterResponse.status, message: cadasterResponse.statusText });
        setAccountRedirection('/signin');
      }
    }
    alert("A conta foi salva com sucesso !!!");
  }

  const showErrorMessage = () => {
    return errorMessage
      ? (<div className={Style.error}>
        <div className={Style.messageHeader}>
          <XSquareFill className={Style.closeIcon} onClick={(e: any) => e.target.parentNode.parentNode.style = 'display: none'} />
        </div>
        <h3>{errorMessage.title}</h3>
        <p>{errorMessage.message}</p>
      </div>)
      : (<></>)
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
    const password = Math.random().toString(36).slice(-8)
    setAdminPassword(password);
    return password;
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
        <Col lg={3}>
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
        <Col lg={1} className={Style.colCircleX}>
          <XCircleFill onClick={() => removeEmployee(row)} className={`${Style.entityTableRecordAction} ${Style.removeEntityButton}`} size={25} />
        </Col>
      </Row>
    )])
  }

  const removeEmployee = (index: number) => {
    const employee = employeesData.splice(index, 1);
    setEmployeesData([...employeesData]);
    setEmployeesRemove([...employeesRemove, employee]);
    fetch(`http://localhost:5000/employees/${employee[0].id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const erase = () => {
    setEmployees([]);
    setEmployeesData([]);
  }

  const showSectionCompany = () => {
    return (
      <Container data-type-registration={typeRegistration} className={Style.pageSection}>
        <Row>
          <Col lg={12}>
            <h3>Empresa</h3>
          </Col>
        </Row>
        <Row className={Style.register}>
          <Col lg={12} sm={12} className={Style.fieldRegister}>
            <label htmlFor="businessName">Nome</label>
            <input
              className="form-control"
              type="text"
              onChange={(event: any) => setBusinessName(event?.target.value)}
              value={businessName}
              name="businessName"
              placeholder="Razão social" />
          </Col>
        </Row>
        <Row className={Style.register}>
          <Col lg={12} sm={12} className={Style.fieldRegister}>
            <label htmlFor="companyName">Nome fantasia</label>
            <input
              className="form-control"
              type="text"
              name="companyName"
              value={companyName}
              onChange={(event: any) => setCompanyName(event?.target.value)}
              placeholder="Nome fantasia" />
          </Col>
        </Row>
        <Row className={Style.register}>
          <Col lg={6} sm={6} className={Style.fieldRegister}>
            <label htmlFor="businessRegister">CNPJ</label>
            <input
              className="form-control"
              type="text"
              name="businessRegister"
              onChange={(event: any) => setBusinessRegister(event?.target.value)}
              value={businessRegister}
              placeholder="12.345.678/0000-00" />
          </Col>
          <Col lg={6} sm={6} className={Style.fieldRegister}>
            <label htmlFor="companyCountry">País</label>
            <input
              className="form-control"
              type="text"
              onChange={(event: any) => setCompanyCountry(event?.target.value)}
              value={companyCountry}
              name="companyCountry"
              placeholder="Uzuberquistão" />
          </Col>
        </Row>
        <Row className={Style.register}>
          <Col lg={6} sm={6} className={Style.fieldRegister}>
            <label htmlFor="email">Email</label>
            <input
              className="form-control"
              type="text"
              onChange={(event: any) => setAdminEmail(event?.target.value)}
              name="email"
              value={adminEmail}
              placeholder="usuario@email.exemplo" />
          </Col>
          <Col lg={6} sm={6} className={Style.fieldRegister}>
            <label htmlFor="password">Senha</label>
            <input
              className="form-control"
              disabled
              type="text"
              onChange={(event: any) => setAdminPassword(event?.target.value)}
              value={adminPassword || generatePassword()}
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
  const showSectionCycle = () => {
    return (
      <div>
        <h3>Configuração de cadência e ciclos</h3>
        <div className={Style.period}>
          <div className={Style.periodInfo}>
            <label htmlFor="start">Inicio</label>
            <input
              className="form-control"
              type="date"
              //value={format(periodStart, 'yyyy-MM-dd')}
              onChange={(event: any) => setPeriodStart(new Date(event?.target.value))}
              name="start"
              min="1"
              max="31" />
          </div>
          <div className={Style.periodInfo}>
            <label htmlFor="end">Término</label>
            <input
              className="form-control"
              type="date"
              //value={format(periodEnd, 'yyyy-MM-dd')}
              onChange={(event: any) => setPeriodEnd(new Date(event?.target.value))}
              name="dateFinish" />
          </div>
        </div>
        <div className={Style.sprint}>
          <h3>Avaliação Participativa por Objetivos</h3>
          <Sprint
            typeAssessment="APPO"
            defaultOption="3 Meses"
            value={'sprints.appo.cadency'}
            options={["2 Semanas", "2 Meses", "3 Meses", "6 Meses", "1 Ano"]}
            dateFinish={new Date()}
          />
        </div>
        <div className={Style.sprint}>
          <h3>Teste psicométrico DISC</h3>
          <Sprint
            typeAssessment="DISC"
            defaultOption="6 Meses"
            value={'sprints.disc.cadency'}
            options={["2 Semanas", "2 Meses", "3 Meses", "6 Meses", "1 Ano"]}
            dateFinish={new Date()} />
        </div>
        <div className={Style.sprint}>
          <h3>Avaliação de feedback 360</h3>
          <Sprint
            typeAssessment="AF360"
            defaultOption="2 Meses"
            value={'sprints.a360.cadency'}
            options={["2 Semanas", "2 Meses", "3 Meses", "6 Meses", "1 Ano"]}
            dateFinish={new Date()} />
        </div>
      </div>
    )
  }
  const showRegistration = () => {
    switch (typeRegistration) {
      case "complete":
        return (<>
          {showSectionCompany()}
          {showSectionColaborators()}
          {showSectionCycle()}
          <div className={Style.sectionButton}>
            <button
              data-typeRegistration={typeRegistration}
              className={Style.btnPrimary}
              onClick={createAccount}>
              Salvar
            </button>
          </div>
        </>);
      case "simple":
        return (<>
          {showSectionCompany()}
          <button
            data-typeRegistration={typeRegistration}
            className={Style.btnPrimary}
            onClick={createAccount}>
            Criar conta
          </button>
          <Redirect to={accountRedirection} />
        </>);
    }
  }

  return (
    <Container>
      {showErrorMessage()}
      {showRegistration()}
    </Container>
  );
}
export default Account;