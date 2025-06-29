import React from "react";
import { Link } from "react-router-dom";

const Item = ({ item, countdown }) => {

  const formatTime = (value) => String(value).padStart(2, "0");

  const hours = Math.floor(countdown / 3600);
  const minutes = Math.floor((countdown % 3600) / 60);
  const seconds = countdown % 60;

  return (
    <div className="nft__item">
      <div className="author_list_pp">
        <Link
          to={`/author/${item.authorId}`}
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title={`Creator: ${item.authorName}`}
        >
          <img className="lazy" src={item.authorImage} alt={item.authorName} />
          <i className="fa fa-check"></i>
        </Link>
      </div>

      {countdown !== undefined && countdown > 0 && (
        <div className="de_countdown">
          <span className="timer__hours">{formatTime(hours)} hr</span>
          <span className="timer__minutes">{formatTime(minutes)} min</span>
          <span className="timer__seconds">{formatTime(seconds)} s</span>
        </div>
      )}

      <div className="nft__item_wrap">
        <div className="nft__item_extra">
          <div className="nft__item_buttons">
            <button>Buy Now</button>
            <div className="nft__item_share">
              <h4>Share</h4>
              <a href="" target="_blank" rel="noreferrer">
                <i className="fa fa-facebook fa-lg"></i>
              </a>
              <a href="" target="_blank" rel="noreferrer">
                <i className="fa fa-twitter fa-lg"></i>
              </a>
              <a href="">
                <i className="fa fa-envelope fa-lg"></i>
              </a>
            </div>
          </div>
        </div>

       <Link to={`/item-details/${item.nftId}`}>
          <img
            src={item.nftImage}
            className="lazy nft__item_preview"
            alt={item.title}
          />
        </Link>
      </div>

      <div className="nft__item_info">
       <Link to={`/item-details/${item.nftId}`}>
          <h4>{item.title}</h4>
        </Link>
        <div className="nft__item_price">{item.price}</div>
        <div className="nft__item_like">
          <i className="fa fa-heart"></i>
          <span>{item.likes}</span>
        </div>
      </div>
    </div>
  );
};

export default Item;
