import { useStore } from "@/store";
import { CirclePlus, X } from "lucide-react"
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import type { Node } from "@xyflow/react"
import type ButtonType from "@/types";

interface ButtonsMatrixProps {
  selectedNode: Node,
};

export default function ButtonsMatrix({ selectedNode }: ButtonsMatrixProps) {
  const { addButton, addRow, updateButtonText, removeButton } = useStore();

  const buttonsMatrix = (selectedNode.data.buttons as ButtonType[][]) || [];

  return (
    <div className="flex flex-col gap-3">
      {buttonsMatrix.map((buttons: ButtonType[], rowIndex) => {
        return (
          <div key={rowIndex} className="flex gap-1">
            {buttons.map((button, colIndex) => {
              return (
                <div key={button.id} className="flex">
                  <Input 
                    value={button.text}
                    onChange={(event) => updateButtonText(rowIndex, colIndex, event.target.value)}
                  />
                  <Button 
                    variant="destructive" 
                    size="icon-sm" 
                    className="h-4 w-4 rounded-full"
                    onClick={() => removeButton(rowIndex, colIndex)}
                  ><X /></Button>
                </div>
              );
            })}
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => addButton(rowIndex)}
            > <CirclePlus /> </Button>
          </div>
        );
      })}
      <Button variant="outline" size="sm" onClick={() => addRow()}>Add new row</Button>
    </div>
  );
}