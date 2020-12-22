import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "@emotion/styled";
import { useForm } from "react-hook-form";
import { ReactComponent as BookLogo } from "../assets/open-book.svg";
import { Button, ErrorMessage, Input } from "../components/Lib";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalOpenButton,
} from "../utils/modal";
import { useAuth } from "../context/auth-context";

const Wrapper = styled.div`
  min-height: 100vh;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ButtonWrapper = styled.div`
  margin-top: calc(var(--space-base) * 2);

  button {
    &:nth-of-type(1) {
      margin-right: var(--space-base);
    }
  }
`;

const FormGroup = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: calc(var(--space-base) * 10) 1fr;
  align-items: center;
  margin: var(--space-base) 0;

  p {
    margin-top: 0.6rem;
    grid-column: 2/2;
  }

  input {
    font-size: var(--space-base);
    width: 100%;
  }
`;

interface CallbackType {
  success: boolean;
  data: any;
}

interface Auth {
  type: (
    username: string,
    password: string,
    name?: string
  ) => Promise<CallbackType>;
  title: string;
}

type Inputs = {
  name?: string;
  username: string;
  password: string;
};

function AuthForm({ type, title }: Auth) {
  const history = useHistory();
  const { register, handleSubmit, errors } = useForm<Inputs>();
  const [error, setError] = useState("");

  async function onSubmit({ username, password, name }: Inputs, event: any) {
    const data = await type(username, password, name);
    if (!data.success) {
      event.target.reset();
      return setError(data.data);
    }
    history.push("/discover");
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {title === "register" ? (
        <FormGroup>
          <label htmlFor="name">Name</label>
          <Input
            type="text"
            id="name"
            name="name"
            ref={register({ required: true })}
          />
          {errors.name && <ErrorMessage>name is required.</ErrorMessage>}
        </FormGroup>
      ) : null}
      <FormGroup>
        <label htmlFor="username">Username</label>
        <Input
          type="text"
          id="username"
          name="username"
          ref={register({ required: true })}
        />
        {errors.username && <ErrorMessage>username is required.</ErrorMessage>}
      </FormGroup>
      <FormGroup>
        <label htmlFor="password">Password</label>
        <Input
          type="password"
          id="password"
          name="password"
          ref={register({ required: true })}
        />
        {errors.password && <ErrorMessage>password is required.</ErrorMessage>}
      </FormGroup>
      {error && (
        <ErrorMessage
          style={{ textAlign: "center", fontSize: "1.6rem", margin: "1rem" }}
        >
          {error}
        </ErrorMessage>
      )}
      <Button variant="primary">{title}</Button>
    </form>
  );
}

function AuthScreen() {
  const { login, register } = useAuth();
  return (
    <Wrapper>
      <BookLogo style={{ width: "100px", height: "100px" }} />
      <h1>Bookshelf</h1>
      <ButtonWrapper>
        <Modal>
          <ModalOpenButton>
            <Button variant="primary">Login</Button>
          </ModalOpenButton>
          <ModalContent aria-label="login">
            <ModalHeader>
              <h3>Login</h3>
            </ModalHeader>
            <AuthForm type={login} title="login" />
          </ModalContent>
        </Modal>
        <Modal>
          <ModalOpenButton>
            <Button variant="secondary">Register</Button>
          </ModalOpenButton>
          <ModalContent aria-label="login">
            <ModalHeader>
              <h3>Register</h3>
            </ModalHeader>
            <AuthForm type={register} title="register" />
          </ModalContent>
        </Modal>
      </ButtonWrapper>
    </Wrapper>
  );
}

export default AuthScreen;
