import type { Node, Edge } from "@xyflow/react";

interface FlowData {
  nodes: Node[],
  edges: Edge[]
}

export function saveFlow(data: FlowData): Promise<void> {
  return  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.2) {
        localStorage.setItem("bot-flow", JSON.stringify(data));
        resolve();
      } else {
        reject(new Error("500 Server Error"));
      }
    }, 1500);
  })
}

export function getFlow(): Promise<string | null> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(localStorage.getItem("bot-flow"));
    }, 1500);
  })
}