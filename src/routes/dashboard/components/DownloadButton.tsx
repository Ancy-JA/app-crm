import React from "react";
import { Button } from "antd";
import useDownloadPdf from "@/hooks/useDownloadPdf";

interface DownloadButtonProps {
    boxId: string | number; // Accept both string and number
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ boxId }) => {
    const { triggerDownload, isDownloading } = useDownloadPdf(boxId);

    return (
        <Button onClick={triggerDownload} disabled={isDownloading} type="primary">
            {isDownloading ? "Downloading..." : "Download PDF"}
        </Button>
    );
};

export default DownloadButton;
