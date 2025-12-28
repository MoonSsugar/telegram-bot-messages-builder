import { Position, Handle } from "@xyflow/react";
import type { Node, NodeProps } from "@xyflow/react";

interface Button {
  id: string,
  text: string
}

interface TelegramNodeData extends Record<string, unknown> {   
  label: string,
  image?: string,
  buttons: Button[]
}

type MyTelegramNode = Node<TelegramNodeData>;

export default function TelegramNode({ data }: NodeProps<MyTelegramNode>) {

  return (
    <div className="bg-white border rounded-xl p-3" >
      <Handle type="target" position={Position.Top}/>

      {
        data.image && <img 
          className="max-h-50 max-w-50" 
          src={data.image} 
          alt="image"
        />
      }
      
      <div>
        {data.label}
      </div>
      
      <div className="flex gap-5">
        {data.buttons.map((button: Button) => {
          return (
            <div key={button.id} className="relative">

              <button className="border p-1">
                {button.text}
              </button>

              <Handle 
                className="z-50"
                type="source" 
                id={button.id}
                position={Position.Bottom} 
                style={{ bottom: -3 }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}