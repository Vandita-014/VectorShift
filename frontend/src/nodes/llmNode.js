// llmNode.js

import { BaseNode } from './BaseNode';

export const LLMNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      title="LLM"
      inputHandles={[
        { id: `${id}-system`, style: { top: '33%' } },
        { id: `${id}-prompt`, style: { top: '67%' } }
      ]}
      outputHandles={[{ id: `${id}-response` }]}
      style={{ backgroundColor: '#ede9fe', borderColor: '#8b5cf6' }}
    >
      <div style={{ fontSize: '13px', color: '#64748b', padding: '8px', backgroundColor: '#f8fafc', borderRadius: '6px' }}>
        Large Language Model node for text generation and processing.
      </div>
    </BaseNode>
  );
}
