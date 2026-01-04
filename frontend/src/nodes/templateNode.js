// templateNode.js

import { useState, useEffect } from 'react';
import { BaseNode } from './BaseNode';
import { useStore } from '../store';

export const TemplateNode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);
  const [templateName, setTemplateName] = useState(data?.templateName || 'default');

  useEffect(() => {
    updateNodeField(id, 'templateName', templateName);
  }, [templateName, id, updateNodeField]);

  return (
    <BaseNode
      id={id}
      data={data}
      title="Template"
      inputHandles={[
        { id: `${id}-data`, style: { top: '33%' } },
        { id: `${id}-variables`, style: { top: '67%' } }
      ]}
      outputHandles={[{ id: `${id}-output` }]}
      style={{ backgroundColor: '#eff6ff', borderColor: '#3b82f6' }}
    >
      <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '13px', color: '#475569' }}>
        <span style={{ fontWeight: '600' }}>Template Name:</span>
        <input 
          type="text" 
          value={templateName} 
          onChange={(e) => setTemplateName(e.target.value)}
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
        Applies template to input data
      </div>
    </BaseNode>
  );
}

