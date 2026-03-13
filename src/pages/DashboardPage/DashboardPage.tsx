import { Card, Col, Row, Statistic, Typography } from "antd";

export function DashboardPage() {
  return (
    <div className="space-y-5">
      <div>
        <Typography.Title level={2} className="!mb-1">
          Dashboard
        </Typography.Title>
        <Typography.Text type="secondary">
          Boilerplate React + Tailwind + Ant Design + React Query + Keycloak.
        </Typography.Text>
      </div>

      <Row gutter={[16, 16]}>
        <Col span={24} md={8}>
          <Card>
            <Statistic title="Modules" value={5} />
          </Card>
        </Col>
        <Col span={24} md={8}>
          <Card>
            <Statistic title="HTTP Client" value="Axios" />
          </Card>
        </Col>
        <Col span={24} md={8}>
          <Card>
            <Statistic title="State Server" value="React Query" />
          </Card>
        </Col>
      </Row>
    </div>
  );
}
