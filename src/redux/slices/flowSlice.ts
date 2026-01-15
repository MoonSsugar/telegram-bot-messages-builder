import { createSlice } from "@reduxjs/toolkit";
import {
  applyEdgeChanges,
  applyNodeChanges,
  addEdge
} from "@xyflow/react";
import stringToColor from "../../utils/stringToColor";
import type { 
  Node,
  Edge,
  EdgeChange,
  NodeChange,
  Connection
} from "@xyflow/react";
import type ButtonType from "../../types";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { 
  UpdateButtonPayload, 
  UpdateNodePayload,
  RemoveButtonPayload
} from "../../types";

interface FlowState {
  nodes: Node[],
  edges: Edge[],
  selectedNodeId: string | null,
  isLoading: boolean,
  error: string | null,
}

const initialState: FlowState = {
  nodes: [
    {
      id: "node-1",
      type: "telegram",
      position: { x: 575, y: 200},
      data: { 
        label: "/start",
        image: "https://cdn.pixabay.com/photo/2021/12/27/10/50/telegram-6896827_1280.png",
        buttons: [
          [
            { id: 'btn-1-1', text: "First inline button" },
            { id: 'btn-1-2', text: "Second inline button"}
          ],
          [
            {id: "btn-2-1", text: "New row button"}
          ]
        ]
      }
    },
  ],
  edges: [],
  selectedNodeId: null,
  isLoading: false,
  error: null
};

export const flowSlice = createSlice({
  name: "flow",
  initialState,
  reducers: {
    onEdgesChange: (state, action: PayloadAction<EdgeChange[]>) => {
      state.edges = applyEdgeChanges(action.payload, state.edges);
    },
    onNodesChange: (state, action: PayloadAction<NodeChange[]>) => {
      state.nodes = applyNodeChanges(action.payload, state.nodes);
    },
    onConnect: (state, action: PayloadAction<Connection>) => {
      const color = stringToColor((action.payload.sourceHandle as string));

      const edgeStyle = { stroke: color, strokeWidth: 2 };

      state.edges = addEdge({ ...action.payload, style: edgeStyle }, state.edges);
    },
    setEdges: (state, action: PayloadAction<Edge[]>) => {
      state.edges = action.payload;
    },
    setNodes: (state, action: PayloadAction<Node[]>) => {
      state.nodes = action.payload;
    },
    setSelectedNode: (state, action: PayloadAction<string | null>) => {
      state.selectedNodeId = action.payload;
    },
    updateNodeData: (state, action: PayloadAction<UpdateNodePayload>) => {
      const { id, changes } = action.payload;

      const node = state.nodes.find((node) => node.id === id);

      if (node) {
        node.data = { ...node.data, ...changes};
      }
    },
    createNode: (state) => {
      state.nodes.push({
        id: crypto.randomUUID(),
        type: "telegram",
        position: { x: Math.random() * 300, y: Math.random() * 300},
        data: {
          label: "",
          image: "",
          buttons: []
        }
      });
    },
    removeNode: (state, action: PayloadAction<string>) => {
      state.nodes = state.nodes.filter((node) => node.id !== action.payload); 
      if (state.selectedNodeId === action.payload) {
        state.selectedNodeId = null;
      }
    },
    addButton: (state, action: PayloadAction<number>) => {
      const node = state.nodes.find((node) => node.id === state.selectedNodeId);

      const rowIndex = action.payload;

      if (node) {
        const currentButtons = node.data.buttons as ButtonType[][];

        currentButtons[rowIndex].push({
          id: crypto.randomUUID(),
          text: ""
        });
      }
    },
    addRow: (state) => {
      const node = state.nodes.find((node) => node.id === state.selectedNodeId);

      if (node) {
        (node.data.buttons as ButtonType[][] || []).push([{
          id: crypto.randomUUID(),
          text: ""
        }]);
      }
    },
    updateButtonText: (state, action: PayloadAction<UpdateButtonPayload>) => {
      const node = state.nodes.find((node) => node.id === state.selectedNodeId);

      const { rowIndex, colIndex, text} = action.payload;

      if (node) {
        const currentButtons = node.data.buttons as ButtonType[][];

        const targetRow = currentButtons[rowIndex];

        targetRow[colIndex].text = text;
      }
    },
    removeButton: (state, action: PayloadAction<RemoveButtonPayload>) => {
      const node = state.nodes.find((node) => node.id === state.selectedNodeId);

      const { rowIndex, colIndex } = action.payload;

      if (node) {
        const currentButtons = node.data.buttons as ButtonType[][];

        const targetRow = currentButtons[rowIndex];

        targetRow.splice(colIndex, 1);

        if (targetRow.length === 0) {
          currentButtons.splice(rowIndex, 1)
        } else {
          currentButtons[rowIndex] = targetRow;
        }
      }
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    }
  }
});

export const {
  onEdgesChange,
  onNodesChange,
  onConnect,
  setEdges,
  setNodes,
  setError,
  setIsLoading,
  setSelectedNode,
  addButton,
  addRow,
  removeButton,
  removeNode,
  updateButtonText,
  updateNodeData,
  createNode
} = flowSlice.actions;

export const flowReducer = flowSlice.reducer;