import { useEffect } from "react";
import { ReactFlow, Background } from "@xyflow/react";
import { useStore } from "../store";
import TelegramNode from "@/components/TelegramNode";
import Sidebar from "@/components/Sidebar";
import SaveButton from "@/components/ToolBar";
import "@xyflow/react/dist/style.css";
import type { NodeTypes } from "@xyflow/react";

const nodeTypes: NodeTypes = { telegram: TelegramNode }

export default function FlowBuilderPage() {
  const {
      nodes,
      edges,
      onNodesChange,
      onEdgesChange,
      onConnect,
      setSelectedNode,
      setEdges,
      setNodes
    } = useStore();

  useEffect(() => {
    const savedFlow = localStorage.getItem("bot-flow");

    if (savedFlow) {
      try {
        const { nodes, edges } = JSON.parse(savedFlow);

        setNodes(nodes);
        setEdges(edges || []); 

        console.log("Restored from backup!");
      } catch(e) {
        console.error("Failed to parse flow", e)
      }

    }
  }, [setNodes, setEdges]);

  return (
    <div className="flex w-full h-screen">
      <div className="flex flex-1 h-full">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={(_, node) => setSelectedNode(node.id)}
          onPaneClick={() => setSelectedNode(null)}
          nodeTypes={nodeTypes}
        >
          <Background />
        </ReactFlow>

        <SaveButton />
      </div>

      <Sidebar />
    </div>
  );
}