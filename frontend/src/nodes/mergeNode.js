// mergeNode.js

import { useState, useEffect } from 'react';
import { BaseNode } from './BaseNode';
import { useStore } from '../store';

export const MergeNode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);
  const [separator, setSeparator] = useState(data?.separator || ', ');

  useEffect(() => {
    updateNodeField(id, 'separator', separator);
  }, [separator, id, updateNodeField]);

  return (
    <BaseNode
      id={id}
      data={data}
      title="Merge"
      inputHandles={[
        { id: `${id}-input1`, style: { top: '25%' } },
        { id: `${id}-input2`, style: { top: '50%' } },
        { id: `${id}-input3`, style: { top: '75%' } }
      ]}
      outputHandles={[{ id: `${id}-output` }]}
      style={{ backgroundColor: '#f0fdf4', borderColor: '#22c55e' }}
    >
      <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '13px', color: '#475569' }}>
        <span style={{ fontWeight: '600' }}>Separator:</span>
        <input 
          type="text" 
          value={separator} 
          onChange={(e) => setSeparator(e.target.value)}
          placeholder=", "
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
      <div style={{ fontSize: '11px', color: '#64748b', marginTop: '4px', padding: '6px', backgroundColor: '#f8fafc', borderRadius: '4px' }}>
        Merges multiple inputs with separator
      </div>
    </BaseNode>
  );
}

