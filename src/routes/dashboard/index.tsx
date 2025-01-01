import React from "react";
import { useTable } from "@refinedev/core";
import { Table, Input, Typography, Space, Tag } from "antd";

const { Title } = Typography;

export const DashboardPage: React.FC = () => {
    const { tableProps, setFilters, error } = useTable({
        resource: "getBoxHistoryAdmin",
        meta: {
            fields: [
                "total",
                "boxes { _id user { name phone } created_at delivery_date box_type status box_wines { name box_count } }",
            ],
            dataProviderName: "gqlDataProvider",
        },
        filters: {
            initial: [],
        },
        pagination: {
            mode: "server",
        },
    });

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    const columns = [
        {
            title: "User Details",
            dataIndex: "user",
            key: "userDetails",
            render: (user: { name: string; phone: string }) => (
                <Space>
                    <div
                        style={{
                            backgroundColor: "#87d068",
                            borderRadius: "50%",
                            width: 32,
                            height: 32,
                            color: "white",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        {user?.name?.slice(0, 2).toUpperCase() || "N/A"}
                    </div>
                    <div>
                        <strong>{user?.name || "Unknown"}</strong> <br />
                        {user?.phone || "N/A"}
                    </div>
                </Space>
            ),
        },
        {
            title: "Wine in Box",
            dataIndex: "box_wines",
            key: "wineBox",
            render: (wineBox: { name: string; box_count: number }[]) => (
                <div>
                    {wineBox.map((wine, index) => (
                        <div
                            key={index}
                            style={{ display: "flex", justifyContent: "space-between" }}
                        >
                            {wine.name}
                            <Tag color="green">{wine.box_count} times</Tag>
                        </div>
                    ))}
                </div>
            ),
        },
        {
            title: "Box Creation Date",
            dataIndex: "created_at",
            key: "creationDate",
        },
        {
            title: "Box Delivery Date",
            dataIndex: "delivery_date",
            key: "deliveryDate",
        },
        {
            title: "Box Type",
            dataIndex: "box_type",
            key: "boxType",
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (status: string) => (
                <span style={{ color: status === "Rejected" ? "red" : "green" }}>
                    {status}
                </span>
            ),
        },
    ];

    const handleSearch = (value: string) => {
        setFilters([
            {
                field: "search",
                operator: "contains",
                value,
            },
        ]);
    };

    return (
        <div
            style={{
                padding: "24px",
                backgroundColor: "#f0f2f5",
                minHeight: "100vh",
            }}
        >
            <Title level={4}>Wine Box History</Title>
            <Input.Search
                placeholder="🔍 Search..."
                onSearch={handleSearch}
                style={{ marginBottom: 16, maxWidth: 400 }}
                allowClear
            />
            <Table {...tableProps} columns={columns} bordered />
        </div>
    );
};
