import { Route, Switch } from 'react-router-dom';
import Login from './components/acount/login/login';
import Base from './pages/base.page';

function App() {
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