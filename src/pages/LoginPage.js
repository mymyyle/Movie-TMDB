import { Button, Stack, Typography } from "@mui/material";
import React from "react";
import { FormProvider, FTextField } from "../components/form";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { Box } from "@mui/system";

const LoginSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});
const defaultValues = {
  username: "",
  password: "",
};

const LoginPage = () => {
  const methods = useForm({
    defaultValues,
    resolver: yupResolver(LoginSchema),
  });
  const { handleSubmit } = methods;
  const auth = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const onSubmit = (data) => {
    auth.login(data.username, () => {
      const from = location.state?.from?.pathname || "/";
      navigate(from, { replace: true });
    });
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "91vh",
          background: "white",
        }}
      >
        <Stack
          spacing={3}
          sx={{
            width: { md: "350px", xs: "200px" },
          }}
        >
          <Typography variant="h4" textAlign="center" color="black">
            Login
          </Typography>
          <FTextField name="username" label="Username" />
          <FTextField name="password" label="Password" type="password" />
          <Button type="submit" variant="contained">
            Login
          </Button>
        </Stack>
      </Box>
    </FormProvider>
  );
};

export default LoginPage;
