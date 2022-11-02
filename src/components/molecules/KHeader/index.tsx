import { AutoComplete, Button, Input, PageHeader, Typography } from "antd";
import { Search } from "../../atoms/Icons/Icons";

const { Title } = Typography;

function KHeader() {
  return (
    <PageHeader
      title={<Title className="text-title-size">Account users</Title>}
      className="klaus-page-header"
      extra={[
        <AutoComplete key="1" options={[{ key: "3" }, { key: "8" }]}>
          <Input
            className="klaus-search-input"
            size="large"
            placeholder="Search"
            prefix={<Search />}
          />
        </AutoComplete>,
        <Button key="2" className="klaus-button-primary">
          Connect Users
        </Button>,
      ]}
    />
  );
}

export default KHeader;
