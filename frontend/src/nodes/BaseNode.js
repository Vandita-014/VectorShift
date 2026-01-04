// BaseNode.js
// Base abstraction for all nodes

import { Handle, Position } from 'reactflow';

export const BaseNode = ({ 
  id, 
  data, 
  title, 
  children, 
  inputHandles = [], 
  outputHandles = [],
  className = '',
  style = {}
}) => {
  const defaultStyle = {
    width: 220,
    minHeight: 100,
    padding: '16px',
    border: '2px solid #e2e8f0',
    borderRadius: '12px',
    backgroundColor: '#ffffff',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    transition: 'all 0.2s ease',
    ...style
  };

  return (
    <div className={`base-node ${className}`} style={defaultStyle}>
      {/* Input Handles */}
      {inputHandles.map((handle, index) => (
        <Handle
          key={handle.id || `input-${index}`}
          type="target"
          position={Position.Left}
          id={handle.id}
          style={{
            ...(handle.style || {}),
            width: '12px',
            height: '12px',
            border: '2px solid #fff',
            backgroundColor: '#6366f1',
          }}
        />
      ))}

      {/* Title */}
      {title && (
        <div style={{ 
          fontWeight: '700', 
          fontSize: '16px',
          color: '#1e293b',
          borderBottom: '2px solid #f1f5f9',
          paddingBottom: '8px',
          marginBottom: '4px'
        }}>
          {title}
        </div>
      )}

      {/* Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {children}
      </div>

      {/* Output Handles */}
      {outputHandles.map((handle, index) => (
        <Handle
          key={handle.id || `output-${index}`}
          type="source"
          position={Position.Right}
          id={handle.id}
          style={{
            ...(handle.style || {}),
            width: '12px',
            height: '12px',
            border: '2px solid #fff',
            backgroundColor: '#6366f1',
          }}
        />
      ))}
    </div>
  );
};

