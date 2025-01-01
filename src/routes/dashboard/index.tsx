import React from "react";
import { useTable, HttpError } from "@refinedev/core";
import { Table, Input, Typography, Space, Tag } from "antd";
import {
    DownloadOutlined,
    EyeOutlined,
    WhatsAppOutlined,
    CheckOutlined,
    CloseOutlined,
    EditOutlined,
    CarOutlined,
  } from "@ant-design/icons";
  


const { Title } = Typography;

export const DashboardPage: React.FC = () => {
    const {
        tableQueryResult,
        setFilters,
        pageSize,
        current,
        setCurrent,
        setPageSize,
        sorter,
        filters,
    } = useTable({
        resource: "getBoxHistoryAdmin",
        meta: {
            fields: [
                "total",
                "boxes { _id user { name phone } created_at delivery_date box_type status box_wines { name box_count } }",
            ],
            dataProviderName: "gqlDataProvider",
        },
        pagination: {
            mode: "server",
        },
    });

    const { data, isError, error } = tableQueryResult || {};

    const transformedData =
        data?.data?.map((item: any, index: number) => ({
            key: item._id || index,
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
            render: () => (
              <Space size="middle" style={{ gap: "12px" }}>
                {/* Download Icon */}
                <div
                  className="icon-circle"
                  style={{
                    backgroundColor: "#ba68c8",
                    borderRadius: "50%",
                    padding: " 0.5rem 0.625rem",
                  }}
                >
                  <DownloadOutlined style={{ color: "white", fontSize: "16px" }} />
                </div>
          
                {/* Eye Icon */}
                <div
                  className="icon-circle"
                  style={{
                    backgroundColor: "#ffb74d",
                    borderRadius: "50%",
                    padding: "0.5rem 0.625rem",
                  }}
                >
                  <EyeOutlined style={{ color: "white", fontSize: "16px" }} />
                </div>
          
                {/* WhatsApp Icon */}
                <div
                  className="icon-circle"
                  style={{
                    backgroundColor: "#81c784",
                    borderRadius: "50%",
                    padding: "0.5rem 0.625rem",
                  }}
                >
                  <WhatsAppOutlined style={{ color: "white", fontSize: "16px" }} />
                </div>
          
                {/* Check Icon */}
                <div
                  className="icon-circle"
                  style={{
                    backgroundColor: "#e0e0e0",
                    borderRadius: "50%",
                    padding: "0.5rem 0.625rem",
                  }}
                >
                  <CheckOutlined style={{ color: "#9e9e9e", fontSize: "16px" }} />
                </div>
          
                {/* Close Icon */}
                <div
                  className="icon-circle"
                  style={{
                    backgroundColor: "#e0e0e0",
                    borderRadius: "50%",
                    padding: "0.5rem 0.625rem",
                  }}
                >
                  <CloseOutlined style={{ color: "#9e9e9e", fontSize: "16px" }} />
                </div>
          
                {/* Edit Icon */}
                <div
                  className="icon-circle"
                  style={{
                    backgroundColor: "#e0e0e0",
                    borderRadius: "50%",
                    padding: "0.5rem 0.625rem",
                  }}
                >
                  <EditOutlined style={{ color: "#9e9e9e", fontSize: "16px" }} />
                </div>
          
                {/* Car Icon */}
                <div
                  className="icon-circle"
                  style={{
                    backgroundColor: "#e0e0e0",
                    borderRadius: "50%",
                    padding: "0.5rem 0.625rem",
                  }}
                >
                  <CarOutlined style={{ color: "#9e9e9e", fontSize: "16px" }} />
                </div>
              </Space>
            ),
          }
          
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

    if (isError) {
        return <div>Error: {error?.message || "Something went wrong"}</div>;
    }

    return (
        <div
            style={{
                padding: "0.625rem",
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
                scroll={{ x: "max-content" }} // Enables horizontal scroll
            />
        </div>
        </div>
    );
};
