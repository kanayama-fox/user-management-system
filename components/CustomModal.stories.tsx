// components/parts/CustomModal.stories.tsx

import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import CustomModal from "./parts/CustomModal";
import CustomButton from "./parts/CustomButton";
import { Box } from "@mui/material";

// TODO: メタデータ
const meta: Meta<typeof CustomModal> = {
  title: "Parts/CustomModal",
  component: CustomModal,
  tags: ["autodocs"],
};

export default meta;
// TODO: ストーリーの定義
type Story = StoryObj<typeof CustomModal>;

// TODO: デフォルトストーリーの作成
export const Default: Story = {
  render: () => {
    // open状態を管理する
    const [open, setOpen] = useState(false);
    // TODO: Propを渡す
    // onCloceはsetOpenにfalseを渡す
    // onConfirmはalert()を使ってクリックしたことを知らせて
    // setOpenにfalseを渡す

    return (
      <Box>
        {/* ボタンを押したらモーダルを開く */}
        <CustomButton variantType="primary" onClick={() => setOpen(true)}>
          モーダルを開く
        </CustomButton>

        {/* モーダル本体 */}
        <CustomModal
          open={open} // 開閉状態 propsとuseState
          title="サンプルモーダル" // タイトル
          content="ここがモーダル本文です" // 本文
          onClose={() => setOpen(false)} // 閉じるボタン・モーダル外クリック
          onConfirm={() => {
            alert("確認ボタンがクリックされました"); // 確認アクション
            setOpen(false); // モーダルを閉じる
          }}
        />
      </Box>
    );
  },
};
