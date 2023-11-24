import React from 'react';

export default () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside>
      <div className="description">You can drag these nodes to the pane on the left.</div>
      <div className="react-flow__node-input" onDragStart={(event) => onDragStart(event, 'input')} draggable>
        Data Sets
      </div>
      <div className="react-flow__node-default" onDragStart={(event) => onDragStart(event, 'default')} draggable>
        Process Data
      </div>
      <div className="react-flow__node-output" onDragStart={(event) => onDragStart(event, 'output')} draggable>
        Data output
      </div>
    </aside>
  );
};