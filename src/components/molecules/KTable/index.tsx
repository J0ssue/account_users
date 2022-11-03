import { Button, Form, Input, Modal, Space, Table, Typography } from "antd";
import { useState } from "react";
import { ParsedUser } from "../../../utils";
import { ArrowDown, Edit, Trash } from "../../atoms/Icons/Icons";
import KTag, { TagType } from "../../atoms/KTag";
import KCard, { User } from "../KCard";
import "./styles.less";

export type EditUser = {
  id: number;
  name: string;
  email: string;
  avatar: string;
};

interface Props {
  rowSelection: {
    selectedRowKeys: React.Key[];
    onChange: (ewSelectedRowKeys: React.Key[]) => void;
  };
  dataSource: ParsedUser[];
  onDelete: (id: number) => void;
  onGroupDelete: () => void;
  onUserEdit: (user: EditUser) => void;
}

const { Text } = Typography;

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};

const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};

function KTable(props: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [form] = Form.useForm();
  const [userEditId, setUserEditId] = useState<number>();

  const showModal = (userId: number) => {
    setUserEditId(userId);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        const { user } = values;
        user.id = userEditId;
        props.onUserEdit(user);
        form.resetFields();
        setIsModalOpen(false);
      })
      .catch((errorInfo) => {
        throw new Error("Form submission failed");
      });
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
  };

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
          <Button
            className="center-button-content round-sm"
            onClick={() => showModal(userId)}
          >
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
      <Modal
        title="Edit User"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          {...layout}
          form={form}
          name="nest-messages"
          validateMessages={validateMessages}
        >
          <Form.Item
            name={["user", "name"]}
            label="Name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={["user", "email"]}
            label="Email"
            rules={[{ type: "email" }, { required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={["user", "avatar"]}
            label="Avatar"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default KTable;
