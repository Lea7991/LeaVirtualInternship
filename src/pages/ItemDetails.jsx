import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams, useLocation } from "react-router-dom";
import axios from "axios";

const ItemDetails = () => {
  const [item, setItem] = useState(null)
  const [loading, setLoading] = useState(true)
  const { nftId } = useParams()


  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        setLoading(true)
        const { data } = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${nftId}`);
          console.log(data)
        setItem(data);
      } catch (error) {
        console.error("Error fetching item details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchItemDetails();
  }, [nftId]);


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (loading || !item) {if (loading || !item) {
  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center">
                <div className="img-fluid img-rounded mb-sm-30 nft-image placeholder-glow" style={{ height: 400, backgroundColor: "#eee" }}></div>
              </div>
              <div className="col-md-6">
                <div className="item_info">
                  <h2 className="placeholder-glow" style={{ height: 30, backgroundColor: "#eee", width: "60%" }}></h2>
                  <div className="item_info_counts">
                    <div className="item_info_views">
                      <i className="fa fa-eye"></i> --
                    </div>
                    <div className="item_info_like">
                      <i className="fa fa-heart"></i> --
                    </div>
                  </div>
                  <p className="placeholder-glow" style={{ height: 80, backgroundColor: "#eee" }}></p>
                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6>Owner</h6>
                      <div className="item_author">
                        <div className="author_list_pp placeholder-glow" style={{ width: 50, height: 50, borderRadius: "50%", backgroundColor: "#eee" }}></div>
                        <div className="author_list_info placeholder-glow" style={{ width: 100, height: 20, backgroundColor: "#eee", marginTop: 10 }}></div>
                      </div>
                    </div>
                  </div>
                  <div className="de_tab tab_simple">
                    <div className="de_tab_content">
                      <h6>Creator</h6>
                      <div className="item_author">
                        <div className="author_list_pp placeholder-glow" style={{ width: 50, height: 50, borderRadius: "50%", backgroundColor: "#eee" }}></div>
                        <div className="author_list_info placeholder-glow" style={{ width: 100, height: 20, backgroundColor: "#eee", marginTop: 10 }}></div>
                      </div>
                    </div>
                    <div className="spacer-40"></div>
                    <h6>Price</h6>
                    <div className="nft-item-price placeholder-glow" style={{ width: 80, height: 20, backgroundColor: "#eee" }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
}
  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
            <div className="container">
            <div className="row">
              <div className="col-md-6 text-center">
                <img
                  src={item.nftImage}
                  className="img-fluid img-rounded mb-sm-30 nft-image"
                  alt=""
                />
              </div>
              <div className="col-md-6">
                <div className="item_info">
                  <h2>{item.title}</h2>

                  <div className="item_info_counts">
                    <div className="item_info_views">
                      <i className="fa fa-eye"></i>
                      {item.views}
                    </div>
                    <div className="item_info_like">
                      <i className="fa fa-heart"></i>
                      {item.likes}
                    </div>
                  </div>
                  <p>
                    {item.description}
                  </p>
                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6>Owner</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author/${item.ownerId}`}>
                            <img className="lazy" src={item.ownerImage} alt="" />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${item.ownerId}`}>
                          {item.ownerName}
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div></div>
                  </div>
                  <div className="de_tab tab_simple">
                    <div className="de_tab_content">
                      <h6>Creator</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author/${item.creatorId}`}>
                            <img className="lazy" src={item.creatorImage} alt="" />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                         <Link to={`/author/${item.creatorId}`}>
                            {item.creatorName}</Link>
                        </div>
                      </div>
                    </div>
                    <div className="spacer-40"></div>
                    <h6>Price</h6>
                    <div className="nft-item-price">
                      <img src={EthImage} alt="" />
                      <span>{item.price}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;
