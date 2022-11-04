import { AutoComplete, Button, Input, PageHeader, Typography } from "antd";
import { Search } from "../../atoms/Icons/Icons";

interface Props {
  searchOptions: Array<{ label: string; value: string }>;
  onSearchSelect: (value: any) => void;
  onConnect: () => void;
}

const { Title } = Typography;

function KHeader(props: Props) {
  return (
    <PageHeader
      title={<Title className="text-title-size">Account users</Title>}
      className="klaus-page-header"
      extra={[
        <AutoComplete
          key="1"
          options={props.searchOptions}
          onSelect={props.onSearchSelect}
          onSearch={props.onSearchSelect}
        >
          <Input
            className="klaus-search-input"
            size="large"
            placeholder="Search"
            prefix={<Search />}
          />
        </AutoComplete>,
        <Button
          key="2"
          className="klaus-button-primary"
          onClick={props.onConnect}
        >
          Connect Users
        </Button>,
      ]}
    />
  );
}

export default KHeader;
