// components/EditUserForm.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import EditUserForm from "./EditUserForm";

// TODO: メタデータを定義
const meta: Meta<typeof EditUserForm>= {
  title: "Components/EditUserForm", // TODO: ストーリーの表示名を設定
  component: EditUserForm, // TODO: 対象コンポーネントを指定
}

export default meta;

type Story = StoryObj<typeof EditUserForm>;

// TODO: ストーリーの定義
export const Default: Story = {
  args: {
    userId: 1,
    onSuccess: () => alert("更新成功"),
    onError: (error) => alert(`更新失敗: ${error}`),
    disabled: false,
  },
};
