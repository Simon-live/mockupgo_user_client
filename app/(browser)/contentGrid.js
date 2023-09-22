"use client";
import { Children } from "react";
import { motion } from "framer-motion";
import ContentCard from "@components/contentCard";
import Dropdownbox from "@components/dropdownBox";
import Icon from "@components/icon";
import Pagination from "@components/pagination";
import Skeleton from "./skeleton";

const ContentGrid = ({ data, currentPage, children, onFlip, onSort }) => {
  const { result, total, pageSize } = data || {};

  return (
    <div className="w-full h-full flex flex-col justify-start items-center gap-8 md:gap-12">
      {children}
      {/* Content */}
      {data ? (
        result?.length > 0 ? (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full space-y-6">
            {/* Filter */}
            <div className="h-12 flex justify-between items-center gap-4">
              <Dropdownbox
                placeholder="Sort"
                icon="fa-solid fa-sort"
                isDefault={true}
                data={[
                  { title: "Newest", value: "create_date", order: -1 },
                  { title: "Oldest", value: "create_date", order: 1 },
                ]}
                onSelect={(item) => {
                  onSort({ name: item.value, order: item.order });
                }}
              />
              <Dropdownbox
                placeholder="Filter"
                icon="fa-solid fa-filter"
              />
            </div>
            {/* Cards */}
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Children.toArray(
                result?.map((item) => <ContentCard data={item} />)
              )}
            </div>
            {/* Pagination */}
            <Pagination
              totalPage={Math.ceil(total / pageSize)}
              currentPage={currentPage}
              onFlip={onFlip}
            />
          </motion.section>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full grid place-items-center">
            <div className="space-y-8">
              <div className="h-24 w-auto relative flex justify-center">
                <Icon
                  icon="fa-solid fa-box-open"
                  className="text-8xl text-theme-blue"
                />
                <div className="h-48 w-48 absolute top-2/3 flex justify-center">
                  <div className="h-full w-full backdrop-blur-lg"></div>
                </div>
              </div>
              <div className="relative z-10 flex flex-col gap-4 items-center">
                <div className="text-center space-y-2">
                  <h1 className="font-medium text-3xl">
                    We're under preparation
                  </h1>
                  <p className="text-slate-400 text-sm">
                    Sorry, we're still in progress of praparing the contene of
                    this part.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )
      ) : (
        <Skeleton />
      )}
    </div>
  );
};

export default ContentGrid;
