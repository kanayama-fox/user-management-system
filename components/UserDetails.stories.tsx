import { Meta, StoryObj } from "@storybook/react";
import UserDetails from "./UserDetails";
import { User } from "../types/User";
// TODO: メタデータ　タスク2
const meta: Meta<typeof UserDetails> = {
  title: "Components/UserDetails",
  component: UserDetails,
  tags: ["autodocs"],
};

export default meta;

// TODO: ストーリーの定義 タスク3
type Story = StoryObj<typeof UserDetails>;
// TODO: デフォルトストーリーの設定 タスク4
export const Default: Story = {
  args: {
    user: {
      id: 1,
      name: "山田太郎",
      email: "taro@example.com",
      role: "管理者",
      deleted: false,
    } as User, // User型に合わせてキャスト
  },
};
