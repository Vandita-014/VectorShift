// inputNode.js

import { useState, useEffect } from 'react';
import { BaseNode } from './BaseNode';
import { useStore } from '../store';

export const InputNode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data?.inputType || 'Text');

  useEffect(() => {
    updateNodeField(id, 'inputName', currName);
  }, [currName, id, updateNodeField]);

  useEffect(() => {
    updateNodeField(id, 'inputType', inputType);
  }, [inputType, id, updateNodeField]);

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setInputType(e.target.value);
  };

  return (
    <BaseNode
      id={id}
      data={data}
      title="Input"
      outputHandles={[{ id: `${id}-value` }]}
      style={{ backgroundColor: '#f0f9ff', borderColor: '#0ea5e9' }}
    >
      <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '13px', color: '#475569' }}>
        <span style={{ fontWeight: '600' }}>Name:</span>
        <input 
          type="text" 
          value={currName} 
          onChange={handleNameChange}
          style={{ 
            padding: '8px 12px', 
            borderRadius: '6px', 
            border: '1px solid #cbd5e1',
            fontSize: '13px',
            backgroundColor: '#fff',
            outline: 'none',
            transition: 'border-color 0.2s'
          }}
          onFocus={(e) => e.target.style.borderColor = '#6366f1'}
          onBlur={(e) => e.target.style.borderColor = '#cbd5e1'}
        />
      </label>
      <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '13px', color: '#475569' }}>
        <span style={{ fontWeight: '600' }}>Type:</span>
        <select 
          value={inputType} 
          onChange={handleTypeChange}
          style={{ 
            padding: '8px 12px', 
            borderRadius: '6px', 
            border: '1px solid #cbd5e1',
            fontSize: '13px',
            backgroundColor: '#fff',
            outline: 'none',
            cursor: 'pointer'
          }}
        >
          <option value="Text">Text</option>
          <option value="File">File</option>
        </select>
      </label>
    </BaseNode>
  );
}
