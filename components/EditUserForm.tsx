// src/components/EditUserForm.tsx

"use client";

import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  TextField,
  Button,
  Box,
  Typography,
  Alert,
  CircularProgress,
} from "@mui/material";
import { fetchUserById, updateUser } from "../utils/api";

//タスク2-2で使用
import { User } from "../types/User";

interface EditUserFormInputs {
  name: string;
  email: string;
  role: string;
}

// 2-2 コンポーネントProps定義
interface EditUserFormProps {
  userId: number; // 必須
  onSuccess?: () => void; // 更新成功時コールバック
  onError?: (error: any) => void; // 更新失敗時コールバック
  disabled?: boolean; // フォーム無効化オプション
}

// このコンポーネントが「EditUserFormProps で定義した型のpropsを受け取る」という意味。
const EditUserForm: React.FC<EditUserFormProps> = ({
  userId,
  onSuccess,
  onError,
  disabled = false,
}) => {
  // 4-1 useFormのセットアップ
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<EditUserFormInputs>();

  // 5-1 更新エラー表示用state
  const [submitError, setSubmitError] = React.useState<string | null>(null);

  // 3-2 useEffectでユーザー情報取得＆初期値セット
  const [loading, setLoading] = React.useState(true);
  const [fetchError, setFetchError] = React.useState<string | null>(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const user: User | null = await fetchUserById(userId);
        if (user) {
          setValue("name", user.name);
          setValue("email", user.email);
          setValue("role", user.role);
        } else{
            setFetchError("ユーザーが見つかりません");
        }
      } catch (err) {
        setFetchError("ユーザー情報の取得に失敗しました。" + err);
      } finally {
        setLoading(false);
      }
    };
    getUser();
  }, [userId, setValue]);

  // 5-2 送信処理定義
  const onSubmit: SubmitHandler<EditUserFormInputs> = async (values) => {
    setSubmitError(null);
    try {
      await updateUser(userId, values); // 5-1 updateUser呼び出し
      onSuccess?.(); // 5 成功時コールバック呼び出し
    } catch (error) {
      setSubmitError("更新に失敗しました"); // 5 失敗時エラーメッセージ
      onError?.(error); // 5 失敗時コールバック呼び出し
    }
  };

  if (loading) return <CircularProgress />; // 3-3 ローディング表示

  if (fetchError)
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        {fetchError}
      </Alert>
    ); // 3-2 エラー表示

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        ユーザー情報編集
      </Typography>

      {/* 4-2 MUIのフォーム構築 */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="名前"
          fullWidth
          margin="normal"
          {...register("name", { required: "名前は必須です" })} // 4-3 バリデーション
          error={!!errors.name} // 4-4 入力エラー表示
          helperText={errors.name?.message} // 4-4 入力エラー表示
          disabled={disabled || isSubmitting} // 4-5 無効化
        />
        <TextField
          label="メール"
          fullWidth
          margin="normal"
          {...register("email", {
            required: "メールは必須です",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "正しいメールアドレスを入力してください",
            },
          })}
          error={!!errors.email}
          helperText={errors.email?.message}
          disabled={disabled || isSubmitting}
        />
        <TextField
          label="ロール"
          fullWidth
          margin="normal"
          {...register("role", { required: "ロールは必須です" })}
          error={!!errors.role}
          helperText={errors.role?.message}
          disabled={disabled || isSubmitting}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={disabled || isSubmitting}
          fullWidth
          sx={{ mt: 2 }}
        >
          更新する
        </Button>
      </form>

      {/* 5-2 更新エラー表示 */}
      {submitError && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {submitError}
        </Alert>
      )}
    </Box>
  );
};

export default EditUserForm;
