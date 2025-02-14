import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Games from './components/Games';
import Proxies from './components/Proxies';
import TVShows from './components/TVShows';
import More from './components/More';

function App() {
    return (
        <Router>
            <div>
                <h1>Welcome to EntertainmentOne</h1>
                <Switch>
                    <Route path="/games" component={Games} />
                    <Route path="/proxies" component={Proxies} />
                    <Route path="/tvshows" component={TVShows} />
                    <Route path="/more" component={More} />
                    <Route path="/" exact>
                        <h2>Home Page</h2>
                        <p>Explore a variety of entertainment options!</p>
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;