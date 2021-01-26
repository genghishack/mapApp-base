import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import ResourceView from './components/views/ResourceView';
import AboutView from './components/views/AboutView';
import EnterInfoView from './components/views/EnterInfoView';

import './App.scss';

interface IAppProps {
}

const App = (props: IAppProps) => {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/about" component={AboutView} />
          <Route path="/enter-info" component={EnterInfoView} />
          <Route path="/" component={ResourceView} />
        </Switch>
      </Router>
    </div>
  )
}

export default App;
