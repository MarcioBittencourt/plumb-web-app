import Style from "./login.module.scss";
import { Col, Container, Row } from "react-bootstrap";
import { useRef, useState } from "react";
import { Redirect, Route, Switch, useRouteMatch } from "react-router";
import Account from '../index';
import { Link } from "react-router-dom";

type Props = {}

const Login = (props: Props) => {

    let { path, url } = useRouteMatch();
    const refEmail = useRef<HTMLInputElement>(null);
    const refPassword = useRef<HTMLInputElement>(null);
    const [loggedIn, setLoggedIn] = useState<boolean>(false);
    const [createAccount, setCreateAccount] = useState<boolean>(true);

    const log = async () => {
        const response = await fetch(`http://localhost:5000/auth`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: refEmail.current?.value,
                password: refPassword.current?.value,
            }),
        });
        const user = await response.json();
        const isAuthentic = user !== false;
        localStorage.setItem("loggedUser", JSON.stringify(user));
        setLoggedIn(isAuthentic);
    }

    const showLogin = () => {
        if (createAccount) {
            return (
                <Switch>
                <Route exact path={path}>
                    <Container className={Style.loginPage}>
                        {loggedIn === true
                            ? <Redirect to='/app/home' />
                            : <div className={Style.login}>
                                <Row className={Style.rowSignin}>
                                    <Col className={Style.colSignin}>
                                        <label htmlFor="email">Usuário</label>
                                        <input
                                            className="form-control"
                                            ref={refEmail}
                                            type="text"
                                            name="email"
                                            placeholder="usuario@email.exemplo" />
                                    </Col>
                                    <Col className={Style.colSignin}>
                                        <label htmlFor="password">Senha</label>
                                        <input
                                            className="form-control"
                                            ref={refPassword}
                                            type="password"
                                            name="password"
                                            placeholder="*****" />
                                    </Col>
                                </Row>
                                <Row className={Style.sectionButtons}>
                                    <Col lg={6} className={Style.sectionButton}>
                                        <button
                                            onClick={log}
                                            className={Style.btnPrimary}
                                            type="button">
                                            Entrar
                                        </button>
                                    </Col>
                                    <Col className={Style.createAccount}>
                                        <a href="#" onClick={() =>setCreateAccount(false)}>
                                            Criar conta
                                        </a>
                                    </Col>
                                </Row>
                            </div>}
                    </Container>
                </Route>
            </Switch>
            )
        }
    }

    const showAccount = () => {
        if(!createAccount) {
            return(
                <>
                    <Account typeRegistration={"simple"}/>
                </>
            )
        }
    }

    return (
        <>
            {showLogin()}
            {showAccount()}
        </>
    );
}
export default Login;