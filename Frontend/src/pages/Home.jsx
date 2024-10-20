
import React from 'react';
import FAQ from '../components/Templates/FAQ.jsx';
import FrontPage from '../components/Templates/FrontPage.jsx';
import About from '../components/Templates/about.jsx';
import BuildFuture from '../components/Templates/BuildFuture.jsx';

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
