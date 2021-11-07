import { Route, Switch, useRouteMatch } from "react-router-dom";
import Assessement360Page from "./a360.page";
import APPOPage from "./appo.page";
import DISCPage from "./disc.page";
import AccountPage from './account.page';
import Navigation from "../components/navigation";
import Style from "./base.page.module.scss";
import { HomePage } from "./home/home.page";

type Props = {}

const Base = (props: Props) => {
    let { path, url } = useRouteMatch();

    return (
        <>
            <header>
                <title>Plumb</title>
                <Navigation />
            </header>
            <main className={Style.main}>
                <Route path={`${path}/home`} render={(props) => (
                    <HomePage />
                )} />
                <Route path={`${path}/disc`} render={(props) => (
                    <DISCPage />
                )} />
                <Route path={`${path}/360`} render={(props) => (
                    <Assessement360Page />
                )} />
                <Route path={`${path}/appo`} render={(props) => (
                    <APPOPage />
                )} />
                <Route path={`${path}/account`} render={(props) => (
                    <AccountPage />
                )} />
            </main>
            <footer className={Style.footer}>
                <div>
                </div>
            </footer>
        </>
    )
}

export default Base;