// components/parts/CustomButton.stories.tsx

import type { Meta, StoryObj } from "@storybook/react";;
import CustomButton from "./CustomButton";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";


const meta: Meta<typeof CustomButton> = {
  title: "Components/Parts/CustomButton",
  component: CustomButton,
  tags: ["autodocs"],
};

// TODO: メタデータのエクスポート
export default meta;
// TODO: ストーリーの定義
type Story = StoryObj<typeof CustomButton>;

export const Primary: Story = {
  args: {
    variantType: "primary",
    children: "Primary Button",
  },
};

export const Secondary: Story = {
  args: {
    variantType: "secondary",
    children: "Secondary Button",
  },
};

export const Danger: Story = {
  args: {
    variantType: "danger",
    children: "Danger Button",
  },
};
// TODO: 上記サンプルを参考に[Secondary][Danger]を設定する
// type LargeStory = StoryObj<typeof LargeButton>;

export const LargeDefault: Story = {
  args: {
    variantType: "primary",
    children: "Large Button",
    size: "large"
  },
};

export const WithStartIcon: Story = {
  args: {
    variantType: "primary",
    children: "Save",
    startIcon: <SaveIcon />,
  },
};

export const WithEndIcon: Story = {
  args: {
    variantType: "danger",
    children: "Delete",
    endIcon: <DeleteIcon />,
  },
};