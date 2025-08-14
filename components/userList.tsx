// src/components/UserList.tsx
import React from "react";
import { User } from "../types/User";
import CustomCard from "./parts/CustomCard";
import CustomButton from "./parts/CustomButton";
import { ronriDeleteUser } from "@/utils/api";

interface UserListProps {
  users: User[];
  onDelete?: (userId: number) => void;
}

const UserList: React.FC<UserListProps> = ({ users, onDelete }) => {
  // 削除ボタンを押したときの処理
  const handleDelete = async (userId: number) => {
    if (!confirm("本当にこのユーザーを削除しますか？")) return;
    try {
      // 論理削除のAPIを呼び出す
      await ronriDeleteUser(userId);
      // 削除成功後に親へ通知
      if (onDelete) onDelete(userId);
    } catch (error) {
      alert("削除に失敗しました");
      console.error(error);
    }
  };

  return (
    <div>
      {users &&
        users.length > 0 &&
        users.map(
          (user) =>
            user && (
              <CustomCard
                key={user.id}
                title={user.name}
                description={`メール: ${user.email}\n役割: ${user.role}`}
                actions={
                  <>
                    <CustomButton
                      variantType="secondary"
                      size="small"
                      component="a"
                      href={`/users/${user.id}/edit`}
                    >
                      編集
                    </CustomButton>

                    <CustomButton
                      variantType="secondary"
                      size="small"
                      component="a"
                      href={`/users/${user.id}/details`}
                    >
                      詳細
                    </CustomButton>

                    {onDelete && (
                      <CustomButton
                        variantType="danger"
                        size="small"
                        onClick={() => handleDelete(user.id)}
                      >
                        削除
                      </CustomButton>
                    )}
                  </>
                }
              />
            )
        )}
    </div>
  );
};

export default UserList;
