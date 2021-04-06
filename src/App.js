import logo from './logo.svg';
import './App.css';
import Header from './components/Header/Header'
import Shop from './components/Shop/Shop';

function App() {
  return (
    <div className="App">

      <Header></Header>
      <Shop></Shop>




      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
         <code>src/App.js</code> and save to reload.
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
