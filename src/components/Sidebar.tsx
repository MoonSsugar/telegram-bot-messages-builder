import { useCallback, useEffect, useState } from "react";
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

  const [ width, setWidth ] = useState(320);
  const [ isResizing, setIsResizing ] = useState(false);

  const startResizing = useCallback(() => {
    setIsResizing(true);
  }, []);

  useEffect(() => {
    if (!isResizing) {
      document.body.style.userSelect = "";
      document.body.style.cursor = "";

      return;
    }

    document.body.style.userSelect = "none";
    document.body.style.cursor = "col-resize";


    const handleMouseMove = (event: MouseEvent) => {
      const newWidth = window.innerWidth - event.clientX;

      if (newWidth > 200 && newWidth < 600) {
        setWidth(newWidth);
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      
      document.body.style.userSelect = "";
      document.body.style.cursor = "";
    };
  }, [isResizing]);

  const selectedNode = nodes.find((node) => node.id === selectedNodeId);

  if (selectedNode) {
    return (
      <div 
        className="flex h-full bg-white border relative user-select-none"
        style={{ width: `${width}px` }}
      >

        <div 
          className="w-0.5 h-full cursor-col-resize absolute left-0 top-0 hover:bg-blue-500 transition-colors z-50" 
          onMouseDown={startResizing}
        />

        <div className="flex-1 flex-col gap-1.5 p-4 overflow-y-auto">

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
      </div>
    );
  }
}