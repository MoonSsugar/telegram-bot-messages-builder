import { useEffect } from "react";
import { ReactFlow, Background } from "@xyflow/react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { 
  setIsLoading, 
  setNodes,
  setEdges,
  onConnect,
  onEdgesChange,
  onNodesChange,
  setSelectedNode,
} from "@/redux/slices/flowSlice";
import TelegramNode from "@/components/TelegramNode";
import Sidebar from "@/components/Sidebar";
import SaveButton from "@/components/ToolBar";
import "@xyflow/react/dist/style.css";
import type { NodeTypes } from "@xyflow/react";
import { getFlow } from "@/lib/mocApi";

const nodeTypes: NodeTypes = { telegram: TelegramNode }

export default function FlowBuilderPage() {
  const dispatch = useAppDispatch();
  const {
    isLoading,
    nodes,
    edges
  } = useAppSelector((state) => state.flow);

  useEffect(() => {
    const loadFlow = async () => {
      dispatch(setIsLoading(true))
      console.log("start loading")


      try {
        const savedFlow = await getFlow();

        if (savedFlow) {
          const { nodes, edges } = JSON.parse(savedFlow);

          dispatch(setNodes(nodes));
          dispatch(setEdges(edges || []));

          console.log("Restored from backup!");
        }
      } catch (e) {
        console.error("Failed to parse flow", e);
      } finally {
        dispatch(setIsLoading(false));

      }
    };

    loadFlow();
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen w-screen">
        <h1 className="">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="flex w-full h-screen">
      <div className="flex flex-1 h-full">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={(changes) => dispatch(onNodesChange(changes))}
          onEdgesChange={(changes) => dispatch(onEdgesChange(changes))}
          onConnect={(connection) => dispatch(onConnect(connection))}
          onNodeClick={(_, node) => dispatch(setSelectedNode(node.id))}
          onPaneClick={() => dispatch(setSelectedNode(null))}
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