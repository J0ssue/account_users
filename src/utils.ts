import { User } from "./components/molecules/KCard";

export interface ParsedUser {
  key: number;
  user: User;
  role: string;
  userId: number;
}

interface UserOptions {
  label: string;
  value: string;
}

export type FoundUser = { index: number; user: ParsedUser } | null;

export function getUserOptions(users: User[]): UserOptions[] {
  const cUsers = [...users];

  return cUsers.map((user: User) => ({
    label: user.name,
    value: user.name,
  }));
}

export function getParsedUsers(users: User[]): ParsedUser[] {
  const cUsers = [...users];
  return cUsers.map((user: User) => ({
    key: user.id,
    user,
    role: user.role,
    userId: user.id,
  }));
}

export function getUserByName(name: string, users: ParsedUser[]) {
  const cUsers = [...users];
  return cUsers.filter((u: ParsedUser) => {
    return u.user.name.toLowerCase().includes(name.toLowerCase());
  });
}

export function findUserById(id: number, users: ParsedUser[]): FoundUser {
  const userIndex = users.findIndex((user: ParsedUser) => user.key === id);
  const user = users.find((user: ParsedUser) => user.key === id);

  return userIndex !== -1 && user !== undefined
    ? {
        index: userIndex,
        user: user,
      }
    : null;
}
