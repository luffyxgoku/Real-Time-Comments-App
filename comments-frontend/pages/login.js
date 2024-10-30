import { useState } from "react";
import { useRouter } from "next/router";
import { TextField, Button, Box, Typography } from "@mui/material";
import styles from "../styles/Login.module.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleLogin = () => {
    if (username.trim()) {
      localStorage.setItem("username", username);
      router.push("/comment");
    } else {
      setError(true);
    }
  };

  const handleInputChange = (e) => {
    setUsername(e.target.value);
    if (error && e.target.value.trim()) {
      setError(false);
    }
  };

  return (
    <Box className={styles.loginContainer}>
      <h1 className={styles.logo}>KEEP_COMMENTING!</h1>
      <Typography
        className={styles.labelText}
        variant="h4"
        component="h1"
        gutterBottom
      >
        Hi! Please Login to comment
      </Typography>
      <TextField
        label="Username"
        variant="outlined"
        value={username}
        onChange={handleInputChange}
        error={error}
        helperText={error ? "Username is required" : ""}
        className={styles.inputField}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleLogin}
        className={styles.loginButton}
      >
        Login
      </Button>
    </Box>
  );
};

export default Login;
