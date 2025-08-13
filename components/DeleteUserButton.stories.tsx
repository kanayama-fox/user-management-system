import type { Meta, StoryObj } from "@storybook/react";
import DeleteUserButton from "./DeleteUserButton";
// TODO: メタデータ　タスク2
const meta: Meta<typeof DeleteUserButton> = {
  title: "Components/DeleteUserButton",
  component: DeleteUserButton,
  tags: ["autodocs"],
};

export default meta;

// TODO: ストーリーの定義 タスク3
type Story = StoryObj<typeof DeleteUserButton>;
// TODO: デフォルトストーリーの設定 タスク4
export const Default: Story = {
  args: {
    userId: 1, // 例としてユーザーIDを設定
    onDelete: (id: number) => {
      console.log(`Deleted user with ID: ${id}`);
    },
  },
};
