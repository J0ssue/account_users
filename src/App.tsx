import { Layout, Typography } from "antd";
import KHeader from "./components/molecules/KHeader";
import "./less/App.less";

const { Content } = Layout;
const { Title } = Typography;

function App() {
  return (
    <Layout className="App">
      <KHeader />
      <Content>Content</Content>
    </Layout>
  );
}

export default App;
