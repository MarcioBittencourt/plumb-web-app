import Style from "./goal.module.scss";
import { Col, Container, Row } from "react-bootstrap";
import Smart from './smart/index';
import { PersonCircle, PersonPlusFill, PersonXFill, Search, XCircleFill } from "react-bootstrap-icons";
import { useEffect, useRef, useState } from "react";

type Props = {
  uuid?: string | null;
};

type GoalType = {
  description: string;
  smartGoals: string;
  dateInit: Date;
  dateEnd: Date;
  status: "Rascunho" | "Revisado" | "Concluido";
  manager: string;
  employees: [];
};

const Goal = ({ uuid }: Props) => {
  const loggedUser = JSON.parse(localStorage.getItem("loggedUser") || '{}');
  const cycles: any[] = JSON.parse(localStorage.getItem("cycles") || '{}');
  const cycle = cycles.find((cycle: any) => cycle.typeAssessment == "APPO");


  const [title, setTitle] = useState<string>();
  const [goalDetail, setGoalDetail] = useState<string>();
  const [goalMeasuredDetail, setGoalMeasuredDetail] = useState<string>();
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [taskName, setTaskName] = useState<string>();

  const refTaskName = useRef<HTMLInputElement>(null);
  const refTaskStatus = useRef<HTMLInputElement>(null);

  const refSearchEmployee = useRef<HTMLInputElement>(null);

  const [colaborators, setColaborators] = useState<any[]>([]);
  const [filteredColaborators, setFilteredColaborators] = useState<any[]>([]);
  const [addedColaborators, setAddedColaborators] = useState<any[]>([]);
  const [tasks, setTasks] = useState<any[]>([]);
  const [tasksData, setTasksData] = useState<any[]>([]);
  const [removeTasksData, setRemoveTasksData] = useState<any[]>([]);
  const [goal, setGoal] = useState<any>({});

  useEffect(() => {
    (async () => {
      const url = `http://localhost:5000/employees/company/${loggedUser.company}`;
      const company = await fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      const companyData: any[] = await company.json();
      setColaborators([...companyData]);
      setFilteredColaborators([...companyData]);
      if (uuid != undefined || uuid != null) {
        const goal = await fetch(`http://localhost:5000/goals/${uuid}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
        const goalData: any = await goal.json();
        setGoal(goalData);
        setTitle(goalData.title);
        setGoalDetail(goalData.goalDetail);
        setGoalMeasuredDetail(goalData.goalMeasuredDetail);
        setStartDate(new Date(goalData.startDate));
        setEndDate(new Date(goalData.endDate));
        setAddedColaborators([...goalData.employees]);
        setTasksData([...goalData.tasks]);
      }
    })();
  }, []);

  useEffect(() => {
    setTasks([]);
    tasksData.forEach((task: any, index: number) => newLine(task.name, index));
  }, [tasksData]);

  const saveGoal = async () => {
    const cycle = cycles.find((cycle: any) => cycle.typeAssessment == "APPO");
    const goalsResponse = await fetch(`http://localhost:5000/goals`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: parseInt(uuid || ""),
        title: title,
        goalDetail: goalDetail,
        goalMeasuredDetail: goalMeasuredDetail,
        startDate: startDate,
        endDate: endDate,
        employees: addedColaborators,
        cycle: cycle.id,
        status: "Pendente",
      })
    });
    const goal = await goalsResponse.json();
    tasksData.map(async (task) => {
      await fetch(`http://localhost:5000/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: task.id,
          name: task.name,
          status: "Pendente",
          goal: goal.id,
        })
      })
    });
    alert("O objetivo foi salvo com sucesso !!!");
  }

  const addEmployeeGoal = (colaborator: any, index: number) => {
    setAddedColaborators([...addedColaborators, colaborator]);
    setFilteredColaborators([...colaborators]);
  }

  useEffect(() => {
    (() => {
      addedColaborators.map((colaborator) => {
        filteredColaborators.filter((element, index) => {
          if (colaborator.id === element.id) {
            filteredColaborators.splice(index, 1);
            setFilteredColaborators([...filteredColaborators]);
          }
        });
      });
    })()
  }, [addedColaborators])

  const removeCollaborator = (colaborator: any, index: number) => {


    const removed = addedColaborators.splice(index, 1);
    setAddedColaborators([...addedColaborators]);
    setFilteredColaborators([...filteredColaborators, removed[0]]);
  }

  const handleTaskDataOnChange = (index: number) => {
    const changedTask = {
      name: refTaskName.current?.value,
      status: refTaskStatus.current?.value,
    }
    tasksData.splice(index, 1, changedTask);
  }

  const removeTask = (index: number) => {
    const removedTask = tasksData.splice(index, 1);
    setTasksData([...tasksData]);
    removedTask.map((task) => {
      setRemoveTasksData([...removeTasksData, task]);
    })
    tasks.splice(index, 1);
    setTasks([...tasks]);

    fetch(`http://localhost:5000/tasks/${removedTask[0].id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const newLine = (name?: string, row: number = tasks.length) => {
    setTasks((prevState) => [...prevState, (
      <Row className={Style.entityTableRecord}>
        <Col lg={1}>
          <p># {row + 1}</p>
        </Col>
        <Col lg={11}>
          <input className={`${Style.taskTitle} form-control`}
            ref={refTaskName}
            value={name}
            placeholder="Nome da tarefa"
            onChange={() => handleTaskDataOnChange(row)} />
          <XCircleFill onClick={() => removeTask(row)} className={`${Style.entityTableRecordAction} ${Style.removeEntityButton}`} size={25} />
        </Col>
      </Row>
    )])
  }

  return (
    <>
      <Container className={Style.pageSectionForDashboard}>
        <Row className={Style.pageSectionHeader}>
          <Col className={Style.goalTitle} lg={8}>
            <input
              type="text"
              placeholder="Insira o titulo do objetivo aqui!"
              onChange={(event: any) => setTitle(event?.target.value)}
              value={title} />
          </Col>
          <Col hidden lg={3}>
            <Smart smarts={["Especifico", "Mensuravel", "Alcançavel", "Realista", "Temporal"]} />
          </Col>
        </Row>
        <Row className={Style.goalSectionContent}>
          <Col lg={7}>
            <Row className={Style.rowDetailsGoal}>
              <textarea
                className="form-control"
                placeholder="Descreva de forma detalhada seu objetivo..."
                onChange={(event: any) => setGoalDetail(event?.target.value)}
                value={goalDetail}
                id="description">
              </textarea>
            </Row>
            <Row className={Style.rowDetailsGoal}>
              <textarea
                className="form-control"
                placeholder="Descreva como o objetivo será mensurado..."
                value={goalMeasuredDetail}
                onChange={(event: any) => setGoalMeasuredDetail(event?.target.value)}
                id="description">
              </textarea>
            </Row>
          </Col>
          <Col lg={5}>
            <Row className={Style.goalDates} >
              <Col lg={6}>
                <label>Inicio:</label>
                <input
                  type="date"
                  className="form-control"
                  value={startDate?.toISOString().split('T')[0]}
                  onChange={(event: any) => setStartDate(new Date(event?.target.value))}
                />
                <p></p>
              </Col>
              <Col lg={6}>
                <label>Fim:</label>
                <input
                  type="date"
                  className="form-control"
                  value={endDate?.toISOString().split('T')[0]}
                  onChange={(event: any) => setEndDate(new Date(event?.target.value))} />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>

      <Container className={Style.pageSectionForDashboard}>
        <Row className={Style.pageSectionHeader}>
          <h4>Colaboradores</h4>
        </Row>
        <Row>
          <Col lg={6} className={Style.employeesCol}>
            <div className={Style.searchEmployee}>
              <input
                id="employeesInput"
                list="employees"
                ref={refSearchEmployee}
                className="form-control"
                type="text"
                placeholder="Pesquisar"
                aria-label="Search"
                onKeyUp={() => {
                  const value = refSearchEmployee.current?.value;
                  setFilteredColaborators(
                    colaborators.filter(
                      colaborator => colaborator.name.toLowerCase().includes(value?.toLowerCase())
                    ));
                }} />
              <Search className={Style.iconSearch} />
            </div>
            <div className={Style.searchCollaboratorsList}>
              <ul id="employees" className={Style.listSearchEmployee}>
                {filteredColaborators.filter(colaborator => !addedColaborators.includes(colaborator)).map((colaborator, index) => {
                  return (
                    <li value={colaborator.name} className={Style.searchOption}
                      onClick={() => addEmployeeGoal(colaborator, index)}>
                      <PersonCircle className={Style.avatar} />
                      <p>{colaborator.name}</p>
                      <PersonPlusFill className={Style.iconPersonV} />
                    </li>
                  )
                })}
              </ul>
            </div>
          </Col>
          <Col lg={6} className={Style.employeesCol}>
            <h5 className={Style.addedColaborators}>Colaboradores envolvidos</h5>
            <div className={Style.searchCollaboratorsList}>
              <ul id="employees" className={Style.listSearchEmployee}>
                {addedColaborators.map((colaborator, index) => {
                  return (
                    <li value={colaborator.name} className={Style.searchOption}>
                      <PersonCircle className={Style.avatar} />
                      <p>{colaborator.name}</p>
                      <PersonXFill onClick={() => { removeCollaborator(colaborator, index) }} className={Style.iconPersonX} />
                    </li>
                  )
                })}
              </ul>
            </div>
          </Col>
        </Row>
      </Container>
      <Container className={Style.pageSectionForDashboard}>
        <Row className={Style.pageSectionHeader}>
          <Col lg={10}>
            <h4>Tarefas</h4>
          </Col>
          <Col lg={2}>
            <button
              className={Style.btnPrimary}
              type="button"
              onClick={() => newLine()}>
              Adicionar
            </button>
          </Col>
        </Row>
        <Row className={Style.entityTableHeader}>
          <Col lg={1}>
            <p>ID</p>
          </Col>
          <Col lg={11}>
            <p>Nome</p>
          </Col>
        </Row>
        {tasks}
        <Row className={Style.entityTableRecord}>
          <Col hidden={tasks.length >= 1} className={Style.assessementTableHidden}>
            <p>Nenhuma tarefa adicionada.</p>
          </Col>
        </Row>
      </Container>

      <Container className={Style.sectionBtnSave}>
        <button
          className={Style.btnPrimary}
          type="button"
          onClick={saveGoal}>
          Salvar
        </button>
      </Container>
    </>
  );
}
export default Goal;
