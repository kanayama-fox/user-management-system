// src/components/UserList.tsx

import React, { useState } from "react";
import { User } from "../types/User";
import CustomCard from "./parts/CustomCard";
import CustomButton from "./parts/CustomButton";
import CustomModal from "./parts/CustomModal";
import { ronriDeleteUser } from "@/utils/api";
import { Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

interface UserListProps {
  users: User[];
  onDelete?: (userId: number) => void; // 削除成功後に親へ通知
}

const UserList: React.FC<UserListProps> = ({ users, onDelete }) => {
  //
  // モーダル開閉状態
  const [modalOpen, setModalOpen] = useState(false);
  // 削除対象ユーザーID
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  // ---------- ----------
  // users からユニークIDだけ抽出してプルダウン用に使う
  const [filterId, setFilterId] = useState<number | "">(""); // ID検索用 state
  const idList = Array.from(new Set(users.map((u) => u.id)));
  const [filterRole, setFilterRole] = useState<string | "">(""); // 役職検索用
  const roleList = Array.from(new Set(users.map((u) => u.role)));
  // ------------------------------
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc"); //並び替え

  // ------------------------------

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

  const displayedUsers = users
    .filter((user) => {
      const idMatch = filterId === "" || user.id === filterId;
      const roleMatch = filterRole === "" || user.role === filterRole;
      return idMatch && roleMatch;
    })
    .sort((a, b) => (sortOrder === "asc" ? a.id - b.id : b.id - a.id));

  return (
    <div>
      {/* プルダウン用Box */}
      <Box display="flex" gap={2} mb={2}>
        {/* ID検索プルダウン */}
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>ID</InputLabel>
          <Select
            value={filterId}
            onChange={(e) => setFilterId(e.target.value as number | "")}
            label="ID"
          >
            <MenuItem value="">全て</MenuItem>
            {idList.map((id) => (
              <MenuItem key={id} value={id}>
                {id}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {/* 役職検索プルダウン */}
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>役職</InputLabel>
          <Select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value as string | "")}
            label="役職"
          >
            <MenuItem value="">全て</MenuItem>
            {roleList.map((role) => (
              <MenuItem key={role} value={role}>
                {role}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {/* 並び替えプルダウン */}
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>ID 並び替え</InputLabel>
          <Select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
            label="ID 並び替え"
          >
            <MenuItem value="asc">昇順</MenuItem>
            <MenuItem value="desc">降順</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* ユーザー一覧 */}
      {displayedUsers.length > 0 &&
        displayedUsers.map((user) =>
          user ? (
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
          ) : null
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
