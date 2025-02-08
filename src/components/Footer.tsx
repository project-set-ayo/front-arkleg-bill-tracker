import { Box, Container, Typography, Link, IconButton } from "@mui/material";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{ py: 3, mt: 4, borderTop: 1, borderColor: "divider" }}
    >
      <Container
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Brand and Copyright */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography variant="body2" color="text.secondary">
            Brand & Copyright Placeholder
          </Typography>
        </Box>

        {/* Social Icons */}
        <Box>
          <IconButton component={Link} href="/" color="inherit">
            <TwitterIcon />
          </IconButton>
          <IconButton component={Link} href="/" color="inherit">
            <InstagramIcon />
          </IconButton>
          <IconButton component={Link} href="/" color="inherit">
            <FacebookIcon />
          </IconButton>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
