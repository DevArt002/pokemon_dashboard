import { DashboardPage, ErrorPage } from 'src/pages';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { PokemonDetailsPage } from './pages/PokemonDetailsPage';

function Routing() {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <Switch>
        <Route exact path={['/']}>
          <DashboardPage />
        </Route>
        <Route path="/pokemon/:number">
          <PokemonDetailsPage />
        </Route>
        <Route>
          <ErrorPage error={{ message: '404', name: '' }} resetErrorBoundary={() => {}} />
        </Route>
      </Switch>
    </Router>
  );
}

export default Routing;
