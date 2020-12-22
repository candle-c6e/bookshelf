import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { FaSpinner } from "react-icons/fa";

type Variant = "primary" | "secondary";

interface ButtonProps {
  variant: Variant;
  radius?: boolean;
}

function FullPageSpinner() {
  const FullPageWrapper = styled.div`
    font-size: 4em;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `;

  return (
    <FullPageWrapper>
      <Spinner />
    </FullPageWrapper>
  );
}

const spin = keyframes({
  "0%": { transform: "rotate(0deg)" },
  "100%": { transform: "rotate(360deg)" },
});

const Spinner = styled(FaSpinner)({
  animation: `${spin} 1s linear infinite`,
});

const Input = styled.input`
  width: 100%;
  padding: 0.7rem 0.8rem;
  font-size: 1.4rem;
  border-radius: 4px;
  border: none;
  border: 1px solid var(--secondary);
  font-weight: lighter;
  color: var(--black);
`;

const Button = styled.button<ButtonProps>`
  padding: 0.6rem var(--space-base);
  background-color: ${(props) => {
    return props.variant === "primary" ? "var(--primary)" : "var(--secondary)";
  }};
  font-size: calc(var(--space-base) * 1.3);
  color: var(--white);
  cursor: pointer;
  border: none;
  border-radius: 5px;
`;

const BookmarkButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--gray);
  border: none;
  cursor: pointer;

  &:hover {
    background-color: var(--secondary);
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: var(--space-base);
`;

export { Input, Button, ErrorMessage, FullPageSpinner, BookmarkButton };
