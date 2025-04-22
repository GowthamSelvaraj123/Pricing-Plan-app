import './App.css';
import { PlanProvider } from './PlansContext';
import Tab from './page/Tab';

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <PlanProvider>
          <Tab></Tab>
        </PlanProvider>
      </header>
      test
    </div>
  );
}

export default App;
