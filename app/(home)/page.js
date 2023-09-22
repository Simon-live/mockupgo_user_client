"use client";
import { Children, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Slider from "react-slick";
import { motion } from "framer-motion";
import SpringButton from "@components/springButton";
import ContentCard from "@components/contentCard";
import config from "@config/default";
import InitialContext from "@contexts/initialContext";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// Service
import generalService from "@services/general";
import Icon from "@components/icon";
import Skeleton from "./skeleton";

const Home = () => {
  const router = useRouter();
  const { data } = useContext(InitialContext);
  const [post, setPost] = useState(null);
  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const getPost = async () => {
    try {
      const res = await generalService.getResource({ pageSize: 24 });
      setPost(res?.data?.data?.result);
    } catch (error) {
      router.replace("/404");
    }
  };

  useEffect(() => {
    document.title = "Mockupgo";
    getPost();
  }, []);

  return (
    <>
      {post ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full h-full flex flex-col justify-start items-center gap-8 md:gap-12">
          {/* Banner */}
          <div className="w-full h-96 grid grid-cols-1 md:grid-cols-3 grid-rows-2 gap-6">
            {/* Carouse */}
            <div className="col-span-1 md:col-span-2 row-span-2 bg-slate-100 rounded-2xl overflow-hidden">
              <Slider {...carouselSettings}>
                {Children.toArray(
                  data?.carousel?.map((item) => (
                    <div>
                      <div
                        onClick={() => router.push(item?.url)}
                        className=" h-96 relative bg-slate-50 bg-center bg-cover cursor-pointer"
                        style={{
                          backgroundImage: `url(${config?.contentPath}/${item?.image})`,
                        }}>
                        <div className="w-full p-6 pb-10 space-y-2 absolute bottom-0 bg-black/20 backdrop-blur-lg">
                          <h1 className="text-2xl font-medium text-white">
                            {item?.title}
                          </h1>
                          <p className="text-xs font-light text-white/70">
                            {item?.digest}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </Slider>
            </div>
            {/* Campaign */}
            {Children.toArray(
              data?.campaign_banner?.map(
                (item, index) =>
                  index < 2 && (
                    <div className="hidden md:block col-span-1 row-span-1 bg-slate-100 rounded-2xl overflow-hidden">
                      <div
                        className="h-full flex items-end p-3 bg-slate-50 bg-center bg-cover"
                        style={{
                          backgroundImage: `url(${config?.contentPath}/${item?.image})`,
                        }}>
                        <div className="hover:-translate-y-1 transition-all w-full flex justify-between items-center gap-4 px-4 py-2 bg-black/20 backdrop-blur-lg rounded-lg md:rounded-xl">
                          <div className="overflow-hidden">
                            <h1 className="text-sm font-medium text-white">
                              {item?.title}
                            </h1>
                            <p className="text-xs font-light text-white/70 truncate">
                              {item?.digest}
                            </p>
                          </div>
                          <SpringButton
                            onClick={() => router.push(item?.url)}
                            className="btn text-xs py-1 px-3 rounded-lg text-white">
                            View
                          </SpringButton>
                        </div>
                      </div>
                    </div>
                  )
              )
            )}
          </div>

          {/* Posts */}
          {post && (
            <section className="w-full space-y-6 flex flex-col">
              <h1 className="text-xl font-medium capitalize">Latest Relase</h1>
              <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {Children.toArray(
                  post?.map(
                    (item) =>
                      item._id !== post._id && <ContentCard data={item} />
                  )
                )}
              </div>
              <SpringButton
                onClick={() => router.push("/search")}
                className="self-center flex items-center gap-2 btn text-sm text-theme-blue hover:text-white border-theme-blue border-2 bg-transparent hover:bg-theme-blue transition-colors">
                <span>View All</span>
                <Icon icon="fa-solid fa-arrow-right" />
              </SpringButton>
            </section>
          )}
        </motion.div>
      ) : (
        <Skeleton />
      )}
    </>
  );
};

export default Home;
