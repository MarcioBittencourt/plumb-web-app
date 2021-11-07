import { Route, Switch } from 'react-router-dom';
import Signin from './pages/signin.page';
import Base from './pages/base.page';
import Style from './App.module.scss';

function App() {
  return (

    <Switch>
      <Route path="/signIn" render={(props) => (
        <Signin />
      )} />
      <Route path="/app" render={(props) => (
        <div className={Style.App}>
          <Base />
        </div>
      )} />
    </Switch>
  );
}
export default App;