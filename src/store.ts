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
import type ButtonType from "./types";

type nodeChanges = {
  label?: string,
  image?: string
}

type RFState = {
  nodes: Node[],
  edges: Edge[],
  onEdgesChange: OnEdgesChange,
  onNodesChange: OnNodesChange,
  onConnect: OnConnect,
  setNodes: (nodes: Node[]) => void;
  setEdges: (edges: Edge[]) => void;
  selectedNodeId: string | null,
  setSelectedNode: (id: string | null) => void;
  updateNodeData: (id: string, changes: nodeChanges) => void;
  createNode: () => void;
  removeNode: (id: string) => void;
  addButton: (rowIndex: number) => void;
  addRow: () => void;
  updateButtonText: (rowIndex: number, colIndex: number, text: string) => void;
  removeButton: (rowIndex: number, colIndex: number) => void;
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
            [
              { id: 'btn-1-1', text: "btn1" },
              { id: 'btn-1-2', text: "btn2"}
            ],
            [
              {id: "btn-2-1", text: "btn1"}
            ]
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
            [
              { id: 'btn-1-1', text: "btn1" },
              { id: 'btn-1-2', text: "btn2"}
            ],
            [
              {id: "btn-2-1", text: "btn1"}
            ]
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
    },

    setEdges: (edges) => {
      set({ edges });
    },

    selectedNodeId: null,

    setSelectedNode: (id) => set({ selectedNodeId: id }),

    updateNodeData: (id: string, changes: nodeChanges) => {
      const nodes = get().nodes;

      const updatedNodeArray = nodes.map((node) => {
        if (node.id === id) {
          return {
            ...node,
            data: {
              ...node.data,
              ...changes
            }
          };
        }

        return node;
      });

      set({ nodes: updatedNodeArray });
    },

    createNode: () => {
      const nodes = get().nodes;

      const newNode: Node[] = [
        ...nodes,
        {
          id: crypto.randomUUID(),
          type: "telegram",
          position: { x: Math.random() * 300, y: Math.random() * 300 },
          data: {
            label: "",
            image: "",
            buttons: []
          }
        }
      ]

      set({ nodes: newNode })
    },

    removeNode: (id: string) => {
      const nodes = get().nodes;

      const availableNodes = nodes.filter((node) => node.id !== id);

      set({ nodes: availableNodes, selectedNodeId: null });
    },

    addButton: (rowIndex: number) => {
      const nodes = get().nodes;

      const updatedNodes = nodes.map((node) => {
        if (node.id === get().selectedNodeId) {
          const currentButtons = (node.data.buttons as ButtonType[][]) || [];

          const newButtonMatrix = [...currentButtons];

          const targetRow = newButtonMatrix[rowIndex] ? [...newButtonMatrix[rowIndex]] : [];

          targetRow.push(
            {
              id: crypto.randomUUID(),
              text: ""
            }
          );

          newButtonMatrix[rowIndex] = targetRow;

          return {
            ...node,
            data: {
              ...node.data,
              buttons: newButtonMatrix
            }
          };
        }

        return node;
      });

      set({ nodes: updatedNodes });
    },

    addRow: () => {
      const nodes = get().nodes;

      const updatedNodes = nodes.map((node) => {
        if (node.id === get().selectedNodeId) {
          const currentButtons = (node.data.buttons as ButtonType[][]) || [];

          const newButtonMatrix = [
            ...currentButtons,
            [{ id: crypto.randomUUID(), text: ""}]
          ];

          return {
            ...node,
            data: {
              ...node.data,
              buttons: newButtonMatrix
            }
          };
        }

        return node;
      });

      set({ nodes: updatedNodes });
    },

    updateButtonText: (rowIndex: number, colIndex: number, text: string) => {
      const nodes = get().nodes;

      const updatedNodeButtons = nodes.map((node) => {
        if (node.id === get().selectedNodeId) {
          const currentButtons = (node.data.buttons as ButtonType[][]) || [];

          const newButtonMatrix = [...currentButtons];

          const targetRow = newButtonMatrix[rowIndex] ? [...newButtonMatrix[rowIndex]] : [];

          const targetBtn = { ...targetRow[colIndex] };

          targetBtn.text = text;

          targetRow[colIndex] = targetBtn;

          newButtonMatrix[rowIndex] = targetRow;

          return {
            ...node,
            data: {
              ...node.data,
              buttons: newButtonMatrix
            }
          };
        }

        return node;
      })

      set({ nodes: updatedNodeButtons});
    },

    removeButton: (rowIndex: number, colIndex: number) => {
      const nodes = get().nodes;

      const updatedNodes = nodes.map((node) => {
        if (node.id === get().selectedNodeId) {
          const currentButtons = (node.data.buttons as ButtonType[][]);

          const newButtonsMatrix = [...currentButtons];

          const targetRow = newButtonsMatrix[rowIndex] ? [...newButtonsMatrix[rowIndex]] : [];

          targetRow.splice(colIndex, 1);

          if (targetRow.length === 0) {
            newButtonsMatrix.splice(rowIndex, 1);
          } else {
            newButtonsMatrix[rowIndex] = targetRow;
          }

          return {
            ...node,
            data: {
              ...node.data,
              buttons: newButtonsMatrix
            }
          };
        
        }

        return node;
      })

      set({ nodes: updatedNodes});
    }
}));