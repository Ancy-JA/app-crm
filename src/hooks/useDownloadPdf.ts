import { useState, useCallback } from "react";
import { gqlDataProvider } from "@/providers/data/dataProviders";
import { downloadPdf } from "@/utilities/download";

const useDownloadPdf = (boxId: string | number) => {
    const [isDownloading, setIsDownloading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const triggerDownload = useCallback(async () => {
        setIsDownloading(true);
        setError(null);

        try {
            if (!gqlDataProvider.getPdf) {
                throw new Error("The getPdf method is not implemented in the data provider.");
            }

            const pdfData = await gqlDataProvider.getPdf(String(boxId)); // Use getPdf
            if (pdfData) {
                downloadPdf(pdfData, `box_${boxId}`); // Trigger the download
            } else {
                throw new Error("No data received for download.");
            }
        } catch (err) {
            const error = err as Error;
            console.error("Error during PDF download:", error);
            setError(error);
        } finally {
            setIsDownloading(false);
        }
    }, [boxId]);

    return { triggerDownload, isDownloading, error };
};
export default useDownloadPdf;
