import {
  ReactElement,
  createContext,
  cloneElement,
  useContext,
  useState,
} from "react";
import { Dialog } from "@reach/dialog";
import styled from "@emotion/styled";
import { FaTimes } from "react-icons/fa";
import "@reach/dialog/styles.css";

interface Props {
  children?: React.ReactNode;
}

type ModalType = [boolean, Function];

const ModalContext = createContext<ModalType>([false, () => null]);

const ModalHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-base);
`;

const CircleWrapper = styled.div`
  width: calc(var(--space-base) * 1.6);
  height: calc(var(--space-base) * 1.6);
  background-color: var(--gray);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  color: var(--white);
  cursor: pointer;
`;

function Modal(props: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return <ModalContext.Provider value={[isOpen, setIsOpen]} {...props} />;
}

function ModalOpenButton({ children }: Props) {
  const [, setIsOpen] = useContext(ModalContext);

  return cloneElement(children as ReactElement<any>, {
    onClick: () => setIsOpen(true),
  });
}

function ModalContentBase(props: Props) {
  const [isOpen, setIsOpen] = useContext(ModalContext);

  return (
    <Dialog
      style={{ maxWidth: "650px" }}
      isOpen={isOpen}
      onDismiss={() => setIsOpen(false)}
      {...props}
    />
  );
}

function ModalHeader({ children }: Props) {
  const [, setIsOpen] = useContext(ModalContext);

  return (
    <ModalHeaderWrapper>
      {children}
      <CircleWrapper onClick={() => setIsOpen(false)}>
        <FaTimes />
      </CircleWrapper>
    </ModalHeaderWrapper>
  );
}

function ModalContent({ children, ...props }: Props) {
  return <ModalContentBase {...props}>{children}</ModalContentBase>;
}

export { Modal, ModalOpenButton, ModalHeader, ModalContent };
