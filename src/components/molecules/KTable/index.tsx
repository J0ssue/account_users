import { Button, Space, Table, Typography } from "antd";
import { useState } from "react";
import { ParsedUser } from "../../../utils";
import { ArrowDown, Edit, Trash } from "../../atoms/Icons/Icons";
import KTag, { TagType } from "../../atoms/KTag";
import KCard, { User } from "../KCard";
import "./styles.less";

interface Props {
  rowSelection: {
    selectedRowKeys: React.Key[];
    onChange: (ewSelectedRowKeys: React.Key[]) => void;
  };
  dataSource: ParsedUser[];
  onDelete: (id: number) => void;
  onGroupDelete: () => void;
}

const { Text } = Typography;

function KTable(props: Props) {
  const [loading, setLoading] = useState<boolean>(false);
  const tagMap: { [key: string]: TagType } = {
    ADMIN: "Admin",
    AGENT: "Agent",
    ACCOUNT_MANAGER: "Account Manager",
    EXTERNAL_REVIEWER: "External Reviewer",
  };
  const hasSelected = props.rowSelection.selectedRowKeys.length > 0;

  const columns = [
    {
      title: () => (
        <Text className="text-small-size text-card-description-color">
          User
        </Text>
      ),
      dataIndex: "user",
      render: (user: User) => (
        <KCard user={user} cardData={{ loading: !user, size: "small" }} />
      ),
    },
    {
      title: () => (
        <Text className="text-small-size text-card-description-color">
          Permission <ArrowDown />
        </Text>
      ),
      dataIndex: "role",
      render: (role: string) => <KTag type={tagMap[role]} />,
    },
    {
      title: "",
      dataIndex: "userId",
      render: (userId: number) => (
        <Space className="table-action-buttons">
          <Button className="center-button-content round-sm">
            <Edit />
            <span>Edit</span>
          </Button>
          <Button
            className="center-button-content round-sm color-button-white"
            icon={<Trash />}
            onClick={() => {
              props.onDelete(userId);
            }}
          />
        </Space>
      ),
    },
  ];

  return (
    <>
      <Space className="table-header" size="middle">
        <Text className="text-subtitle-size font-500 text-table-title">
          {props.rowSelection.selectedRowKeys.length} users selected
        </Text>
        <Button className="center-button-content round-sm" disabled>
          <Edit />
          <span>Edit</span>
        </Button>
        <Button
          className="center-button-content round-sm color-button-white"
          onClick={() => {
            setLoading(true);
            setTimeout(() => {
              props.onGroupDelete();
              setLoading(false);
            }, 1000);
          }}
          loading={loading}
          disabled={!hasSelected}
        >
          <Trash />
          <span>Delete</span>
        </Button>
      </Space>
      <Table
        className="k-table"
        rowSelection={props.rowSelection}
        columns={columns}
        dataSource={props.dataSource}
      />
    </>
  );
}

export default KTable;
