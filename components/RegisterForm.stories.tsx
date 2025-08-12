// components/RegisterForm.stories.tsx
import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import RegisterForm from "./RegisterForm";
// TODO: メタデータ　タスク2
const meta: Meta<typeof RegisterForm> = {
  title: "Components/RegisterForm",
  component: RegisterForm,
  tags: ["autodocs"],
};

// TODO: ストーリーの定義 タスク3
type Story = StoryObj<typeof RegisterForm>;
// TODO: デフォルトストーリーの設定 タスク4
export const Default: Story = {
  args: {
    onSuccess: () => alert("登録成功しました！"),
    onError: (error) =>
      alert(`エラーが発生しました: ${error.message || error}`),
    disabled: false, // ボタンを押せるようにしておく設定
  },
};
export default meta;
