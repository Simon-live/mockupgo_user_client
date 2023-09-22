"use client";
import { useState, useEffect, Children } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import config from "@config/default";
import SpringButton from "@components/springButton";
import Icon from "@components/icon";
import ContentCard from "@components/contentCard";
import Skeleton from "./skeleton";
// Service
import generalService from "@services/general";

const Post = ({ params }) => {
  const router = useRouter();
  const [post, setPost] = useState(null);
  const [collection, setCollection] = useState(null);
  const [slideValue, setSlideValue] = useState(50)

  const getPost = async () => {
    try {
      const res = await generalService.getResource({ id: params.slug });
      // await new Promise((resolve) => setTimeout(resolve, 30000));
      if (res?.data?.data?.result.length > 0) {
        setPost(res?.data?.data?.result[0]);
        console.log(res?.data?.data?.result[0]);
      } else {
        router.replace("/404");
      }
      if (res?.data?.data?.result[0]?.collection_id?._id) {
        const collection = await generalService.getResource({
          collection: res.data.data.result[0].collection_id._id,
        });
        if (collection?.data?.data?.result.length > 0)
          setCollection(collection?.data?.data?.result);
      }
    } catch (error) {
      router.replace("/404");
    }
  };

  useEffect(() => {
    getPost();
  }, [params]);

  useEffect(() => {
    document.title = (`${post?.title} - ` || "Loading... - ") + "Mockupgo";
  }, [post]);

  return (
    <>
      {post ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full h-full flex flex-col justify-start items-center gap-8 md:gap-12">
          {/* Main post */}
          <section className="w-full flex flex-col md:flex-row gap-8 overflow-hidden">
            {/* Show up */}
            <div className="flex-1 h-auto space-y-4">
              <div className="flex justify-between items-start gap-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-medium capitalize text-ellipsis overflow-hidden">
                    {post.title}
                  </h1>
                  <ul className="flex items-center gap-2 flex-wrap text-xs font-light capitalize text-theme-blue dark:text-slate-200">
                    {Children.toArray(
                      post?.category?.map((category) => (
                        <li className="rounded-md text-xs px-3 py-1 bg-theme-blue/5 dark:bg-slate-800">
                          <Link href={`/search?c=${category.title}`}>
                            {category.title}
                          </Link>
                        </li>
                      ))
                    )}
                    {Children.toArray(
                      post?.tag?.map((tag) => (
                        <li className="rounded-md text-xs px-3 py-1 bg-theme-blue/5 dark:bg-slate-800">
                          <Link href={`/search?t=${tag.title}`}>
                            {tag.title}
                          </Link>
                        </li>
                      ))
                    )}
                  </ul>
                </div>
                <div className="hidden md:flex gap-6">
                  <SpringButton className="bg-theme-pink/5 text-theme-pink btn-icon">
                    <Icon icon="fa-solid fa-heart" />
                  </SpringButton>
                  <SpringButton className="bg-emerald-400/10 text-emerald-400 btn-icon">
                    <Icon icon="fa-solid fa-mobile" />
                  </SpringButton>
                  <SpringButton className="bg-theme-blue/5 text-theme-blue btn-icon">
                    <Icon icon="fa-solid fa-share" />
                  </SpringButton>
                </div>
              </div>
              <div className="h-[60vw] md:h-[40vw] min-h-108 relative overflow-hidden">
                <div
                  className="absolute z-10 w-full h-full bg-slate-50 bg-cover bg-center rounded-lg md:rounded-xl"
                  style={{
                    clipPath: `polygon(0 0, ${post?.preview_data[0]?.type === "switchable_img" ? slideValue : 100}% 0, ${post?.preview_data[0]?.type === "switchable_img" ? slideValue : 100}% 100%, 0 100%)`,
                    backgroundImage: `url(${config?.contentPath}/${post?.preview_data[0]?.data[0]?.file_name})`,
                  }}></div>
                {post?.preview_data[0]?.type === "switchable_img" && (
                  <>
                    <div
                      className="absolute w-full h-full bg-slate-50 bg-cover bg-center rounded-lg md:rounded-xl"
                      style={{
                        backgroundImage: `url(${config?.contentPath}/${post?.preview_data[0]?.data[1]?.file_name})`,
                      }}></div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      step="1"
                      value={slideValue}
                      onChange={(e)=>{if(e.target.value>5 && e.target.value<95) setSlideValue(e.target.value)}}
                    />
                  </>
                )}
              </div>
            </div>
            {/* Widgets */}
            <div className="flex-initial md:w-96">
              <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-lg md:rounded-xl space-y-8">
                <div className="flex justify-between gap-2">
                  <div className="space-y-1">
                    <h1 className="text-xl font-medium">More Details</h1>
                    <div className="text-xs opacity-60 space-x-2">
                      <Icon icon="fa-solid fa-closed-captioning" />
                      <span>{post._id}</span>
                    </div>
                  </div>
                  <SpringButton className="w-8 h-8 btn-icon opacity-60 bg-transparent">
                    <Icon icon="fa-solid fa-circle-question" />
                  </SpringButton>
                </div>
                <ul className="w-full flex flex-col gap-4">
                  <li className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="btn-icon bg-white dark:bg-slate-900 text-theme-blue dark:text-slate-100">
                        <Icon icon="fa-solid fa-calendar-days" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm">Date</span>
                        <span className="text-xs font-light text-slate-400">
                          Time of update
                        </span>
                      </div>
                    </div>
                    <span className="text-sm">
                      {(post?.create_date).split("T")[0].toLocaleString()}
                    </span>
                  </li>
                  <li className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="btn-icon bg-white dark:bg-slate-900 text-theme-blue dark:text-slate-100">
                        <Icon icon="fa-solid fa-file-circle-question" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm">Format</span>
                        <span className="text-xs font-light text-slate-400">
                          File format
                        </span>
                      </div>
                    </div>
                    <span className="text-sm">
                      {post?.file_properties?.type}
                    </span>
                  </li>
                  <li className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="btn-icon bg-white dark:bg-slate-900 text-theme-blue dark:text-slate-100">
                        <Icon icon="fa-solid fa-sack-dollar" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm">Price</span>
                        <span className="text-xs font-light text-slate-400">
                          Estimated data
                        </span>
                      </div>
                    </div>
                    <span className="text-sm">
                      {post?.price > 0 ? `$${post?.price}` : "Free"}
                    </span>
                  </li>
                  <li className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="btn-icon bg-white dark:bg-slate-900 text-theme-blue dark:text-slate-100">
                        <Icon icon="fa-solid fa-copyright" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm">Supplier</span>
                        <span className="text-xs font-light text-slate-400">
                          The original supplier
                        </span>
                      </div>
                    </div>
                    <span className="text-xs uppercase">
                      {post?.supplier?.ref?.name}
                    </span>
                  </li>
                </ul>
                <div className="flex flex-col justify-center items-center gap-2">
                  <SpringButton className="w-full p-3 btn rounded-full bg-theme-blue text-white shadow-xl shadow-theme-blue/30 dark:shadow-slate-900/30">
                    <Link
                      className="w-full flex justify-center items-center gap-2"
                      href={post?.supplier?.url}
                      target="_blank"
                      rel="noopener noreferrer">
                      <Icon icon="fa-solid fa-cart-arrow-down" />
                      <span className="text-base">Download</span>
                    </Link>
                  </SpringButton>
                  <span className="text-xs text-slate-400">
                    Click here to view FAQ
                  </span>
                </div>
              </div>
            </div>
          </section>
          {/* Related collection */}
          {collection && (
            <section className="w-full space-y-6">
              <h1 className="text-xl font-medium capitalize">
                Same Collection
              </h1>
              <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {Children.toArray(
                  collection?.map(
                    (item) =>
                      item._id !== post._id && <ContentCard data={item} />
                  )
                )}
              </div>
            </section>
          )}
        </motion.div>
      ) : (
        <Skeleton />
      )}
    </>
  );
};

export default Post;
