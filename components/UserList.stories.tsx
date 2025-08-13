import type { Meta, StoryObj } from "@storybook/react";
import UserList from "./UserList";
import { User } from "../types/User";

const meta: Meta<typeof UserList> = {
  title: "Components/UserList", // ②タイトル指定
  component: UserList, // ②コンポーネント指定
  tags: ["autodocs"], // ②自動ドキュメント対応
};

export default meta;
type Story = StoryObj<typeof UserList>;

const sampleUsers: User[] = [
  {
    id: 1,
    name: "山田太郎",
    email: "taro@example.com",
    role: "admin",
    deleted: false,
  },
  {
    id: 2,
    name: "鈴木花子",
    email: "hanako@example.com",
    role: "user",
    deleted: false,
  },
];
export const Default: Story = {
  args: {
    users: sampleUsers,
  },
};
