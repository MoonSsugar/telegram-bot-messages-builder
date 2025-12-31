import { Position, Handle } from "@xyflow/react";
import { Button } from "./ui/button";
import type { Node, NodeProps } from "@xyflow/react";
import type ButtonType from "@/types";

type TelegramNodeData = Record<string, unknown> & {   
  label: string,
  image?: string,
  buttons: ButtonType[][]
}

type MyTelegramNode = Node<TelegramNodeData>;

export default function TelegramNode({ data, selected }: NodeProps<MyTelegramNode>) {

  const buttonsMatrix = (data.buttons as ButtonType[][]) || [];

  return (
    <div 
      className={`bg-white border rounded-xl p-3 ${ selected ? "border-blue-500" : "border-slate-200" }`}
    >
      <Handle type="target" position={Position.Top}/>

      {data.image && <img className="max-h-50 max-w-50" src={data.image} alt="img" />}

      {data.label}

      <div className="flex flex-col gap-3">
        {buttonsMatrix.map((buttons: ButtonType[], rowIndex: number ) => {
          return (
            <div key={rowIndex} className="flex flex-row gap-1">
              {buttons.map((button: ButtonType) => {
                return (
                  <div key={button.id} className="relative">
                    <Button variant="outline" size="sm">{button.text}</Button>

                    <Handle 
                      id={button.id}
                      type="source" 
                      position={Position.Bottom}
                      className="z-50"
                      style={{ bottom: -3 }}
                    />
                  </div>
                );
              })}
            </div>
          )
        })}
      </div>
    </div>
  );
}