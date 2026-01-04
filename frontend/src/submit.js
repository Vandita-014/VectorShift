// submit.js

import { useState } from 'react';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import './submit.css';

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  clearCanvas: state.clearCanvas,
});

export const SubmitButton = () => {
    const { nodes, edges, clearCanvas } = useStore(selector, shallow);
    const [results, setResults] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async () => {
      setIsLoading(true);
      setError(null);
      setResults(null);
      
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
        setResults(data);
      } catch (error) {
        console.error('Error submitting pipeline:', error);
        setError('Error submitting pipeline. Please make sure the backend is running on http://localhost:8000');
      } finally {
        setIsLoading(false);
      }
    };

    const closeModal = () => {
      setResults(null);
      setError(null);
    };

    const handleClearCanvas = () => {
      if (window.confirm('Are you sure you want to clear the canvas? This will remove all nodes and edges.')) {
        clearCanvas();
        setResults(null);
        setError(null);
      }
    };

    const hasNodesOrEdges = nodes.length > 0 || edges.length > 0;

    return (
        <>
        <div style={{
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          gap: '16px',
          padding: '24px',
          background: '#ffffff',
          borderTop: '2px solid #e2e8f0',
          boxShadow: '0 -4px 6px -1px rgba(0, 0, 0, 0.05)'
        }}>
            <button 
              type="button"
              onClick={handleClearCanvas}
              disabled={!hasNodesOrEdges}
              style={{
                padding: '14px 32px',
                fontSize: '16px',
                fontWeight: '700',
                color: hasNodesOrEdges ? '#dc2626' : '#94a3b8',
                background: hasNodesOrEdges 
                  ? '#ffffff'
                  : '#f8fafc',
                border: `2px solid ${hasNodesOrEdges ? '#dc2626' : '#cbd5e1'}`,
                borderRadius: '10px',
                cursor: hasNodesOrEdges ? 'pointer' : 'not-allowed',
                boxShadow: hasNodesOrEdges 
                  ? '0 4px 6px -1px rgba(220, 38, 38, 0.2), 0 2px 4px -1px rgba(220, 38, 38, 0.1)'
                  : 'none',
                transition: 'all 0.2s ease',
                letterSpacing: '0.5px',
                opacity: hasNodesOrEdges ? 1 : 0.6
              }}
              onMouseEnter={(e) => {
                if (hasNodesOrEdges) {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 10px 15px -3px rgba(220, 38, 38, 0.3), 0 4px 6px -2px rgba(220, 38, 38, 0.2)';
                  e.target.style.backgroundColor = '#fef2f2';
                }
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = hasNodesOrEdges 
                  ? '0 4px 6px -1px rgba(220, 38, 38, 0.2), 0 2px 4px -1px rgba(220, 38, 38, 0.1)'
                  : 'none';
                e.target.style.backgroundColor = '#ffffff';
              }}
            >
              Clear Canvas
            </button>
            
            <button 
              type="button"
              onClick={handleSubmit}
              disabled={isLoading}
              style={{
                padding: '14px 40px',
                fontSize: '16px',
                fontWeight: '700',
                color: '#fff',
                background: isLoading 
                  ? 'linear-gradient(135deg, #94a3b8 0%, #64748b 100%)'
                  : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                border: 'none',
                borderRadius: '10px',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                boxShadow: '0 4px 6px -1px rgba(102, 126, 234, 0.4), 0 2px 4px -1px rgba(102, 126, 234, 0.3)',
                transition: 'all 0.2s ease',
                letterSpacing: '0.5px',
                opacity: isLoading ? 0.7 : 1
              }}
              onMouseEnter={(e) => {
                if (!isLoading) {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 10px 15px -3px rgba(102, 126, 234, 0.5), 0 4px 6px -2px rgba(102, 126, 234, 0.4)';
                }
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 6px -1px rgba(102, 126, 234, 0.4), 0 2px 4px -1px rgba(102, 126, 234, 0.3)';
              }}
            >
              {isLoading ? 'Submitting...' : 'Submit Pipeline'}
            </button>
        </div>

        {/* Results Modal */}
        {(results || error) && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="results-modal" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={closeModal} aria-label="Close">
                ×
              </button>
              
              {error ? (
                <div className="modal-content">
                  <h2 className="modal-title error-title">Error</h2>
                  <p className="modal-error-message">{error}</p>
                </div>
              ) : (
                <div className="modal-content">
                  <h2 className="modal-title">Pipeline Analysis Results</h2>
                  <div className="results-list">
                    <div className="result-item">
                      <span className="result-label">Number of Nodes:</span>
                      <span className="result-value">{results.num_nodes}</span>
                    </div>
                    <div className="result-item">
                      <span className="result-label">Number of Edges:</span>
                      <span className="result-value">{results.num_edges}</span>
                    </div>
                    <div className="result-item">
                      <span className="result-label">Is DAG:</span>
                      <span className={`result-value ${results.is_dag ? 'dag-yes' : 'dag-no'}`}>
                        {results.is_dag ? 'Yes ✓' : 'No ✗'}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
        </>
    );
}
