import { FunctionComponent } from "react";
import styled from "@emotion/styled";
import { useLocation, NavLink } from "react-router-dom";

const NavbarWrapper = styled.nav``;

const MenuList = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
`;

const MenuItem = styled(NavLink)`
  padding: var(--space-base);
  cursor: pointer;
  border: 1px solid var(--secondary);
  transition: background-color 0.2s linear;

  &.active {
    background-color: var(--secondary);
    color: var(--white);
  }
  &:nth-of-type(1) {
    border-radius: 5px 5px 0 0;
  }
  &:nth-of-type(2) {
    border-top: none;
    border-radius: 0 0 5px 5px;
  }
  &:hover {
    background-color: var(--secondary);
    color: var(--white);
  }
`;

const Navbar: FunctionComponent<{}> = () => {
  const location = useLocation();

  return (
    <NavbarWrapper>
      <MenuList>
        <MenuItem activeClassName="active" to="/bookmark">
          <li>Bookmark</li>
        </MenuItem>
        <MenuItem
          activeClassName="active"
          isActive={() => ["/", "/discover"].includes(location.pathname)}
          to="/discover"
        >
          <li>Discover</li>
        </MenuItem>
      </MenuList>
    </NavbarWrapper>
  );
};

export { Navbar };
