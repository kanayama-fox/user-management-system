// src/components/UserList.tsx
import React from "react";
import { User } from "../types/User"; //// タスク2: User型をインポート
import UserCard from "./UserCard"; //タスク4-1: UserCardコンポーネントをインポート

interface UserListProps {
  users: User[];
  onDelete?: (userId: number) => void;  // タスク2-1-2追加
}

// タスク3-1 & 3-2: UserListコンポーネント作成、propsを受け取り、users配列をmapで一覧表示
const UserList: React.FC<UserListProps> = ({ users, onDelete }) => {
  return (
    <div>
      {/* タスク4-2: users配列の各ユーザー情報をUserCardコンポーネントに渡して表示 */}
      {users.map((user) => (
        <UserCard key={user.id} user={user} onDelete={onDelete}  />
      ))}
    </div>
  );
};

export default UserList;
