import { create } from "zustand";
import {
  applyEdgeChanges,
  applyNodeChanges,
  addEdge
} from "@xyflow/react";
import type { 
  Node,
  Edge,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
} from "@xyflow/react";

type RFState = {
  nodes: Node[],
  edges: Edge[],
  onEdgesChange: OnEdgesChange,
  onNodesChange: OnNodesChange,
  onConnect: OnConnect,
  setNodes: (nodes: Node[]) => void;
}

export const useStore = create<RFState>((set, get) => ({
  nodes: [
      {
        id: "node-1",
        type: "telegram",
        position: { x: 0, y: 100},
        data: { 
          label: "Hello!",
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXIlgQg4yMlcdmdQVw8XY5X1DlO55E-S0ALg&s",
          buttons: [
            { id: '1', text: "button1" },
            { id: '2', text: "button2"}
          ]
        }
      },
      {
        id: "node-2",
        type: "telegram",
        position: { x: 0, y: 200},
        data: { 
          label: "Bye!",
          image: "https://i.ytimg.com/vi/PKffm2uI4dk/hq720.jpg?sqp=-oaymwE7CK4FEIIDSFryq4qpAy0IARUAAAAAGAElAADIQj0AgKJD8AEB-AH-CYAC0AWKAgwIABABGGUgSig8MA8=&rs=AOn4CLDqrZ4kgngezsXx6GoNT3w_AeWyGQ",
          buttons: [
            { id: "1", text: "button1" },
            { id: "2", text: "button2"}
          ]
        }
      }
    ],
    edges: [],
    onEdgesChange: (changes) => {
      set({ edges: applyEdgeChanges(changes, get().edges)});
    },
    onNodesChange: (changes) => {
      set({ nodes: applyNodeChanges(changes, get().nodes)});
    },
    onConnect: (connection) => {
      set({ edges: addEdge(connection, get().edges)});
    },
    setNodes: (nodes) => {
      set({ nodes });
    }
}));