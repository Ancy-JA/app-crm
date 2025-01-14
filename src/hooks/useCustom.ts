import { useState, useCallback } from "react";

interface UseCustomProps {
    action: (params?: any) => Promise<any>; // The custom action logic (e.g., API call)
    onSuccess?: (data: any) => void;       // Callback on success
    onError?: (error: Error) => void;      // Callback on error
}

const useCustom = ({ action, onSuccess, onError }: UseCustomProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const triggerAction = useCallback(
        async (params?: any) => {
            setIsLoading(true);
            setError(null);

            try {
                const result = await action(params); // Execute the action logic
                if (onSuccess) onSuccess(result);    // Success callback
                return result;
            } catch (err) {
                const error = err as Error;
                setError(error);
                console.error("Error in useCustom:", error);
                if (onError) onError(error);         // Error callback
                throw error;
            } finally {
                setIsLoading(false);
            }
        },
        [action, onSuccess, onError]
    );

    return { triggerAction, isLoading, error };
};

export default useCustom;
