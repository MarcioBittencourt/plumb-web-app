import Style from "./login.module.scss";
import { Col, Container, Row } from "react-bootstrap";
import { useRef } from "react";
import { Route, Switch, useRouteMatch } from "react-router";

type Props = {

}

const Login = (props: Props) => {

    let { path, url } = useRouteMatch();
    const refEmail = useRef<HTMLInputElement>(null);
    const refPassword = useRef<HTMLInputElement>(null);

    const log = async () => {
        const response = await fetch(`http://localhost:5000/auth`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: refEmail.current?.value,
                password: refPassword.current?.value,
            }),
        });
        console.log("resposta", response);
    }

    return (
        <Container className={Style.loginPage}>
            <Switch>
                <Route exact path={path}>
                    <Row>
                        <Col className={Style.title}>
                            <h3>Login</h3>
                        </Col>
                    </Row>
                    <Row lg={12}>
                        <Col lg={12}>
                            <Row className={Style.content}>
                                <label htmlFor="email">Nome</label>
                                <input
                                    className="form-control"
                                    ref={refEmail}
                                    type="text"
                                    name="email"
                                    placeholder="usuario@email.exemplo" />
                            </Row>
                            <Row className={Style.content}>
                                <label htmlFor="password">Senha</label>
                                <input
                                    className="form-control"
                                    ref={refPassword}
                                    type="password"
                                    name="password"
                                    placeholder="*****" />
                            </Row>
                        </Col>
                    </Row>
                    <Row className={Style.button}>
                        <Col lg={6}>
                            <button
                                onClick={log}
                                className={Style.btnPrimary}
                                type="button">
                                Entrar
                            </button>
                        </Col>
                    </Row>
                </Route>
            </Switch>
        </Container>
    );
}
export default Login;