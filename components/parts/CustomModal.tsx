// components/parts/CustomModal.tsx

import React from "react";
import { Modal, Box, Typography, Button, SxProps, Grow } from "@mui/material";

interface CustomModalProps {
  open: boolean;
  title: string;
  content: string;
  onClose: () => void;
  onConfirm?: () => void;
  titleSx?: SxProps;
  contentSx?: SxProps;
  jump?: boolean; // 新規モーダル専用ジャンプフラグ
}

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "8px",
  boxShadow: 24,
  p: 4,
};

const CustomModal: React.FC<CustomModalProps> = ({
  open = false,
  title,
  content,
  onClose,
  onConfirm,
  titleSx,
  contentSx,
  jump = false,
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      {jump ? (
        // ジャンプモードだけGrowとtransformを組み合わせる
        <Grow in={open} style={{ transformOrigin: "top center" }}>
          <Box
            sx={{
              ...style,
              transform: open
                ? "translateY(0) scale(1)"
                : "translateY(-80px) scale(0.8)",
              transition: "transform 1.5s cubic-bezier(0.68, -0.55, 0.27, 1.55)",
            }}
          >
            <Typography
              variant="h6"
              component="h2"
              gutterBottom
              sx={{ fontWeight: "bold", ...titleSx }}
            >
              {title}
            </Typography>
            <Typography sx={{ mt: 2, ...contentSx }}>{content}</Typography>
            <Box sx={{ mt: 4, display: "flex", justifyContent: "flex-end" }}>
              <Button onClick={onClose} sx={{ mr: 2 }}>
                キャンセル
              </Button>
              {onConfirm && (
                <Button variant="contained" color="primary" onClick={onConfirm}>
                  確認
                </Button>
              )}
            </Box>
          </Box>
        </Grow>
      ) : (
        // 通常モードは普通にBoxだけ
        <Box sx={style}>
          <Typography
            variant="h6"
            component="h2"
            gutterBottom
            sx={{ fontWeight: "bold", ...titleSx }}
          >
            {title}
          </Typography>
          <Typography sx={{ mt: 2, ...contentSx }}>{content}</Typography>
          <Box sx={{ mt: 4, display: "flex", justifyContent: "flex-end" }}>
            <Button onClick={onClose} sx={{ mr: 2 }}>
              キャンセル
            </Button>
            {onConfirm && (
              <Button variant="contained" color="primary" onClick={onConfirm}>
                確認
              </Button>
            )}
          </Box>
        </Box>
      )}
    </Modal>
  );
};

export default CustomModal;
