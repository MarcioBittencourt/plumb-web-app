import Navigation from './components/navigation/navigation';
import React from 'react';
import Assessement360Page from './components/360/assessement360.page';
import DISCPage from './components/disc/DISC.page';
import { Route, Switch } from 'react-router-dom';
import APPOPage from './components/appo/APPO.page';
import Nav from './components/navigation/navigation';

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
