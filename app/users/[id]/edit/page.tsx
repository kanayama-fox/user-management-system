// app/users/[id]/edit/page.tsx

"use client"; // クライアントコンポーネントとしてマーク

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Typography, Box, CircularProgress, Alert } from "@mui/material";
import EditUserForm from "@/components/EditUserForm";

// TODO: URLパラメータからユーザーIDを取得し、EditUserFormコンポーネントに渡す
const EditUserPage: React.FC = () => {
  const params = useParams();
  const router = useRouter();

  const [userId, setUserId] = useState<number>();
  const [error, setError] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);

  // タスク3-1: 登録成功時の処理（/usersへ遷移）
  const handleSuccess = () => {
    router.push("/users");
  };
 // タスク3-1: 登録失敗時の処理（エラーメッセージ表示）
  const handleError = (error: any) => {
    alert("登録に失敗しました");
    console.error(error);
  };

  useEffect(() => {
    try {
      if (!params?.id) throw new Error("ユーザーIDがURLに存在しません");
      const idNum = Number(params.id);
      if (isNaN(idNum)) throw new Error("ユーザーIDが数値ではありません");
      setUserId(idNum);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setIsReady(true);
    }
  }, [params]);

  if (!isReady) {
    return <CircularProgress />;
  }

  if (error) {
    return (
      <Box sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  // ここで userId が取得できているかコンソール確認だけ（フォーム組み込みは次タスクで）
  console.log("取得した userId:", userId);

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        ユーザー編集
      </Typography>
      <EditUserForm
        userId={userId}
        onSuccess={handleSuccess}
        onError={handleError}
        disabled={false}
      />
    </Box>
  );
};

export default EditUserPage;
