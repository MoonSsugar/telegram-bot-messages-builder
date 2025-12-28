import { ReactFlow } from "@xyflow/react";
import TelegramNode from "./components/TelegramNode";
import { useStore } from "./store";
import type { NodeTypes } from "@xyflow/react";
import "@xyflow/react/dist/style.css";

const nodeTypes: NodeTypes = { telegram: TelegramNode }

function App() {
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect
  } = useStore();

  return (
    <div className="w-screen h-screen">
      <ReactFlow 
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
      />
    </div>
  )
}

export default App
