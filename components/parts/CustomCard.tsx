// components/parts/CustomCard.tsx

import React from "react";
import { Card, CardContent, Typography, CardActions, SxProps } from "@mui/material";

// TODO: インターフェースを修正
interface CustomCardProps {
  title: string;
  description: string;
  actions?: React.ReactNode;
  sx?: SxProps; 
}



const CustomCard: React.FC<CustomCardProps> = ({
  title,
  description,
  actions,
  sx,
}) => {
  return (
    <Card sx={{ minWidth: 275, mb: 2, ...sx}}>
      <CardContent>
        {/* TODO: [titel]と[description]を表示*/}
        {/* タイトル */}
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        {/* 説明文 */}
        <Typography
          variant="body2"
          color="text.secondary"
          style={{ whiteSpace: "pre-line" }}
        >
          {description}
        </Typography>
      </CardContent>
      {/* actions があれば表示 */}
      {actions && <CardActions>{actions}</CardActions>}
    </Card>
  );
};

export default CustomCard;
