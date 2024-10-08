
import React from 'react';
import FAQ from '../components/FAQ';
import FrontPage from '../components/FrontPage.jsx';
import About from '../components/about.jsx';
import BuildFuture from '../components/BuildFuture.jsx';

const Home = () => {
  return (
    <>
      <FrontPage/>
      <About/>
      <BuildFuture/>
      <FAQ/>
    </>
  );
};

export default Home;
