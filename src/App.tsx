import { Layout, Space } from "antd";
import { useEffect, useState } from "react";
import { User } from "./components/molecules/KCard";
import KHeader from "./components/molecules/KHeader";
import KTable from "./components/molecules/KTable";
import data from "./data.json";

import "./less/App.less";

const { Content } = Layout;

function App() {
  const [originalUsers, setOriginalUsers] = useState<
    Array<{ key: number; user: User; role: string }>
  >([]);

  const [userData, setUserData] = useState<
    Array<{ key: number; user: User; role: string }>
  >([]);

  const [userOptions, setUserOptions] = useState<
    Array<{ label: string; value: string }>
  >([]);

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const [searchValue, setSearchValue] = useState<string>("");

  const { users } = data;

  useEffect(() => {
    const parsedUsers = users.map((user) => ({
      key: user.id,
      user,
      role: user.role,
    }));
    const options = users.map((user) => ({
      label: user.name,
      value: user.name,
    }));
    setUserOptions(options);
    setUserData(parsedUsers);
    setOriginalUsers(parsedUsers);
  }, []);

  useEffect(() => {
    let searchId: number | undefined;
    if (searchValue !== "") {
      searchId = setTimeout(() => {
        const usersFound = originalUsers.filter((u) => {
          return u.user.name.toLowerCase().includes(searchValue.toLowerCase());
        });
        setUserData(usersFound);
      }, 500);
    } else if (searchValue === "" && userData.length < originalUsers.length) {
      setUserData(originalUsers);
    }
    return () => {
      clearTimeout(searchId);
    };
  }, [searchValue]);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const handleSearchValue = (value: string) => {
    setSearchValue(value);
  };

  return (
    <Layout className="App">
      <KHeader searchOptions={userOptions} onSearchSelect={handleSearchValue} />
      <Content>
        <Space
          className="bg-white round-lg space-around"
          direction="vertical"
          size="middle"
          style={{ display: "flex", marginTop: 18 }}
        >
          <KTable rowSelection={rowSelection} dataSource={userData} />
        </Space>
      </Content>
    </Layout>
  );
}

export default App;
