import { AutoComplete, Button, Input, PageHeader, Typography } from "antd";
import { Search } from "../../atoms/Icons/Icons";

const { Title } = Typography;

function KHeader() {
  return (
    <PageHeader
      title={<Title className="text-title">Account users</Title>}
      className="klaus-page-header"
      extra={[
        <AutoComplete options={[{}, {}]}>
          <Input
            className="klaus-search-input"
            size="large"
            placeholder="Search"
            prefix={<Search />}
          />
        </AutoComplete>,
        <Button className="klaus-button-primary">Connect Users</Button>,
      ]}
    />
  );
}

export default KHeader;
