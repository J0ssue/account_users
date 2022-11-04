import { Alert, Layout, Modal, Skeleton, Space } from "antd";
import { useEffect, useState } from "react";
import { User } from "./components/molecules/KCard";
import KHeader from "./components/molecules/KHeader";
import KTable, { EditUser } from "./components/molecules/KTable";
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>();
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
    setSelectedRowKeys([]);
  }

  function findAndEditUser(newUserData: EditUser, users: ParsedUser[]) {
    const cUsers = [...users];
    const data: FoundUser = findUserById(newUserData.id, cUsers);
    if (data) {
      data.user.user.name = newUserData.name;
      data.user.user.email = newUserData.email;
      data.user.user.avatar = newUserData.avatar;
      cUsers[data.index] = data.user;
    }
    return cUsers;
  }

  function showAlert(message: string) {
    setSuccessMessage(message);
    setTimeout(() => {
      setSuccessMessage(null);
    }, 2000);
  }

  function handleUserEdit(user: EditUser, users?: ParsedUser[]) {
    const cUsers = findAndEditUser(user, users ? users : originalUsers);
    const unparsedUsers = cUsers.map((user) => user.user);
    initialize(unparsedUsers, cUsers);
    showAlert("User edited successfully!");
  }

  function handleGroupEdit(newUserData: { [key: number]: EditUser }) {
    const cUsers = [...originalUsers];
    const usersToEdit = selectedRowKeys.map((key) =>
      findUserById(Number(key), cUsers)
    );
    usersToEdit.forEach((user) => {
      if (user) {
        user.user.user.name = newUserData[user.user.key].name;
        user.user.user.email = newUserData[user.user.key].email;
        user.user.user.avatar = newUserData[user.user.key].avatar;
        cUsers[user.index] = user.user;
        setSelectedRowKeys([]);
      }
    });
    const unparsedUsers = cUsers.map((user) => user.user);
    initialize(unparsedUsers, cUsers);
    showAlert("Users edited successfully!");
  }

  return (
    <Layout className="App">
      <KHeader
        searchOptions={userOptions}
        onSearchSelect={(value) => setSearchValue(value)}
        onConnect={() => setIsModalOpen(true)}
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
              onUserEdit={handleUserEdit}
              onGroupEdit={handleGroupEdit}
              handleCancel={() => setSelectedRowKeys([])}
            />
          </Skeleton>
        </Space>
      </Content>
      {successMessage && (
        <Alert
          className="alert-success"
          message={successMessage}
          type="success"
          showIcon
        />
      )}
      <Modal
        title="Connect with users"
        open={isModalOpen}
        onOk={() => {
          showAlert("Succesfully Connected to users!");
          setIsModalOpen(false);
        }}
        onCancel={() => setIsModalOpen(false)}
      >
        <h1>Ready To Connect?</h1>
      </Modal>
    </Layout>
  );
}

export default App;
