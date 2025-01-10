import React from "react";
import { Modal, Input, Row, Col } from "antd";
import { Box } from "@/routes/types";

interface ModalViewProps {
    selectedBox: Box | null;
    closeModal: () => void;
    isVisible: boolean;
}

const ModalView: React.FC<ModalViewProps> = ({ selectedBox, closeModal, isVisible }) => {
    if (!selectedBox) return null;

    return (
        <Modal
            title={<span style={{ fontWeight: "bold" }}>Client Details</span>} // Customize the title
            open={isVisible} // Updated to use `open` instead of `visible`
            onCancel={closeModal}
            footer={null}
            centered
            closeIcon={<span style={{ fontSize: "16px", cursor: "pointer" }}>×</span>} // Customize the close icon
        >
            <Row gutter={[16, 16]}>
                <Col span={12}>
                    <label>Full Name</label>
                    <Input
                        value={selectedBox.user.name || ""}
                        readOnly
                        style={{
                            backgroundColor: "#f3f4f6",
                            pointerEvents: "none",
                            border: "1px solid #d9d9d9",
                        }}
                    />
                </Col>
                <Col span={12}>
                    <label>Full Address</label>
                    <Input
                        value={selectedBox.user.house || ""}
                        readOnly
                        style={{
                            backgroundColor: "#f3f4f6",
                            pointerEvents: "none",
                            border: "1px solid #d9d9d9",
                        }}
                    />
                </Col>
                <Col span={12}>
                    <label>Email</label>
                    <Input
                        value={selectedBox.user.email || ""}
                        readOnly
                        style={{
                            backgroundColor: "#f3f4f6",
                            pointerEvents: "none",
                            border: "1px solid #d9d9d9",
                        }}
                    />
                </Col>
                <Col span={12}>
                    <label>Country</label>
                    <Input
                        value={selectedBox.user.country || ""}
                        readOnly
                        style={{
                            backgroundColor: "#f3f4f6",
                            pointerEvents: "none",
                            border: "1px solid #d9d9d9",
                        }}
                    />
                </Col>
                <Col span={12}>
                    <label>Postal Code</label>
                    <Input
                        value={selectedBox.user.zipcode || ""}
                        readOnly
                        style={{
                            backgroundColor: "#f3f4f6",
                            pointerEvents: "none",
                            border: "1px solid #d9d9d9",
                        }}
                    />
                </Col>
                <Col span={12}>
                    <label>City</label>
                    <Input
                        value={selectedBox.user.city || ""}
                        readOnly
                        style={{
                            backgroundColor: "#f3f4f6",
                            pointerEvents: "none",
                            border: "1px solid #d9d9d9",
                        }}
                    />
                </Col>
                <Col span={12}>
                    <label>Phone</label>
                    <Input
                        value={selectedBox.user.phone || ""}
                        readOnly
                        style={{
                            backgroundColor: "#f3f4f6",
                            pointerEvents: "none",
                            border: "1px solid #d9d9d9",
                        }}
                    />
                </Col>
                <Col span={12}>
                    <label>Password</label>
                    {/* Use regular Input instead of Input.Password to remove the eye icon */}
                    <Input
                        value="******"
                        readOnly
                        style={{
                            backgroundColor: "#f3f4f6",
                            pointerEvents: "none",
                            border: "1px solid #d9d9d9",
                        }}
                    />
                </Col>
            </Row>
        </Modal>
    );
};

export default ModalView;
