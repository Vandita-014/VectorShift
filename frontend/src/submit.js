// submit.js

import { useStore } from './store';
import { shallow } from 'zustand/shallow';

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
});

export const SubmitButton = () => {
    const { nodes, edges } = useStore(selector, shallow);

    const handleSubmit = async () => {
      try {
        const response = await fetch('http://localhost:8000/pipelines/parse', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            nodes: nodes,
            edges: edges,
          }),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        
        // Display alert with the response
        alert(
          `Pipeline Analysis Results:\n\n` +
          `Number of Nodes: ${data.num_nodes}\n` +
          `Number of Edges: ${data.num_edges}\n` +
          `Is DAG: ${data.is_dag ? 'Yes ✓' : 'No ✗'}`
        );
      } catch (error) {
        console.error('Error submitting pipeline:', error);
        alert('Error submitting pipeline. Please make sure the backend is running on http://localhost:8000');
      }
    };

    return (
        <div style={{
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          padding: '24px',
          background: '#ffffff',
          borderTop: '2px solid #e2e8f0',
          boxShadow: '0 -4px 6px -1px rgba(0, 0, 0, 0.05)'
        }}>
            <button 
              type="button"
              onClick={handleSubmit}
              style={{
                padding: '14px 40px',
                fontSize: '16px',
                fontWeight: '700',
                color: '#fff',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                border: 'none',
                borderRadius: '10px',
                cursor: 'pointer',
                boxShadow: '0 4px 6px -1px rgba(102, 126, 234, 0.4), 0 2px 4px -1px rgba(102, 126, 234, 0.3)',
                transition: 'all 0.2s ease',
                letterSpacing: '0.5px'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 10px 15px -3px rgba(102, 126, 234, 0.5), 0 4px 6px -2px rgba(102, 126, 234, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 6px -1px rgba(102, 126, 234, 0.4), 0 2px 4px -1px rgba(102, 126, 234, 0.3)';
              }}
            >
              Submit Pipeline
            </button>
        </div>
    );
}
