import { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link, Route, Switch, useRouteMatch } from 'react-router-dom';
import Goal from '../goal';
import Style from './dashboardAppo.module.scss'
import Record from './record/index'

type Props = {};

const DashboardAppo = (props: Props) => {
    let { path, url } = useRouteMatch();
    const [goals, setGoals] = useState<any[]>([]);
    const loggedUser = JSON.parse(localStorage.getItem("loggedUser") || '{}');
    useEffect(() => {
        (async () => {
            const goal = await fetch(`http://localhost:5000/goals/employee/${loggedUser.id}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });
            const goalData: any = await goal.json();
            setGoals([...goalData]);
        })();
    }, []);

    return (
        <div className={Style.pageDashboard}>
            <Switch>
                <Route exact path={path}>
                    <section className={Style.goalsSection}>
                        {goals.map((goal) => {
                            return (
                                <Link className={Style.disabledLink} to={`/app/appo/goals/${goal.id}`}>
                                    <Record 
                                        title={goal.title}
                                        startDate={goal.startDate}
                                        endDate={goal.endDate}
                                        tasks={goal.tasks}
                                        employees={goal.employees}
                                    />
                                </Link >
                            )
                        })}
                    </section>
                </Route>
                <Route path={`${path}/goals/:id`} render={
                    (props) => (<Goal uuid={props.match.params.id} />)
                }>
                </Route>
            </Switch>
        </div>
    );
}

export default DashboardAppo;