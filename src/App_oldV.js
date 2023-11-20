import logo from './logo.svg';
import './App.css';

function App() {

  // eslint-disable-next-line no-undef
  const [users, setUsers] = useState([])

  const fetchUserData = () => {
    fetch("https://recruiting.api.bemmbo.com/invoices/pending")
      .then(response => {
        return response.json()
      })
      .then(data => {
        setUsers(data)
      })
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
