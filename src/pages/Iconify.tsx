/* eslint-disable @typescript-eslint/no-explicit-any */
// icons
import { Icon } from "@iconify/react";
// @mui
import { Box, SxProps } from "@mui/material";

// ----------------------------------------------------------------------

interface IconifyProps {
  icon: string | any;
  sx?: SxProps;
  onClick?: () => void;
}

export default function Iconify({ icon, sx, onClick, ...other }: IconifyProps) {
  return (
    <Box
      component={Icon}
      icon={icon}
      sx={{ ...sx }}
      {...other}
      onClick={onClick}
    />
  );
}
