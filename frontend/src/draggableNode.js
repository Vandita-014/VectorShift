// draggableNode.js

export const DraggableNode = ({ type, label }) => {
    const onDragStart = (event, nodeType) => {
      const appData = { nodeType }
      event.currentTarget.style.cursor = 'grabbing';
      event.currentTarget.style.transform = 'scale(0.95)';
      event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
      event.dataTransfer.effectAllowed = 'move';
    };
  
    return (
      <div
        className={`draggable-node ${type}`}
        onDragStart={(event) => onDragStart(event, type)}
        onDragEnd={(event) => {
          event.currentTarget.style.cursor = 'grab';
          event.currentTarget.style.transform = 'scale(1)';
        }}
        style={{ 
          cursor: 'grab', 
          minWidth: '110px', 
          height: '48px',
          display: 'flex', 
          alignItems: 'center', 
          borderRadius: '10px',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          justifyContent: 'center', 
          flexDirection: 'column',
          boxShadow: '0 4px 6px -1px rgba(102, 126, 234, 0.3), 0 2px 4px -1px rgba(102, 126, 234, 0.2)',
          transition: 'all 0.2s ease',
          userSelect: 'none',
          border: 'none'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
          e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(102, 126, 234, 0.4), 0 4px 6px -2px rgba(102, 126, 234, 0.3)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0) scale(1)';
          e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(102, 126, 234, 0.3), 0 2px 4px -1px rgba(102, 126, 234, 0.2)';
        }}
        draggable
      >
          <span style={{ color: '#fff', fontSize: '14px', fontWeight: '600', letterSpacing: '0.3px' }}>{label}</span>
      </div>
    );
  };
  