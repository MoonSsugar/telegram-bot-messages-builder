import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Button } from "./ui/button";
import { saveFlow } from "@/lib/mocApi";
import { 
  setError, 
  setIsLoading,
  createNode
} from "@/redux/slices/flowSlice";

export default function ToolBar() {
  const dispatch = useAppDispatch();
  const { nodes, edges, isLoading } = useAppSelector((state) => state.flow);

  const onSave = async () => {
    dispatch(setIsLoading(true));
    dispatch(setError(null));

    try {
      await saveFlow({ nodes, edges });
    } catch (error: unknown) {
      if (error instanceof Error) {
        dispatch(setError(error.message));

        alert(error.message);
      } else {
        const errorMessage = String(error);

        dispatch(setError(errorMessage))
        alert("Unknown error occurred");
      }
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  

  return (
    <div className="absolute flex top-3 left-3 gap-1 bg-white border p-3 rounded-2xl shadow">
      <Button   
        disabled={isLoading}
        size="lg" 
        variant="outline"
        onClick={() => onSave()}
      >{ isLoading ? "Saving..." : "Save" }</Button>
      
      <Button 
        size="lg" 
        variant="outline" 
        onClick={() => dispatch(createNode())} 
      >Add node</Button>
    </div>
    
  );
}