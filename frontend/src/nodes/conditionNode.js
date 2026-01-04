// conditionNode.js

import { useState, useEffect } from 'react';
import { BaseNode } from './BaseNode';
import { useStore } from '../store';

export const ConditionNode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);
  const [condition, setCondition] = useState(data?.condition || '>');
  const [threshold, setThreshold] = useState(data?.threshold || '0');

  useEffect(() => {
    updateNodeField(id, 'condition', condition);
  }, [condition, id, updateNodeField]);

  useEffect(() => {
    updateNodeField(id, 'threshold', threshold);
  }, [threshold, id, updateNodeField]);

  return (
    <BaseNode
      id={id}
      data={data}
      title="Condition"
      inputHandles={[{ id: `${id}-input` }]}
      outputHandles={[
        { id: `${id}-true`, style: { top: '33%' } },
        { id: `${id}-false`, style: { top: '67%' } }
      ]}
      style={{ backgroundColor: '#fdf4ff', borderColor: '#a855f7' }}
    >
      <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '13px', color: '#475569' }}>
        <span style={{ fontWeight: '600' }}>Operator:</span>
        <select 
          value={condition} 
          onChange={(e) => setCondition(e.target.value)}
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
          <option value=">">Greater Than</option>
          <option value="<">Less Than</option>
          <option value="==">Equals</option>
          <option value="!=">Not Equals</option>
        </select>
      </label>
      <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '13px', color: '#475569' }}>
        <span style={{ fontWeight: '600' }}>Threshold:</span>
        <input 
          type="text" 
          value={threshold} 
          onChange={(e) => setThreshold(e.target.value)}
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

