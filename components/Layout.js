import React from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
// import Footer from "./Utils/Footer/Footer";
import styled from "styled-components";


const Body = styled.div`
position:relative;
background-color:#fff;
overflow: hidden;
 max-width: 1140px;

margin: 0 auto;
position: relative;

@media screen and (max-width:700px){
width: 100%;
    
}
`

const Navbar = dynamic(() => import("./Navbar"), { ssr: false });

const Layout = ({ children }) => {
  return (
    <Body>
      <Head>
        <title>Peculiar</title>
      </Head>

      <header>
        <Navbar />
      </header>

      <main className="">{children}</main>

      <footer>
        {/* <Footer/> */}
      </footer>
    </Body>
  );
};

export default Layout;
