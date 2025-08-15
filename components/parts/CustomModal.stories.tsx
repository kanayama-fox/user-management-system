// components/parts/CustomModal.stories.tsx

import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import CustomModal from "./CustomModal";
import CustomButton from "./CustomButton";
import { Box } from "@mui/material";

const meta: Meta<typeof CustomModal> = {
  title: "Parts/CustomModal",
  component: CustomModal,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof CustomModal>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <Box>
        <CustomButton variantType="primary" onClick={() => setOpen(true)}>
          モーダルを開く
        </CustomButton>
        <CustomModal
          open={open}
          title="サンプルモーダル"
          content="ここがモーダル本文です"
          onClose={() => setOpen(false)}
          onConfirm={() => {
            alert("確認ボタンがクリックされました");
            setOpen(false);
          }}
        />
      </Box>
    );
  },
};

export const BoldTitle: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <Box>
        <CustomButton variantType="primary" onClick={() => setOpen(true)}>
          太文字タイトルモーダルを開く
        </CustomButton>
        <CustomModal
          open={open}
          title="太文字タイトル"
          titleSx={{ fontWeight: 900 }}
          content="タイトルが太文字で強調されたモーダルです。"
          onClose={() => setOpen(false)}
          onConfirm={() => {
            alert("確認ボタンがクリックされました");
            setOpen(false);
          }}
        />
      </Box>
    );
  },
};

export const RedContentModal: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <Box>
        <CustomButton variantType="primary" onClick={() => setOpen(true)}>
          赤文字モーダルを開く
        </CustomButton>
        <CustomModal
          open={open}
          title="赤文字モーダル"
          content="本文が赤文字になります"
          contentSx={{ color: "red" }}
          onClose={() => setOpen(false)}
          onConfirm={() => {
            alert("確認ボタンがクリックされました");
            setOpen(false);
          }}
        />
      </Box>
    );
  },
};

export const JumpModal: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <Box>
        <CustomButton onClick={() => setOpen(true)}>
          ジャンプモーダルを開く
        </CustomButton>
        <CustomModal
          open={open}
          title="ジャンプモーダル"
          content="飛び出すように表示されるモーダルです"
          onClose={() => setOpen(false)}
          onConfirm={() => {
            alert("確認ボタンがクリックされました");
            setOpen(false);
          }}
          jump={true} // ← ジャンプモード
        />
      </Box>
    );
  },
};
