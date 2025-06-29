import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Item from "../Items/Item";
import Skeleton from "../UI/Skeleton";

const ExploreItems = () => {
  const [loading, setLoading] = useState(true)
  const [items, setItems] = useState([]);
  const [countdowns, setCountdowns] = useState({});
  const [visibleCount, setVisibleCount] = useState(8);

  useEffect(() => {
    async function fetchItems() {
      try {
        setLoading(true)
        const { data } = await axios.get(
          'https://us-central1-nft-cloud-functions.cloudfunctions.net/explore'
        );
        setItems(data);
      } catch (err) {
        console.error('Error fetching explore items', err);
      } finally {
        setLoading(false);
      }
    }

    fetchItems();
  }, []);

  useEffect(() => {
    if (items.length === 0) return;

    const interval = setInterval(() => {
      const now = Date.now();
      const newCountdowns = {};

      items.forEach((item) => {
        if (item.expiryDate) {
          const expiryTime = new Date(item.expiryDate).getTime();
          const diff = Math.floor((expiryTime - now) / 1000);
          newCountdowns[item.id] = diff > 0 ? diff : 0;
        }
      });

      setCountdowns(newCountdowns);
    }, 1000);

    return () => clearInterval(interval);
  }, [items]);

  function loadMore() {
    setVisibleCount((prev) => prev + 4)
  };

  async function loadValue(value) {
    if (value === "price_low_to_high"){
      const { data: LowToHigh } = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=price_low_to_high`);
      setItems(LowToHigh)
    } 
    else if (value === "price_high_to_low") {
      const { data: HighToLow} = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=price_high_to_low`);
      setItems(HighToLow)
    }
    else if (value === 'likes_high_to_low'){
      const { data: Likes} = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=likes_high_to_low`);
      setItems(Likes)
    } else {
      const { data: DefaultItems } = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/explore`);
      setItems(DefaultItems);
    }
}
  

  return (
    <section className="container">
      <div className="row mb-4">
        <div className="col-md-3">
          <select id="filter-items" 
          className="form-select" 
          defaultValue="" 
          onChange={(e) => loadValue(e.target.value)}>
            <option value="" >Default</option>
            <option value="price_low_to_high">Price, Low to High</option>
            <option value="price_high_to_low">Price, High to Low</option>
            <option value="likes_high_to_low">Most liked</option>
          </select>
        </div>
      </div>

      <div className="row">
        {loading ? (
          [...Array(8)].map((_, index) => (
            <div key={index} className="col-lg-3 col-md-4 col-sm-6 mb-4">
              <Skeleton width="100%" height="350px" borderRadius="10px" />
            </div>
          ))
        ) : (
          items.slice(0, visibleCount).map((item, index) => {
            const isNew = index >= visibleCount - 4;
            return (
              <div
                className={`col-lg-3 col-md-4 col-sm-6 mb-4 ${isNew ? 'fade-in-item' : ''}`}
                key={item.id}
              >
                <Item item={item} countdown={countdowns[item.id]} />
              </div>
            );
          })
        )}
      </div>

      <div className="row">
        <div data-aos="fade-up">
        <div className="col-md-12 text-center">
          <Link to="#" id="loadmore" className="btn-main lead" onClick={loadMore}>
            Load more
          </Link>
        </div>
        </div>
      </div>
    </section>
  );
};

export default ExploreItems;