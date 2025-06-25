import React, { useState, useEffect} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Skeleton from "../UI/Skeleton";

const TopSellers = () => {
  const [sellers, setSellers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function getSellers() {
      setLoading(true);
      try{
        const { data } = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers`);
        setSellers(data);
      } catch(err) {
        console.log("Error fetching sellers", err)
      } finally {
        setLoading(false);
      }
  }
    getSellers();
  }, [])

  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12">
            <ol className="author_list">

              {loading ? (
                [...Array(12)].map((_, index) => (
                  <li key={index} style={{ padding: "15px" }}>
                    <div className="author_list_pp">
                      <Skeleton circle={true} width={50} height={50} />
                    </div>
                    <div className="author_list_info">
                      <Skeleton width={100} height={20} style={{ marginBottom: "6px" }} />
                      <Skeleton width={60} height={15} />
                    </div>
                  </li>
            ))
              ): (sellers.map((seller, id) => (
                <li key={id}>
                  <div className="author_list_pp">
                    <Link to={`/author/${seller.authorId}`}>
                      <img
                        className="lazy pp-author"
                        src={seller.authorImage}
                        alt=""
                      />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  <div className="author_list_info">
                    <Link to={`/author/${seller.authorId}`}>
                    {seller.authorName}
                    </Link>
                    <span>{seller.price} ETH</span>
                  </div>
                </li>)
              ))
            }
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
