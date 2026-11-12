import Login from './components/Login'
import Dashboard from './components/Dashboard'
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/dashboard.css';

const App = ()  => {



  return (
   <>
    { logueado ?  <Dashboard></Dashboard> : <Login></Login> }
   </>
  )
}

export default App
