import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Skeleton from "../components/UI/Skeleton";

const Author = () => {
  const { authorId } = useParams();
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followersCount, setFollowersCount] = useState(0);

  useEffect(() => {
    const getAuthor = async () => {
      if (!authorId) return;

      setLoading(true);
      try {
        const { data } = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`
        );
        setAuthor(data);
      } catch (err) {
        console.error('Error fetching author:', err);
      } finally {
        setLoading(false);
      }
    };

    getAuthor();
  }, [authorId]);

   useEffect(() => {
    if (author && author.followers !== undefined) {
      setFollowersCount(author.followers);
    }
  }, [author]);

  const handleFollowClick = () => {
    if(isFollowing) {
      setFollowersCount((count) => count -1);
    } else {
      setFollowersCount((count) => count + 1);
    } 
    setIsFollowing(!isFollowing);
  }

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          style={{ backgroundImage: `url(${AuthorBanner})`, backgroundPosition: 'top' }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                {loading ? (
                  <div className="d_profile de-flex">
                    <div className="de-flex-col">
                      <div className="profile_avatar">
                        <Skeleton circle height={120} width={120} style={{ marginBottom: '20px' }} />
                        <div className="profile_name">
                          <h4>
                            <Skeleton width={180} height={24} />
                            <span className="profile_username">
                              <Skeleton width={100} height={18} />
                            </span>
                            <span id="wallet" className="profile_wallet">
                              <Skeleton width={140} height={16} />
                            </span>
                            <Skeleton width={60} height={30} style={{ marginTop: '10px' }} />
                          </h4>
                        </div>
                      </div>
                    </div>
                    <div className="profile_follow de-flex">
                      <div className="de-flex-col">
                        <Skeleton width={100} height={20} />
                        <Skeleton width={100} height={40} />
                      </div>
                    </div>
                  </div>
                ) : (
                  author && (
                    <div className="d_profile de-flex">
                      <div className="de-flex-col">
                        <div className="profile_avatar">
                          <Link to={`/author/${author.authorId}`}>
                            <img src={author.authorImage} alt={author.authorName} />
                          </Link>
                          <i className="fa fa-check"></i>
                          <div className="profile_name">
                            <h4>
                              {author.authorName}
                              <span className="profile_username">{author.tag}</span>
                              <span id="wallet" className="profile_wallet">{author.address}</span>
                              <button id="btn_copy" title="Copy Text">Copy</button>
                            </h4>
                          </div>
                        </div>
                      </div>
                      <div className="profile_follow de-flex">
                        <div className="de-flex-col">
                          <div className="profile_follower">{followersCount} followers</div>
                          <button onClick={handleFollowClick} className="btn-main">
                            {isFollowing ? "Unfollow" : "Follow"}
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  {author && <AuthorItems author={author} />}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;