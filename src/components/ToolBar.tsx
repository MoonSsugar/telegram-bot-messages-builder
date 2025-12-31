import { useStore } from "@/store";
import { Button } from "./ui/button";

export default function ToolBar() {

  const { nodes, edges, createNode } = useStore();

  const onSave = () => {
    localStorage.setItem("bot-flow", JSON.stringify({ nodes, edges }));
  };

  

  return (
    <div className="absolute flex top-3 left-3 gap-1 bg-white border p-3 rounded-2xl shadow">
      <Button   
        size="lg" 
        variant="outline"
        onClick={() => onSave()}
      >Save</Button>
      
      <Button size="lg" variant="outline" onClick={() => createNode()} >Add node</Button>
    </div>
    
  );
}