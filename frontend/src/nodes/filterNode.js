// filterNode.js

import { useState, useEffect } from 'react';
import { BaseNode } from './BaseNode';
import { useStore } from '../store';

export const FilterNode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);
  const [filterCondition, setFilterCondition] = useState(data?.filterCondition || 'contains');
  const [filterValue, setFilterValue] = useState(data?.filterValue || '');

  useEffect(() => {
    updateNodeField(id, 'filterCondition', filterCondition);
  }, [filterCondition, id, updateNodeField]);

  useEffect(() => {
    updateNodeField(id, 'filterValue', filterValue);
  }, [filterValue, id, updateNodeField]);

  return (
    <BaseNode
      id={id}
      data={data}
      title="Filter"
      inputHandles={[{ id: `${id}-input` }]}
      outputHandles={[
        { id: `${id}-output`, style: { top: '33%' } },
        { id: `${id}-rejected`, style: { top: '67%' } }
      ]}
      style={{ backgroundColor: '#fff7ed', borderColor: '#f97316' }}
    >
      <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '13px', color: '#475569' }}>
        <span style={{ fontWeight: '600' }}>Condition:</span>
        <select 
          value={filterCondition} 
          onChange={(e) => setFilterCondition(e.target.value)}
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
          <option value="contains">Contains</option>
          <option value="startsWith">Starts With</option>
          <option value="endsWith">Ends With</option>
          <option value="equals">Equals</option>
        </select>
      </label>
      <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '13px', color: '#475569' }}>
        <span style={{ fontWeight: '600' }}>Value:</span>
        <input 
          type="text" 
          value={filterValue} 
          onChange={(e) => setFilterValue(e.target.value)}
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
    </BaseNode>
  );
}

