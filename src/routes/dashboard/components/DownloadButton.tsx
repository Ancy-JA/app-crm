import React from "react";
import { Button } from "antd";
import useDownloadPdf from "@/hooks/useDownloadPdf";

interface DownloadButtonProps {
    boxId: string | number; // Accept both string and number
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ boxId }) => {
    const { triggerDownload } = useDownloadPdf(boxId);

    const handleClick = async () => {
        try {
            await triggerDownload(); // Trigger the download process
        } catch (error) {
            console.error("Error downloading PDF:", error); // Log any errors
        }
    };

    return <Button onClick={handleClick}>Download PDF</Button>;
};

export default DownloadButton;
