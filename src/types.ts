export default interface ButtonType {
  id: string,
  text: string
};

interface NodeChanges  {
  label?: string,
  image?: string
}

export interface UpdateNodePayload {
  id: string,
  changes: NodeChanges
}

export interface UpdateButtonPayload {
  rowIndex: number,
  colIndex: number, 
  text: string
}

export interface RemoveButtonPayload {
  rowIndex: number,
  colIndex: number
}
