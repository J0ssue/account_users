import { Layout, Skeleton, Space } from "antd";
import { useEffect, useState } from "react";
import { User } from "./components/molecules/KCard";
import KHeader from "./components/molecules/KHeader";
import KTable from "./components/molecules/KTable";
import data from "./data.json";

import "./less/App.less";
import {
  findUserById,
  FoundUser,
  getParsedUsers,
  getUserByName,
  getUserOptions,
  ParsedUser,
} from "./utils";

const { Content } = Layout;

function App() {
  const [loading, setLoading] = useState<boolean>(true);

  const [originalUsers, setOriginalUsers] = useState<ParsedUser[]>([]);

  const [userData, setUserData] = useState<ParsedUser[]>([]);

  const [userOptions, setUserOptions] = useState<
    Array<{ label: string; value: string }>
  >([]);

  // keep track of selected users
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  // keep track of search input value
  const [searchValue, setSearchValue] = useState<string>("");

  const { users } = data;

  useEffect(() => {
    fetchData();
  }, []);

  // search functionality
  useEffect(() => {
    let searchId: number | undefined;
    if (searchValue !== "") {
      searchId = setTimeout(() => {
        const usersFound = getUserByName(searchValue, originalUsers);
        setUserData(usersFound);
      }, 500);
    } else if (searchValue === "" && userData.length < originalUsers.length) {
      setUserData(originalUsers);
    }
    return () => {
      clearTimeout(searchId);
    };
  }, [searchValue]);

  // mock fetching initial data
  function fetchData() {
    setLoading(true);
    setTimeout(() => {
      initialize(users);
    }, 1000);
  }

  // initialize users data
  function initialize(users: User[], withParsedUsers?: ParsedUser[]) {
    let parsedUsers: ParsedUser[] = getParsedUsers(users);
    if (withParsedUsers) {
      parsedUsers = withParsedUsers;
    }
    const options = getUserOptions(users);
    setUserOptions(options);
    setUserData(parsedUsers);
    setOriginalUsers(parsedUsers);
    setLoading(false);
  }

  // Table config.
  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys: React.Key[]) =>
      setSelectedRowKeys(newSelectedRowKeys),
  };

  function handleDelete(id: number) {
    const cUsers = [...originalUsers];

    const foundUser: FoundUser = findUserById(id, originalUsers);
    const usersWithoutFoundUser = cUsers.filter(
      (user) => user.userId !== foundUser?.user.userId
    );
    const unparsedUsers = usersWithoutFoundUser.map((user) => user.user);
    initialize(unparsedUsers, usersWithoutFoundUser);
  }

  function handleGroupDelete() {
    const cUsers = [...originalUsers];
    const unselectedUsers = cUsers.filter(
      (user) => !selectedRowKeys.includes(user.userId)
    );
    const unparsedUsers = unselectedUsers.map((user) => user.user);
    initialize(unparsedUsers, unselectedUsers);
  }

  return (
    <Layout className="App">
      <KHeader
        searchOptions={userOptions}
        onSearchSelect={(value) => setSearchValue(value)}
      />
      <Content>
        <Space
          className="bg-white round-lg space-around"
          direction="vertical"
          size="middle"
          style={{ display: "flex", marginTop: 18 }}
        >
          <Skeleton
            loading={loading}
            active
            paragraph={{
              rows: 30,
            }}
          >
            <KTable
              rowSelection={rowSelection}
              dataSource={userData}
              onDelete={handleDelete}
              onGroupDelete={handleGroupDelete}
            />
          </Skeleton>
        </Space>
      </Content>
    </Layout>
  );
}

export default App;
