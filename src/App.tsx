import { Route, Switch } from 'react-router-dom';
import DataAccount from './assets/account.json';
import DataAssessements from './assets/assessements.json';
import Login from './components/acount/login/login';
import Navigation from './components/navigation';
import Assessement360Page from './pages/a360.page';
import APPOPage from './pages/appo.page';
import DISCPage from './pages/disc.page';
import Survey360 from './components/a360/survey/index';
import AccountPage from './pages/acount.page';
import Base from './pages/base.page';

function App() {
  const user = {
    uuid: "8f3280b2-618d-4cad-b524-1c831119a535",
    name: "Dougras",
    email: "dougra@mail",
    id: 29,
    avatar: "https://randomuser.me/api/portraits/men/59.jpg",
    companyId: 8
  };

  localStorage.setItem("loggedUser", JSON.stringify(user));
  localStorage.setItem("account", JSON.stringify(DataAccount));
  localStorage.setItem("assessements", JSON.stringify(DataAssessements));

  return (
    <div className="App">
      <Switch>
        <Route path="/signIn" render={(props) => (
          <Login />
        )} />
        <Route path="/app" render={(props) => (
          <Base />
        )} />
      </Switch>
    </div>
  );
}

export default App;
