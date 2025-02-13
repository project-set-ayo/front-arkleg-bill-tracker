import { Box, Typography, Link, IconButton, Stack } from "@mui/material";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";

const socialLinks = [
  {
    name: "Twitter",
    url: "https://x.com/Arklegbilltrack",
    icon: <TwitterIcon />,
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/arkleg_bill_tracker/",
    icon: <InstagramIcon />,
  },
  {
    name: "Facebook",
    url: "https://www.facebook.com/levelupconsultingAR",
    icon: <FacebookIcon />,
  },
];

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{ py: 3, mt: 4, borderTop: 1, borderColor: "divider" }}
    >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        alignItems="center"
        justifyContent="space-between"
        sx={{ px: 3 }}
      >
        {/* Brand and Copyright */}
        <Typography variant="body2" color="text.secondary">
          Arkleg Bill Tracker - Policy for the People
        </Typography>

        {/* Social Icons */}
        <Stack direction="row" spacing={1}>
          {socialLinks.map(({ name, url, icon }) => (
            <IconButton
              key={name}
              component={Link}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              color="inherit"
              aria-label={name}
            >
              {icon}
            </IconButton>
          ))}
        </Stack>
      </Stack>
    </Box>
  );
};

export default Footer;
