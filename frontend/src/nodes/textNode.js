// textNode.js

import { useState, useEffect, useMemo } from 'react';
import { Handle, Position } from 'reactflow';
import { useStore } from '../store';

// Helper function to parse variables from text (e.g., {{ variable_name }})
const parseVariables = (text) => {
  const variablePattern = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;
  const variables = new Set();
  let match;
  
  while ((match = variablePattern.exec(text)) !== null) {
    const varName = match[1];
    // Validate JavaScript variable name
    if (/^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(varName)) {
      variables.add(varName);
    }
  }
  
  return Array.from(variables);
};

export const TextNode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);
  const [currText, setCurrText] = useState(data?.text || '{{input}}');

  // Parse variables from text
  const variables = useMemo(() => parseVariables(currText), [currText]);

  // Update store when text changes
  useEffect(() => {
    updateNodeField(id, 'text', currText);
    updateNodeField(id, 'variables', variables);
  }, [currText, variables, id, updateNodeField]);

  // Calculate dimensions based on text content
  const [dimensions, setDimensions] = useState({ width: 280, height: 120 });

  useEffect(() => {
    // Calculate width: minimum 280, expand based on longest line
    const lines = currText.split('\n');
    const longestLine = lines.reduce((max, line) => Math.max(max, line.length), 0);
    const calculatedWidth = Math.max(280, Math.min(500, longestLine * 7 + 60));
    
    // Calculate height: minimum 120, expand based on number of lines
    const numLines = lines.length || 1;
    const calculatedHeight = Math.max(120, Math.min(400, numLines * 22 + 80 + (variables.length * 25)));
    
    setDimensions({ width: calculatedWidth, height: calculatedHeight });
  }, [currText, variables.length]);

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

  const nodeStyle = {
    width: dimensions.width,
    minHeight: dimensions.height,
    padding: '16px',
    border: '2px solid #10b981',
    borderRadius: '12px',
    backgroundColor: '#ecfdf5',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    transition: 'all 0.3s ease',
  };

  return (
    <div className="text-node" style={nodeStyle}>
      {/* Dynamic Input Handles for variables */}
      {variables.map((varName, index) => (
        <Handle
          key={`input-${varName}`}
          type="target"
          position={Position.Left}
          id={`${id}-${varName}`}
          style={{ 
            top: `${((index + 1) * 100) / (variables.length + 1)}%`,
            width: '12px',
            height: '12px',
            border: '2px solid #fff',
            backgroundColor: '#10b981'
          }}
        />
      ))}

      {/* Title */}
      <div style={{ 
        fontWeight: '700', 
        fontSize: '16px',
        color: '#1e293b',
        borderBottom: '2px solid #d1fae5',
        paddingBottom: '8px',
        marginBottom: '4px'
      }}>
        Text
      </div>

      {/* Text Input */}
      <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '13px', color: '#475569', flex: 1 }}>
        <span style={{ fontWeight: '600' }}>Text:</span>
        <textarea
          value={currText}
          onChange={handleTextChange}
          style={{ 
            padding: '10px',
            borderRadius: '6px',
            border: '1px solid #cbd5e1',
            fontSize: '13px',
            fontFamily: 'inherit',
            minHeight: '60px',
            width: '100%',
            boxSizing: 'border-box',
            resize: 'none',
            backgroundColor: '#fff',
            outline: 'none',
            transition: 'border-color 0.2s',
            lineHeight: '1.5'
          }}
          placeholder="Enter text with variables like {{ variable_name }}"
          onFocus={(e) => e.target.style.borderColor = '#6366f1'}
          onBlur={(e) => e.target.style.borderColor = '#cbd5e1'}
        />
      </label>

      {/* Variables info */}
      {variables.length > 0 && (
        <div style={{ 
          fontSize: '11px', 
          color: '#059669', 
          fontStyle: 'italic',
          padding: '6px 10px',
          backgroundColor: '#d1fae5',
          borderRadius: '4px',
          fontWeight: '500'
        }}>
          Variables: {variables.join(', ')}
        </div>
      )}

      {/* Output Handle */}
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-output`}
        style={{
          width: '12px',
          height: '12px',
          border: '2px solid #fff',
          backgroundColor: '#10b981'
        }}
      />
    </div>
  );
}
