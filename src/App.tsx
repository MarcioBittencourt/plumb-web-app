import Navigation from './components/navigation';
import Assessement360Page from './pages/a360.page';
import DISCPage from './pages/disc.page';
import { Route, Switch } from 'react-router-dom';
import APPOPage from './components/appo/appo.page';
import Acount from './components/acount/index';

function App() {
  const user = {
    uuid: "8f3280b2-618d-4cad-b524-1c831119a535",
    name: "Dougras",
    email: "dougra@mail"
  }
  localStorage.setItem("loggedUser", JSON.stringify(user));
  return (
    <div className="App">
      <header>
        <title>Plumb</title>
        <Navigation />
      </header>
      <main>
        <Switch>
          <Route path="/home" component={Acount} />
          <Route path="/disc" component={DISCPage} />
          <Route path="/360" component={Assessement360Page} />
          <Route path="/appo" component={APPOPage} />
        </Switch>
      </main>
      <footer></footer>
    </div>
  );
}

export default App;
