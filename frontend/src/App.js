import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>VectorShift Pipeline Builder</h1>
        <p className="app-subtitle">Build and analyze your data pipelines</p>
      </header>
      <PipelineToolbar />
      <div className="app-content">
        <PipelineUI />
      </div>
      <SubmitButton />
    </div>
  );
}

export default App;
