import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Main from './components/Main';
import './App.scss';
import RepositoryCard from './components/RepositoryCard/';
import SearchQuery from './components/SearchQuery/';

const App = React.memo(function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact>
          <Main />
        </Route>
        <Route path="/search">
          <SearchQuery />
        </Route>
        <Route path="/repository/:username/:repositoryName">
          <RepositoryCard />
        </Route>
        <Redirect to="/" />
      </Switch>
    </div>
  );
});

export default App;
