import React, { useCallback, useEffect, useRef, useState } from "react";
import { FormControl } from "baseui/form-control";
import { styled, useStyletron } from "baseui";
import { Input } from "baseui/input";
import { Card, StyledBody, StyledAction } from "baseui/card";
import { Button } from "baseui/button";
import { Heading, HeadingLevel } from "baseui/heading";
import { useAuth } from "../providers/FirebaseAuthProvider";
import { validateLoginForm } from "../utils";
import { Navigate, useLocation } from "react-router-dom";

export default function Login() {
  const [css] = useStyletron();
  const location = useLocation();
  const formRef = useRef(null);
  const [errors, setErrors] = useState({});
  const { signIn, user } = useAuth();

  const doLogin = useCallback(
    (payload) => {
      console.log(payload);
      signIn(payload);
    },
    [signIn]
  );

  const onSubmit = useCallback(() => {
    if (!formRef.current) return;
    const { formErrors, payload } = validateLoginForm(formRef.current);
    console.log(formErrors, payload);
    const hasErrors = Object.keys(formErrors).length > 0;
    setErrors(formErrors);
    if (!hasErrors) {
      doLogin(payload);
    }
  }, [doLogin]);

  if (user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return (
    <Form ref={formRef}>
      <Card
        className={css({
          maxWidth: "480px",
          flex: 1
        })}
      >
        <StyledBody>
          <HeadingLevel>
            <Heading
              styleLevel={5}
              className={css({
                paddingBottom: "16px"
              })}
            >
              Login
            </Heading>
          </HeadingLevel>
          <FormControl label="Email" error={errors.email}>
            <Input name="email" type="email" error={errors.email} />
          </FormControl>
          <FormControl label="Password" error={errors.password}>
            <Input type="password" name="password" error={errors.password} />
          </FormControl>
        </StyledBody>
        <StyledAction>
          <Button
            onClick={onSubmit}
            type="button"
            overrides={{
              BaseButton: { style: { width: "100%" } }
            }}
          >
            Login
          </Button>
        </StyledAction>
      </Card>
    </Form>
  );
}

const Form = styled("form", ({ $theme }) => ({
  maxWidth: 1024,
  margin: "0 auto",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
}));
