import { Route, Switch } from 'react-router-dom';
import Signin from './pages/signin.page';
import Base from './pages/base.page';
import Style from './App.module.scss';

function App() {
  return (
    <div className={Style.App}>
      <Switch>
        <Route path="/signIn" render={(props) => (
          <Signin />
        )} />
        <Route path="/app" render={(props) => (
          <Base />
        )} />
      </Switch>
    </div>
  );
}
export default App;