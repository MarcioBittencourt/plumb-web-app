import Style from './appo.page.module.scss';
import { Col, Container, Row } from 'react-bootstrap';
import DashboardAppo from '../components/appo/dashboardAppo';
import { Route, Switch, useRouteMatch } from 'react-router';
import { Link } from 'react-router-dom';
import Goal from '../components/appo/goal';
import { useState } from 'react';
import { ChevronCompactLeft, ChevronCompactRight } from 'react-bootstrap-icons';
type Props = {}

const APPOPage = (props: Props) => {
    let { path, url } = useRouteMatch();
    return (
        <Container className={Style.page}>
            <Row className={Style.pageHeader}>
                <Col className={Style.sectionTitle}>
                    <h3 className={Style.pageTitle}>Objetivos</h3>
                </Col>
                <Route exact path={path}>
                    <Col className={Style.btnPlan}>
                        <Link className={Style.btnPrimary} to={`/app/appo/goals/new`}>
                            Planejar
                        </Link>
                    </Col>
                </Route>
            </Row>
            <Row>
                <DashboardAppo />
            </Row>
        </Container >
    );
}
export default APPOPage;