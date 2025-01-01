import type { IResourceItem } from "@refinedev/core";

import {
  ContainerOutlined,
  DashboardOutlined,
  ShopOutlined,
  TeamOutlined,
} from "@ant-design/icons";

export const resources: IResourceItem[] = [
  {
    name: "dashboard",
    list: "/",
    meta: {
      label: "Dashboard",
      icon: <DashboardOutlined onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />,
    },
  },

  {
    name: "companies",
    list: "/companies",
    show: "/companies/:id",
    create: "/companies/create",
    edit: "/companies/edit/:id",
    meta: {
      label: "Companies",
      icon: (
        <ShopOutlined
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        />
      ),
    },
  },
  {
    name: "companies",
    identifier: "sales-companies",
    create: "/scrumboard/sales/create/company/create",
    meta: {
      hide: true,
    },
  },
  {
    name: "contacts",
    list: "/contacts",
    create: "/contacts/create",
    edit: "/contacts/edit/:id",
    show: "/contacts/show/:id",
    meta: {
      label: "Contacts",
      icon: <TeamOutlined onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />,
    },
  },
  {
    name: "quotes",
    list: "/quotes",
    create: "/quotes/create",
    edit: "/quotes/edit/:id",
    show: "/quotes/show/:id",
    meta: {
      label: "Quotes",
      icon: <ContainerOutlined onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}  />,
    },
  },
 
];
