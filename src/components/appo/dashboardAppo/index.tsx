import { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Check2, Check2All, Check2Circle, ChevronCompactLeft, MegaphoneFill } from 'react-bootstrap-icons';
import { Link, Route, Switch, useRouteMatch } from 'react-router-dom';
import Goal from '../goal';
import Style from './dashboardAppo.module.scss'
import Record from './record/index'

type Props = {};

const DashboardAppo = (props: Props) => {
  let { path, url } = useRouteMatch();
  const [goals, setGoals] = useState<any[]>([]);
  const [goalStatus, setGoalStatus] = useState<string>();
  const loggedUser = JSON.parse(localStorage.getItem("loggedUser") || '{}');
  const cycles: any[] = JSON.parse(localStorage.getItem("cycles") || '{}');
  const cycle = cycles.find((cycle: any) => cycle.typeAssessment == "APPO");

  useEffect(() => {
    (async () => {
      const goal = await fetch(`http://localhost:5000/goals/employee/${loggedUser.id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      const goalData: any = await goal.json();
      setGoals([...goalData]);
    })();
  }, [goalStatus]);

  const changeStatus = (id: string) => {
    setGoalStatus("Concluído");
    fetch(`http://localhost:5000/goals`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: id,
        status: "Concluído",
      })
    });
  }

  return (
    <div className={Style.pageDashboard}>
      <Switch>
        <Route exact path={path}>
          <div hidden={goals.length >= 1} className={Style.informNotData}>
            <MegaphoneFill className={Style.noticeIcon} />
            <p>Até o momento não existe nem um objetivo vinculado a esta empresa ou ao seu usúario,
              realize o primeiro planejamento.</p>
          </div>
          <section className={Style.goalsSection}>
            {goals.map((goal) => {
              return (
                <div className={Style.recordSection}>
                  <div className={Style.record}>
                    <Link className={Style.disabledLink} to={`/app/appo/goals/${goal.id}`}>
                      <Record
                        title={goal.title}
                        startDate={goal.startDate}
                        endDate={goal.endDate}
                        tasks={goal.tasks}
                        employees={goal.employees}
                        status={goal.status}
                      />
                    </Link >
                  </div>
                  <Row className={Style.rowBtn}>
                    <Col>
                      <button 
                        data-status={goal.status} 
                        className={Style.statusBtn} 
                        onClick={() => changeStatus(goal.id)}>
                          {
                            goal.status == "Concluído" 
                            ? <Check2All data-status={goal.status} className={Style.iconStatus} />
                            : <Check2 data-status={goal.status} className={Style.iconStatus} />
                          }
                      </button>
                    </Col>
                  </Row>
                </div>
              )
            })}
          </section>
        </Route>
        <Route path={`${path}/goals/new`} render={
          (props) => (<>
            {<Goal />}
          </>)
        }>
        </Route>
        <Route path={`${path}/goals/:id`} render={
          (props) => (<>
            {<Goal uuid={props.match.params.id} />}
          </>)
        }>
        </Route>
      </Switch>
    </div>
  );
}

export default DashboardAppo;