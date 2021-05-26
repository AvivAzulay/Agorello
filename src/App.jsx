import { HashRouter as Router, Route } from 'react-router-dom'

import './App.css'
import { routes } from './routes.js'
import { Header } from './cmps/Header.jsx'
import { BoradNav } from './cmps/BoradNav.jsx'

function App() {
  return (
    <Router>
      <Header />
      <BoradNav/>
      <main>
        {routes.map(route => <Route key={route.path} exact component={route.component} path={route.path} />)}
      </main>
    </Router>
  );
}

export default App;

// <Route path='/cars' component={CarApp} />
//       <Route path='/' exact component={Home} />