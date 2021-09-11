import Navigation from './components/navigation';
import Assessement360Page from './pages/a360.page';
import DISCPage from './pages/disc.page';
import { Route, Switch } from 'react-router-dom';
import APPOPage from './pages/appo.page';
import AccountPage from './pages/acount.page';
import DataAccount  from './assets/account.json';
import DataAssessements from './assets/assessements.json'

function App() {

  const user = {
    uuid: "8f3280b2-618d-4cad-b524-1c831119a535",
    name: "Dougras",
    email: "dougra@mail",
    avatar: "https://randomuser.me/api/portraits/men/59.jpg"
  };

  localStorage.setItem("loggedUser", JSON.stringify(user));
  localStorage.setItem("account", JSON.stringify(DataAccount));
  localStorage.setItem("assessements", JSON.stringify(DataAssessements));

  return (
    <div className="App">
      <header>
        <title>Plumb</title>
        <Navigation />
      </header>
      <main>
        <Switch>
          <Route path="/home" />
          <Route path="/disc" component={DISCPage} />
          <Route path="/360" component={Assessement360Page} />
          <Route path="/appo" component={APPOPage} />
          <Route path="/account" component={AccountPage} />
        </Switch>
      </main>
      <footer></footer>
    </div>
  );
}

export default App;
