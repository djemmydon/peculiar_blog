import React, { useState, useEffect } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import Footer from "../components/Footer";
import styled from "styled-components";
import { PuffLoader } from "react-spinners";

const Body = styled.div`
  position: relative;
  background-color: #fff;
  overflow: hidden;
  max-width: 1140px;
  scroll-behavior: smooth;
  margin: 0 auto;
  position: relative;

  @media screen and (max-width: 700px) {
    width: 100%;
  }
`;

const Navbar = dynamic(() => import("./Navbar"), { ssr: false });

const Layout = ({ children }) => {
  const [load, setLoad] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoad(false);
    }, 4000);
  }, []);

  return (
    <Body>
      <Head>
        <title>Peculiar</title>
      </Head>

      {load ? (
        <div className="flex justify-center items-center h-screen ">
          <PuffLoader color="#fe4f70" />
        </div>
      ) : (
        <>
          <header>
            <Navbar />
          </header>

          <main className="">{children}</main>

          <footer>
            <Footer />
          </footer>
        </>
      )}
    </Body>
  );
};

export default Layout;
