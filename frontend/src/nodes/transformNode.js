// transformNode.js

import { useState, useEffect } from 'react';
import { BaseNode } from './BaseNode';
import { useStore } from '../store';

export const TransformNode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);
  const [transformType, setTransformType] = useState(data?.transformType || 'uppercase');

  useEffect(() => {
    updateNodeField(id, 'transformType', transformType);
  }, [transformType, id, updateNodeField]);

  return (
    <BaseNode
      id={id}
      data={data}
      title="Transform"
      inputHandles={[{ id: `${id}-input` }]}
      outputHandles={[{ id: `${id}-output` }]}
      style={{ backgroundColor: '#fef2f2', borderColor: '#ef4444' }}
    >
      <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '13px', color: '#475569' }}>
        <span style={{ fontWeight: '600' }}>Transform Type:</span>
        <select 
          value={transformType} 
          onChange={(e) => setTransformType(e.target.value)}
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
          <option value="uppercase">Uppercase</option>
          <option value="lowercase">Lowercase</option>
          <option value="reverse">Reverse</option>
          <option value="trim">Trim</option>
        </select>
      </label>
    </BaseNode>
  );
}

