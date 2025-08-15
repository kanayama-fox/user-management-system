// components/parts/CustomCard.stories.tsx

import type { Meta, StoryObj } from "@storybook/react";
import CustomCard from "./CustomCard";
import CustomButton from "./CustomButton";

// TODO: メタデータ
const meta: Meta<typeof CustomCard> = {
  title: "Components/Parts/CustomCard", // Storybook 上でのカテゴリ名
  component: CustomCard, // コンポーネントのストーリーか指定
  tags: ["autodocs"],
};

export default meta;

// TODO: ストーリーの定義
type Story = StoryObj<typeof CustomCard>;

export const Default: Story = {
  args: {
    title: "カードタイトル",
    description: "これはカスタムカードの説明です。",
    actions: (
      <>
        <CustomButton variantType="secondary">アクション1</CustomButton>
        <CustomButton variantType="danger">アクション2</CustomButton>
      </>
    ),
  },
};

export const WithoutActions: Story = {
  args: {
    title: "アクションなしのカード",
    description: "アクションが含まれていないカードの説明。",
  },
};

//黒カード
export const 黒カード: Story = {
  args: {
    title: "黒カード",
    description: "背景色が黒で文字色が白のカスタムカードです。",
    sx: {
      backgroundColor: "black",
      color: "white",
      "& .MuiTypography-body2": { color: "white" }, // description だけ白文字に上書き
    },
  },
};

//任意画像
export const 背景画像カード: Story = {
  args: {
    title: "背景画像カード",
    description: "指定された画像を背景にしたカスタムカードです。",
    sx: {
      backgroundImage:
        'url("https://www.npf.co.jp/cms/npf/img/knowledge/molmot.png")',
      backgroundSize: "cover", //カードサイズに対して、縦横比を維持したまま、要素全体を覆うように拡大・縮小 する。
      backgroundPosition: "center", //背景画像の中心をカードの中央に合わせる
      color: "black",
      minWidth: 275, // 他カードと同じ
      mb: 2, // margin bottom
      p: 2, // padding
    },
  },
};

//正方形カード
export const 正方形カード: Story = {
  args: {
    title: "正方形カード",
    description: "正方形のカードです。背景色は白で文字は黒です。",
    sx: {
      width: 275,
      height: 275, // 正方形
      backgroundColor: "white", // 背景色を白に設定
      color: "black",            // 文字色は黒
    },
  },
};
