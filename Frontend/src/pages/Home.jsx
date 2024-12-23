
import React from 'react';
import FAQ from '../components/Templates/FAQ.jsx';
import FrontPage from '../components/Templates/FrontPage.jsx';
import About from '../components/Templates/about.jsx';
import BuildFuture from '../components/Templates/BuildFuture.jsx';
import EventGallary from '../components/GallarySection/EventGallary.jsx';
import AdminBlogRotator from '../components/BlogSection/AdminBlogRotator.jsx';
import SeeMoreBlogsButton from '../components/Templates/seemoreblogs.jsx';
import SeeMoreGalleryButton from '../components/Templates/seemoregallary.jsx';
import UpcomingEventRotator from '../components/EventSection/UpcomingEventRotator.jsx';
import SeeMoreEventsButton from '../components/Templates/seemoreevent.jsx';
import UpcomingEventsHeading from '../components/Templates/UpcomingEventsHeading.jsx';
import AdminBlogHeading from '../components/Templates/AdminBlogHeading.jsx';

const Home = () => {
  return (
    <>
      <FrontPage/>
      <About/>
      <BuildFuture/>
      <AdminBlogHeading/>
      <AdminBlogRotator/>
      <SeeMoreBlogsButton/>
      <UpcomingEventsHeading/>
      <UpcomingEventRotator/>
      <SeeMoreEventsButton/>
      <EventGallary/>
      <SeeMoreGalleryButton/>
      <FAQ/>
    </>
  );
};

export default Home;
