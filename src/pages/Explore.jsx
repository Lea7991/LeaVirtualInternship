import React, { useEffect } from "react";
import SubHeader from "../images/subheader.jpg";
import ExploreItems from "../components/explore/ExploreItems";
import { useLocation } from "react-router-dom";
import AOS from 'aos';

const Explore = () => {
   const location = useLocation();
    //FROM MAIN!! DO NOT REMOVE
    useEffect(() => {
      AOS.init({ duration: 1000, once: true });
    }, []);
  
    useEffect(() => {
      AOS.refresh(); 
    }, [location.pathname]);
  
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="subheader"
          className="text-light"
          style={{ background: `url("${SubHeader}") top` }}
        >
          <div className="center-y relative text-center">
            <div className="container">
              <div className="row">
                <div className="col-md-12 text-center">
                  <h1>Explore</h1>
                </div>
                <div className="clearfix"></div>
              </div>
            </div>
          </div>
        </section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <ExploreItems />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Explore;
