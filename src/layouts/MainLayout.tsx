import { Button, Layout, Menu, Typography } from "antd";
import { HomeOutlined, LogoutOutlined, ReadOutlined } from "@ant-design/icons";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useMemo } from "react";
import { useAuth } from "../common/contexts/AuthContext";

const { Header, Content, Sider } = Layout;

export function MainLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, profile } = useAuth();

  const selectedKeys = useMemo(() => {
    if (location.pathname.startsWith("/posts")) {
      return ["/posts"];
    }

    return ["/"];
  }, [location.pathname]);

  return (
    <Layout className="min-h-screen">
      <Sider breakpoint="lg" collapsedWidth="0" theme="light">
        <div className="px-4 py-5 text-lg font-semibold text-teal-700">
          IMAS FE
        </div>
        <Menu
          mode="inline"
          selectedKeys={selectedKeys}
          onClick={(info: { key: string }) => navigate(String(info.key))}
          items={[
            {
              key: "/",
              icon: <HomeOutlined />,
              label: "Dashboard",
            },
            {
              key: "/posts",
              icon: <ReadOutlined />,
              label: "Posts CRUD",
            },
          ]}
        />
      </Sider>

      <Layout>
        <Header className="flex items-center justify-between border-b border-slate-200 bg-white px-4">
          <Typography.Text className="text-slate-700">
            Hello {profile?.firstName || profile?.username || "Developer"}
          </Typography.Text>
          <Button icon={<LogoutOutlined />} onClick={() => void logout()}>
            Logout
          </Button>
        </Header>

        <Content className="bg-slate-50 p-4 lg:p-6">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
