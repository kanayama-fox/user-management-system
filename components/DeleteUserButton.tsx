import React from "react";
import { Button } from "@mui/material";
import { ronriDeleteUser } from "../utils/api";

interface DeleteUserButtonProps {
  userId: number;
  onDelete: (userId: number) => void; //onDelete「削除が成功したら呼び出される関数」
}

const DeleteUserButton: React.FC<DeleteUserButtonProps> = ({
  userId,
  onDelete,
}) => {
  const handleDelete = async () => {
    // 確認ダイアログ表示　資料のヒント参照
    if (!confirm("本当にこのユーザーを削除しますか？")) {
      return; // キャンセルなら処理中断
    }

    try {
      // 論理削除のAPIを呼び出す
      await ronriDeleteUser(userId);
      // 削除成功後に親へ通知
      onDelete(userId);
    } catch (error) {
      alert("削除に失敗しました");
      console.error(error);
    }
  };

  return (
    <Button
      variant="contained"
      color="error"
      size="small"
      onClick={handleDelete}
    >
      削除
    </Button>
  );
};
export default DeleteUserButton;
