import React, { FunctionComponent } from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { useAuth } from "../context/auth-context";

const HeaderWrapper = styled.header`
  background-color: var(--secondary);
  min-height: 5rem;
  height: 5rem;
`;

const HeaderList = styled.ul`
  color: var(--white);
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  list-style: none;

  @media (max-width: 900px) {
    padding: 0 2rem;
  }
`;

const HeaderItem = styled.li``;

const HeaderLink = styled(Link)`
  font-size: 1.4rem;
`;

const Header: FunctionComponent<{}> = () => {
  const { user, logout } = useAuth();

  return (
    <HeaderWrapper>
      <div className="container">
        <HeaderList>
          <HeaderItem>
            <HeaderLink to="/discover">Home</HeaderLink>
          </HeaderItem>
          <HeaderItem>
            <h3 style={{ cursor: "pointer" }} onClick={logout}>
              {user.name}
            </h3>
          </HeaderItem>
        </HeaderList>
      </div>
    </HeaderWrapper>
  );
};

export default Header;
