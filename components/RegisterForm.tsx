import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { TextField, Button, Box, Typography, Alert } from "@mui/material";
import { createUser } from "../utils/api";

// ①型定義 - ユーザー入力用型
interface RegisterFormInputs {
  name: string;
  email: string;
  role: string;
}
// ① 型定義 - Props型
interface RegisterFormProps {
  onSuccess?: () => void;
  onError?: (error: any) => void;
  disabled?: boolean;
}

// TODO: 新規登録フォームコンポーネントを実装
const RegisterForm: React.FC<RegisterFormProps> = ({
  onSuccess,
  onError,
  disabled,
}) => {
  //タスク② react-hook-form を使ってフォーム状態を管理
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>();

  // ③ 登録処理 - onSubmit関数でcreateUserを呼び出し成功・失敗時の処理を呼ぶ
  const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
    try {
      await createUser(data);
      if (onSuccess) onSuccess(); // 登録成功時の処理（ページ遷移など）
    } catch (error) {
      if (onError) onError(error); // エラー発生時の処理
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        新規登録
      </Typography>
      {/* ② react-hook-form の handleSubmit で onSubmitを呼び出す */}
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* ② 名前入力欄 - TextFieldにバリデーション設定 */}
        <TextField
          label="名前"
          fullWidth
          margin="normal"
          {...register("name", { required: "名前は必須です" })}
          error={!!errors.name}
          helperText={errors.name?.message}
        />{" "}
        {/* ② メール入力欄 - 必須かつメール形式バリデーション */}
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
        />{" "}
        {/* ② ロール入力欄 - 必須バリデーション */}
        <TextField
          label="ロール"
          fullWidth
          margin="normal"
          {...register("role", { required: "ロールは必須です" })}
          error={!!errors.role}
          helperText={errors.role?.message}
        />
        {/* ④ 送信ボタン - disabledはPropsから受け取った値を利用 */}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={disabled} // Propsで受け取った disabled を使う
          fullWidth
          sx={{ mt: 2 }}
        >
          登録
        </Button>
      </form>
    </Box>
  );
};

export default RegisterForm;
