import React, { useEffect, useState } from "react";
import axios from "axios";
import Skeleton from "../UI/Skeleton";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import Item from "../Items/Item";


const NewItems = () => {
  const[loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [countdowns, setCountdowns] = useState({});

  async function getItems() {
    try{
      setLoading(true)
      const { data } = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems`)
      setItems(data);
    } catch(err) {
      console.error("Error fetching collections", err);
    } finally {
      setLoading(false); 
    }
  }
  
  useEffect(() => {
    getItems()
  }, [])

  function NextArrow(props) {
    const { className, onClick, style } = props;
    return <div className={className} onClick={onClick}
    style={{ ...style,
      color: "black",
      fontSize: "30px",
      zIndex: 2,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "white", 
      width: "40px",
      height: "40px",
      borderRadius: "50%", }}>
     ›</div>;
  }

  function PrevArrow(props) {
      const { className, onClick, style } = props;
      return <div className={className} onClick={onClick}
      style={{ ...style, 
        color: "black",
        fontSize: "30px",
        zIndex: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white", 
        width: "40px",
        height: "40px",
        borderRadius: "50%", }}>
       ‹</div>;
    }

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
      breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: true, 
          dots: false    
        },
      },
    ], 
  };


  useEffect(() => {
    if(items.length === 0) return;

    const interval = setInterval(() => {
      const now = Date.now();
      const newCountdowns = {};

      items.forEach((item) => {
        if (item.expiryDate) {
          const expiryTime = new Date(item.expiryDate).getTime();
          const diffSeconds = Math.floor((expiryTime - now)/1000);
          newCountdowns[item.id] = diffSeconds > 0 ? diffSeconds : 0;
        }
      })
      setCountdowns(newCountdowns);
    }, 1000)

    return() => clearInterval(interval);
  }, [items])
  

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {loading ? (
                [...Array(4)].map((_, index) => (
                  <div key={index} style={{ padding: "15px" }}>
                    <Skeleton width="100%" height="350px" borderRadius="10px" />
                  </div>
                ))
              ) :(
                <div data-aos="fade-up">
                <Slider {...settings}>
          {items.map((item) => (
            <div key={item.id}
            style={{ padding: '15px'}}>
              <Item item={item} countdown={countdowns[item.id]}/>
            </div>
          )
            )}
          </Slider>
          </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewItems;