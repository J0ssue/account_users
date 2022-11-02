import { Layout, Space } from "antd";
import KTag from "./components/atoms/KTag";
import KCard from "./components/molecules/KCard";
import KHeader from "./components/molecules/KHeader";

import "./less/App.less";

const { Content } = Layout;

const defaultUser = {
  id: 1,
  name: "John Doe",
  email: "email@email.com",
  avatar: "https://joeschmoe.io/api/v1/random",
  role: "Card Description",
};

function App() {
  return (
    <Layout className="App">
      <KHeader />
      <Content>
        <Space
          className="bg-white round-sm space-around"
          direction="vertical"
          size="middle"
          style={{ display: "flex", marginTop: 18 }}
        >
          <KCard
            user={defaultUser}
            cardData={{ loading: false, size: "small" }}
          />
          <KTag type="External Reviewer" />
        </Space>
      </Content>
    </Layout>
  );
}

export default App;
