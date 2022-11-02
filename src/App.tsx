import { Layout } from "antd";
import "./less/main.less";

const { Content, Footer, Header } = Layout;

function App() {
  return (
    <Layout className="App">
      <Header className="bg-none">Header</Header>
      <Content>Content</Content>
    </Layout>
  );
}

export default App;
