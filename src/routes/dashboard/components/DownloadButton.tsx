import React from "react";
import { Button } from "antd";
import useCustom from "@/hooks/useCustom";
import { gqlDataProvider } from "@/providers/data/dataProviders";
import { downloadPdf } from "@/utilities/download";
import { PdfRecord } from "@/routes/types";

interface DownloadButtonProps {
  boxId: string | number;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ boxId }) => {
  const { triggerAction, isLoading } = useCustom({
    action: async (params) => {
      const pdfData = await gqlDataProvider.getOne<PdfRecord>({
        resource: "pdf",
        id: params.boxId,
      });

      downloadPdf(pdfData.data.pdfData, `box_${params.boxId}`);
    },
    onSuccess: () => console.log("PDF downloaded successfully!"),
    onError: (error) => console.error("Failed to download PDF:", error),
  });

  return (
    <Button
      onClick={() => triggerAction({ boxId })}
      disabled={isLoading}
      type="primary"
    >
      {isLoading ? "Downloading..." : "Download PDF"}
    </Button>
  );
};

export default DownloadButton;
