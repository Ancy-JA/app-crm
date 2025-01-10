import React from "react";
import {
    DownloadOutlined,
    EyeOutlined,
    WhatsAppOutlined,
    CheckOutlined,
    CloseOutlined,
    EditOutlined,
    CarOutlined,
} from "@ant-design/icons";
import useDownloadPdf from "@/hooks/useDownloadPdf";
import { Tooltip } from "antd";

interface ActionButtonsProps {
    boxId: string; // Pass the boxId for downloading
    onView: () => void;
    phone: string;
}
const tooltipStyle = (bgColor: string) => ({
    backgroundColor: bgColor,
    color: "#fff", // White text
    borderRadius: "0.3125rem",
    //padding: "0rem 0rem",
    fontSize: "0.875rem",
});
const ActionButtons: React.FC<ActionButtonsProps> = ({ boxId, onView, phone }) => {
    const { triggerDownload, isLoading } = useDownloadPdf(boxId);

    return (
        <div style={{ display: "flex", gap: "12px" }}>
            {/* Download Button */}
            <Tooltip
                title={<span style={tooltipStyle("#ba68c8")}>Download PDF</span>}
                color="#ba68c8"
            >
            <div
                className="icon-circle"
                style={{
                    backgroundColor: "#ba68c8",
                    borderRadius: "50%",
                    padding: "0.5rem 0.625rem",
                    cursor: isLoading ? "not-allowed" : "pointer",
                    opacity: isLoading ? 0.6 : 1,
                }}
                onClick={!isLoading ? triggerDownload : undefined} // Prevent multiple calls
            >
                <DownloadOutlined style={{ color: "white", fontSize: "16px" }} />
            </div>
            </Tooltip>
            {/* View Button */}
            <Tooltip
                title={<span style={tooltipStyle("#ffb74d")}>View Details</span>}
                color="#ffb74d"
                overlayStyle={{ zIndex: 1000 }} 
            >
            <div
                className="icon-circle"
                style={{
                    backgroundColor: "#ffb74d",
                    borderRadius: "50%",
                    padding: "0.5rem 0.625rem",
                    cursor: "pointer",
                }}
                onClick={() => {
                    console.log("Eye icon clicked for boxId:", boxId); // Debug log
                    onView();
                }}
            >
                <EyeOutlined style={{ color: "white", fontSize: "16px" }} />
            </div>
            </Tooltip>
            {/* WhatsApp Button */}
            <Tooltip
                title={<span style={tooltipStyle("#81c784")}>WhatsApp</span>}
                color="#81c784"
            >
            <div
                className="icon-circle"
                style={{
                    backgroundColor: "#81c784",
                    borderRadius: "50%",
                    padding: "0.5rem 0.625rem",
                    cursor: "pointer",
                }}
                onClick={() => window.open(`https://wa.me/${phone}`, "_blank")}
            >
                <WhatsAppOutlined style={{ color: "white", fontSize: "16px" }} />
            </div>
            </Tooltip>
            {/* Additional Buttons */}
            <div className="icon-circle" style={{ backgroundColor: "#e0e0e0", borderRadius: "50%", padding: "0.5rem 0.625rem", cursor: "pointer" }}>
                <CheckOutlined style={{ color: "#9e9e9e", fontSize: "16px" }} />
            </div>
            <div className="icon-circle" style={{ backgroundColor: "#e0e0e0", borderRadius: "50%", padding: "0.5rem 0.625rem", cursor: "pointer" }}>
                <CloseOutlined style={{ color: "#9e9e9e", fontSize: "16px" }} />
            </div>
            <div className="icon-circle" style={{ backgroundColor: "#e0e0e0", borderRadius: "50%", padding: "0.5rem 0.625rem", cursor: "pointer" }}>
                <EditOutlined style={{ color: "#9e9e9e", fontSize: "16px" }} />
            </div>
            <div className="icon-circle" style={{ backgroundColor: "#e0e0e0", borderRadius: "50%", padding: "0.5rem 0.625rem", cursor: "pointer" }}>
                <CarOutlined style={{ color: "#9e9e9e", fontSize: "16px" }} />
            </div>
        </div>
    );
};

export default ActionButtons;
