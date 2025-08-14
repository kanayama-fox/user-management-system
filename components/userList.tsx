// src/components/UserList.tsx

import React, { useState } from "react";
import { User } from "../types/User";
import CustomCard from "./parts/CustomCard";
import CustomButton from "./parts/CustomButton";
import CustomModal from "./parts/CustomModal";
import { ronriDeleteUser } from "@/utils/api";

interface UserListProps {
  users: User[];
  onDelete?: (userId: number) => void; // 削除成功後に親へ通知
}

const UserList: React.FC<UserListProps> = ({ users, onDelete }) => {
  // モーダル開閉状態
  const [modalOpen, setModalOpen] = useState(false);
  // 削除対象ユーザーID
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  // 削除ボタン押下時にモーダルを開く
  const handleOpenModal = (userId: number) => {
    setSelectedUserId(userId);
    setModalOpen(true);
  };

  // 削除処理
  const handleDelete = async (userId: number) => {
    try {
      await ronriDeleteUser(userId); // 論理削除
      if (onDelete) onDelete(userId); // 親へ通知してリスト更新
      setModalOpen(false); // モーダルを閉じる
    } catch (error) {
      alert("削除に失敗しました");
      console.error(error);
    }
  };

  return (
    <div>
      {/* ユーザー一覧 */}
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
                    {/* 編集ボタン */}
                    <CustomButton
                      variantType="secondary"
                      size="small"
                      component="a"
                      href={`/users/${user.id}/edit`}
                    >
                      編集
                    </CustomButton>

                    {/* 詳細ボタン */}
                    <CustomButton
                      variantType="secondary"
                      size="small"
                      component="a"
                      href={`/users/${user.id}/details`}
                    >
                      詳細
                    </CustomButton>

                    {/* 削除ボタン */}
                    <CustomButton
                      variantType="danger"
                      size="small"
                      onClick={() => handleOpenModal(user.id)}
                    >
                      削除
                    </CustomButton>
                  </>
                }
              />
            )
        )}

      {/* 削除確認モーダル（最外側でレンダリング） */}
      <CustomModal
        open={modalOpen}
        title="ユーザー削除の確認"
        content="本当にこのユーザーを削除しますか？"
        onClose={() => setModalOpen(false)}
        onConfirm={() => {
          if (selectedUserId !== null) {
            handleDelete(selectedUserId); // 確認ボタンで削除処理
          }
        }}
      />
    </div>
  );
};

export default UserList;
