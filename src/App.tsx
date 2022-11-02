import { Layout, Typography } from "antd";

const { Content, Header } = Layout;
const { Title } = Typography;

function App() {
  return (
    <Layout className="App">
      <Header className="bg-none">
        <Title className="text-title">Account users</Title>
        Header
      </Header>
      <Content>Content</Content>
    </Layout>
  );
}

export default App;
