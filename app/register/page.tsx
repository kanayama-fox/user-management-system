// app/register/page.tsx
"use client"; // タスク2-1 クライアントコンポーネントとしてマーク
import React from "react";
import RegisterForm from "../../components/RegisterForm"; //タスク2-3
import { Typography, Box } from "@mui/material";
import { useRouter } from "next/navigation"; //タスク2-2

// TODO: 新規登録ページを実装し、RegisterFormコンポーネントを使用する
// タスク3: RegisterFormの組み込みとprops設定
const RegisterPage: React.FC = () => {
  const router = useRouter();

 // タスク3-1: 登録成功時の処理（/usersへ遷移）
  const handleSuccess = () => {
    router.push("/users");
  };
 // タスク3-1: 登録失敗時の処理（エラーメッセージ表示）
  const handleError = (error: any) => {
    alert("登録に失敗しました");
    console.error(error);
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        新規登録ページ
      </Typography>
      <RegisterForm
        onSuccess={handleSuccess}
        onError={handleError}
        disabled={false}
      />
    </Box>
  );
};
export default RegisterPage;
