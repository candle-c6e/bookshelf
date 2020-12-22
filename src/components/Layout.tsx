import React, { FunctionComponent } from "react";
import StickyBox from "react-sticky-box";
import Header from "./Header";
import { Navbar } from "./Navbar";

interface Props {
  children: React.ReactNode;
}

const Layout: FunctionComponent<Props> = ({ children }) => {
  return (
    <React.Fragment>
      <Header />
      <div className="container content">
        <StickyBox offsetTop={20} offsetBottom={20}>
          <Navbar />
        </StickyBox>
        {children}
      </div>
    </React.Fragment>
  );
};

export default Layout;
