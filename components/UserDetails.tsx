import React from "react";
import { User } from "../types/User"; // パスは環境に合わせて修正
import { Typography, Box } from "@mui/material";

interface UserDetailsProps {
  user: User;
}

const UserDetails: React.FC<UserDetailsProps> = ({ user }) => {
  return (
    <>
      {/* コンポーネント見出し */}
      <Typography variant="h6" gutterBottom>
        ユーザー詳細
      </Typography>

      <Box sx={{ mb: 1 }}>
        <Typography variant="body1">ID: {user.id}</Typography>
        <Typography variant="body1">名前: {user.name}</Typography>
        <Typography variant="body1">メールアドレス: {user.email}</Typography>
        <Typography variant="body1">役職: {user.role}</Typography>
      </Box>
    </>
  );
};

export default UserDetails;
