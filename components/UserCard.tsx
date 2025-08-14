import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import Link from "next/link";
import React from "react";
import { User } from "../types/User";
import CustomButton from "./parts/CustomButton";
import { ronriDeleteUser } from "../utils/api";

interface UserCardProps {
  user: User;
  onDelete?: (userId: number) => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, onDelete }) => {

  const handleDelete = async () => {
      // 確認ダイアログ表示　資料のヒント参照
      if (!confirm("本当にこのユーザーを削除しますか？")) {
        return; // キャンセルなら処理中断
      }
  
      try {
        // 論理削除のAPIを呼び出す
        await ronriDeleteUser(user.id);
        // 削除成功後に親へ通知
        if(onDelete) onDelete(user.id);
      } catch (error) {
        alert("削除に失敗しました");
        console.error(error);
      }
    };

  return (
    <Card sx={{ minWidth: 275, mb: 2 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {user.name}
        </Typography>
        <Typography color="text.secondary">{user.email}</Typography>
        <Typography variant="body2">役割: {user.role}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small" component={Link} href={`/users/${user.id}/edit`}>
          編集
        </Button>
        <Button
          size="small"
          component={Link}
          href={`/users/${user.id}/details`}
        >
          詳細
        </Button>
        {onDelete && (
          <CustomButton
            variantType="danger"
            size="small"
            onClick={handleDelete}
          >
            削除
          </CustomButton>
        )}
      </CardActions>
    </Card>
  );
};

export default UserCard;
