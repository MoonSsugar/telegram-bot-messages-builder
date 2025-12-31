import { useStore } from "@/store";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import ButtonsMatrix from "./ButtonsMatrix";

export default function Sidebar() {
  const { 
    nodes, 
    selectedNodeId, 
    updateNodeData,
    removeNode
  } = useStore();


  const selectedNode = nodes.find((node) => node.id === selectedNodeId);

  if (selectedNode) {
    return (
      <div className="w-70 flex flex-col gap-1.5 p-4 border ">

        <label htmlFor="text">Message text</label>
        <Input 
          type="text" 
          name="text" 
          value={(selectedNode.data.label as string) || ""}
          onChange={
            (event) => {
              updateNodeData((selectedNodeId as string), { label: event.target.value})}
          }
        />

        <label htmlFor="img">Image URL</label>
        <Input 
          type="text" 
          name="img" 
          value={(selectedNode.data.image as string) || ""}
          onChange={
            (event) => {
              updateNodeData((selectedNodeId as string), { image: event.target.value})}
          }
        />
        
        <ButtonsMatrix selectedNode={selectedNode}/>

        <Button 
          className="bg-red-600" variant="destructive" size="lg" 
          onClick={() => removeNode((selectedNodeId as string))}
        >Delete node</Button>
      </div>   
    );
  }
}