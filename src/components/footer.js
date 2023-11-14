import React from "react";
import {
  Stack,
  Container,
  Grid,
  Typography,
  Divider,
  Link,
  IconButton,
  Box,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import enamad from "../assets/images/enamad.png";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
// const useStyles = makeStyles((theme) => ({
//   footer: {
//     backgroundColor: theme.palette.background.paper,
//     padding: theme.spacing(6),
//   },
// }));

export default function Footer() {
  let { pathname } = useLocation();

  // const classes = useStyles();

  return (
    <>
      {pathname === "/" ||
      pathname === "/profile" ||
      pathname === "/register" ||
      pathname === "/login" ? null : (
        <Stack dir="rtl" bgcolor={"text.light"} mt="50px">
          <Container>
            <Grid
              paddingY="50px"
              height={"250px"}
              container
              spacing="2"
              columns={{ xs: 2, md: 12 }}
            >
              <Grid
                item
                xs={1}
                md={4}
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                alignItems="flex-start"
              >
                <Box>
                  <Typography
                    variant="h3"
                    fontSize="18px"
                    align="left"
                    pb="10px"
                  >
                    پلاک ۲۶
                  </Typography>
                  <Typography
                    variant="h4"
                    color="secondary.main"
                    fontSize="12px"
                    align="left"
                  >
                    پلتفرم آنلاین اطلاع رسانی و ثبت آگهی بازارآهن
                  </Typography>
                </Box>

                <Stack direction="row">
                  <IconButton
                    sx={{ p: "0", "&:hover": { bgcolor: "transparent" } }}
                  >
                    <InstagramIcon
                      sx={{
                        cursor: "pointer",
                        color: "text.main",
                        "&:hover": { color: "primary.main" },
                      }}
                    />
                  </IconButton>
                  <IconButton
                    sx={{ p: "0", "&:hover": { bgcolor: "transparent" } }}
                  >
                    <LinkedInIcon
                      sx={{
                        cursor: "pointer",
                        color: "text.main",
                        "&:hover": { color: "primary.main" },
                      }}
                    />
                  </IconButton>
                </Stack>
              </Grid>
              <Grid item xs={1} md={3}>
                <Stack alignItems="flex-start" px="10px"></Stack>
              </Grid>
              <Grid item xs={1} md={3}>
                <Stack alignItems="flex-start" px="10px"></Stack>
              </Grid>
              <Grid component={Link} href="/" item xs={1} md={2}>
                <img src={enamad} />
              </Grid>
            </Grid>
            <Divider />

            <Stack justifyContent="center">
              <Typography my="20px" variant="body2" color="textSecondary">
                حقوق این سایت محفوظ است.{" "}
              </Typography>
            </Stack>
          </Container>
        </Stack>
      )}
    </>
  );
}
