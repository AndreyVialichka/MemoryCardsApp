import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import emptyAvatar from "../../../common/assets/avatar.png";
import { userNameSelector } from "../auth.selectors";
import { useAppSelector } from "common/hooks";

export default function Header() {
  const userName = useAppSelector(userNameSelector);
  const navigate = useNavigate();

  const handleGoToProfile = () => {
    navigate("/profile");
  };

  const handleLogin = () => {
    navigate("/login");
  };
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "8vh",
          backgroundColor: "white",
          marginBottom: "50px",
          boxShadow: "8px 10px 5px 2px rgba(0, 0, 0, .2)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "80%",
            justifyContent: "space-between",
          }}
        >
          <Typography
            id="form-login-title"
            variant="h4"
            component="h2"
            color="#6495ED"
          >
            LOGO
          </Typography>
          {userName ? (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
              onClick={handleGoToProfile}
            >
              {userName}
              <Avatar src={emptyAvatar} />
            </Box>
          ) : (
            <Box>
              <Button variant="contained" onClick={handleLogin}>
                Login
              </Button>
            </Box>
          )}
        </Box>
      </Box>
    </div>
  );
}
