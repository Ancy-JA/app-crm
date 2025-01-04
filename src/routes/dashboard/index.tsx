import React, { useState, useEffect } from "react";
import { useTable } from "@refinedev/core";
import { Table, Input, Typography, Space, Tag } from "antd";
import ActionButtons from "@/routes/dashboard/components/actionButtons";
const { Title } = Typography;

export const DashboardPage: React.FC = () => {
    const {
        tableQueryResult,
        setFilters,
        pageSize,
        current,
        setCurrent,
        setPageSize,
    } = useTable({
        resource: "getBoxHistoryAdmin",
        meta: {
            fields: [
                "total",
                "boxes { _id user { name phone } created_at delivery_date box_type status box_wines { name box_count } }",
            ],
            dataProviderName: "gqlDataProvider", // Custom provider
        },
        pagination: {
            mode: "server",
        },
    });

    const { data, isError, error } = tableQueryResult || {};

    const transformedData =
        data?.data?.map((item: any) => ({
            key: item._id,
            ...item,
        })) || [];

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
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                            }}
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
            render: (date: string) => new Date(date).toLocaleDateString(),
        },
        {
            title: "Box Delivery Date",
            dataIndex: "delivery_date",
            key: "deliveryDate",
            render: (date: string) => new Date(date).toLocaleDateString(),
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
            render: (status: number) => (
                <span style={{ color: status === 40 ? "green" : "red" }}>
                    {status === 40 ? "Approved" : "Rejected"}
                </span>
            ),
        },
        {
            title: "Behavior",
            key: "behavior",
            render: (record: any) => (
                <ActionButtons
                    boxId={record.key}
                    onView={() => console.log(`Viewing box ${record.key}`)}
                    phone={record.user?.phone || ""}
                />
            ),
        },
    ];

    const [searchTerm, setSearchTerm] = useState<string>("");
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>("");

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 500);

        return () => {
            clearTimeout(handler);
        };
    }, [searchTerm]);

    useEffect(() => {
        if (debouncedSearchTerm) {
            setFilters([
                {
                    field: "searchString",
                    operator: "contains",
                    value: debouncedSearchTerm,
                },
            ]);
        } else {
            setFilters([]);
        }
    }, [debouncedSearchTerm, setFilters]);

    if (isError) {
        return <div>Error: {error?.message || "Something went wrong"}</div>;
    }

    return (
        <div
            style={{
                padding: "1rem",
                backgroundColor: "#f0f2f5",
                minHeight: "100vh",
            }}
        >
            <Title level={4}>Wine Box History</Title>
            <Input.Search
                placeholder="🔍 Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ marginBottom: 16, maxWidth: 400 }}
                allowClear
            />
            <div style={{ overflowX: "auto" }}>
                <Table
                    dataSource={transformedData}
                    columns={columns}
                    bordered
                    pagination={{
                        current,
                        pageSize,
                        total: data?.total || 0,
                        onChange: (page, pageSize) => {
                            setCurrent(page);
                            setPageSize(pageSize);
                        },
                    }}
                    scroll={{ x: "max-content" }}
                />
            </div>
        </div>
    );
};
