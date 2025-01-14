import React from "react";
import { Modal, Input, Row, Col, Form } from "antd";
import { ModalViewProps , UserDetails , Field } from "@/routes/types";

const inputStyle: React.CSSProperties = {
    backgroundColor: "#f3f4f6",
    pointerEvents: "none",
    border: "0.0625rem solid #d9d9d9",
};

const ModalView: React.FC<ModalViewProps> = ({ selectedBox, closeModal, isVisible }) => {
    const [form] = Form.useForm();

    if (!selectedBox) return null;

    const { user } = selectedBox;

    const fields: Field[] = [
        { label: "Full Name", name: "name", value: user?.name || "" },
        { label: "Full Address", name: "house", value: user?.house || "" },
        { label: "Email", name: "email", value: user?.email || "" },
        { label: "Country", name: "country", value: user?.country || "" },
        { label: "Postal Code", name: "zipcode", value: user?.zipcode || "" },
        { label: "City", name: "city", value: user?.city || "" },
        { label: "Phone", name: "phone", value: user?.phone || "" },
        { label: "Password", name: "password", value: "******" },
    ];

    // Initialize form fields with data
    React.useEffect(() => {
        if (user) {
            const initialValues = fields.reduce((acc, field) => {
                acc[field.name] = field.value;
                return acc;
            }, {} as Record<keyof UserDetails, string>);
            form.setFieldsValue(initialValues);
        }
    }, [user, form]);

    return (
        <Modal
            title={<div style={{ fontWeight: "bold" }}>Client Details</div>}
            open={isVisible}
            onCancel={closeModal}
            footer={null}
            centered
            closeIcon={<div style={{ fontSize: "1rem", cursor: "pointer" }}>×</div>}
        >
            <Form form={form} layout="vertical">
                <Row gutter={[16, 16]}>
                    {fields.map(({ label, name }) => (
                        <Col span={12} key={name}>
                            <Form.Item label={label} name={name}>
                                <Input readOnly style={inputStyle} />
                            </Form.Item>
                        </Col>
                    ))}
                </Row>
            </Form>
        </Modal>
    );
};

export default ModalView;
