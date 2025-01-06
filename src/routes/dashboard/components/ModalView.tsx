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
            title="Client Details"
            visible={isVisible}
            onCancel={closeModal}
            footer={null}
            centered
        >
            <Row gutter={[16, 16]}>
                <Col span={12}>
                    <label>Full Name</label>
                    <Input
                        value={selectedBox.user.name || "Not Available"}
                        readOnly
                        style={{
                            backgroundColor: "#f3f4f6",
                            pointerEvents: "none",
                            border: "0.0625rem solid #d9d9d9",
                        }}
                    />
                </Col>
                <Col span={12}>
                    <label>Full Address</label>
                    <Input
                        value={selectedBox.user.address || "Not Available"}
                        readOnly
                        style={{
                            backgroundColor: "#f3f4f6",
                            pointerEvents: "none",
                            border: "0.0625rem solid #d9d9d9",
                        }}
                    />
                </Col>
                <Col span={12}>
                    <label>Email</label>
                    <Input
                        value={selectedBox.user.email || "Not Available"}
                        readOnly
                        style={{
                            backgroundColor: "#f3f4f6",
                            pointerEvents: "none",
                            border: "0.0625rem solid #d9d9d9",
                        }}
                    />
                </Col>
                <Col span={12}>
                    <label>Country</label>
                    <Input
                        value={selectedBox.user.country || "Not Available"}
                        readOnly
                        style={{
                            backgroundColor: "#f3f4f6",
                            pointerEvents: "none",
                            border: "0.0625rem solid #d9d9d9",
                        }}
                    />
                </Col>
                <Col span={12}>
                    <label>Postal Code</label>
                    <Input
                        value={selectedBox.user.postalCode || "Not Available"}
                        readOnly
                        style={{
                            backgroundColor: "#f3f4f6",
                            pointerEvents: "none",
                            border: "0.0625rem solid #d9d9d9",
                        }}
                    />
                </Col>
                <Col span={12}>
                    <label>City</label>
                    <Input
                        value={selectedBox.user.city || "Not Available"}
                        readOnly
                        style={{
                            backgroundColor: "#f3f4f6",
                            pointerEvents: "none",
                            border: "0.0625rem solid #d9d9d9",
                        }}
                    />
                </Col>
                <Col span={12}>
                    <label>Phone</label>
                    <Input
                        value={selectedBox.user.phone || "Not Available"}
                        readOnly
                        style={{
                            backgroundColor: "#f3f4f6",
                            pointerEvents: "none",
                            border: "0.0625rem solid #d9d9d9",
                        }}
                    />
                </Col>
                <Col span={12}>
                    <label>Password</label>
                    <Input.Password
                        value="******"
                        readOnly
                        style={{
                            backgroundColor: "#f3f4f6",
                            pointerEvents: "none",
                            border: "0.0625rem solid #d9d9d9",
                        }}
                    />
                </Col>
            </Row>
        </Modal>
    );
};

export default ModalView;
