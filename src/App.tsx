import Navigation from './components/navigation';
import Assessement360Page from './pages/a360.page';
import DISCPage from './pages/disc.page';
import { Route, Switch } from 'react-router-dom';
import APPOPage from './components/appo/appo.page';


function App() {
  return (
    <div className="App">
      <header>
        <title>Plumb</title>
        <Navigation />
      </header>
      <main>
        <Switch>
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
