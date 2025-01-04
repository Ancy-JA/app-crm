import { useCallback } from "react";
import { useCustom } from "@refinedev/core";
import { downloadPdf } from "@/utilities/download";

interface GetBoxWinePrintCardResponse {
    data: {
        getBoxWinePrintCard: string; // The GraphQL query returns a base64-encoded PDF string
    };
}

const useDownloadPdf = (boxId: string | number) => {
    const triggerDownload = useCallback(async () => {
        try {
            const response = await fetch("https://vineoback-gh-qa.caprover2.innogenio.com/graphql", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },
                body: JSON.stringify({
                    query: `
                        query getBoxWinePrintCard($box: String!) {
                            getBoxWinePrintCard(box: $box)
                        }
                    `,
                    variables: { box: String(boxId) },
                }),
            });

            const result = await response.json();
            if (result.errors) {
                throw new Error(result.errors[0]?.message || "Failed to fetch PDF");
            }

            const pdfData = result.data.getBoxWinePrintCard;
            if (pdfData) {
                downloadPdf(pdfData, `box_${boxId}`);
            } else {
                throw new Error("No data received for download.");
            }
        } catch (error) {
            console.error("Error during PDF download:", error);
        }
    }, [boxId]);

    return {
        triggerDownload,
    };
};

export default useDownloadPdf;
