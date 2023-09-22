import { Children } from "react";
import { motion } from "framer-motion";
import ContentCardSkeleton from "@components/contentCardSkeleton";

const Skeleton = () => {
  return (
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
              {/* Title placeholder */}
              <div className="h-9 w-96 animate-pulse bg-slate-100 dark:bg-slate-800 rounded"></div>
              {/* Tag placeholder */}
              <ul className="flex items-center gap-2 flex-wrap">
                {Children.toArray(
                  [...Array(4)].map((tag) => (
                    <li className="font-light capitalize rounded-md px-3 py-1 animate-pulse bg-slate-100 dark:bg-slate-800">
                      <div className="h-4 w-4 animate-pulse bg-slate-100 dark:bg-slate-800 rounded"></div>
                    </li>
                  ))
                )}
              </ul>
            </div>
          </div>
          <div className="h-[60vw] md:h-[40vw] min-h-108 animate-pulse bg-slate-100 dark:bg-slate-800 rounded-lg md:rounded-xl"></div>
        </div>
        {/* Widgets */}
        <div className="flex-initial md:w-96">
          <div className="p-6 animate-pulse bg-slate-100 dark:bg-slate-800 rounded-lg md:rounded-xl space-y-8">
            <div className="flex justify-between gap-2">
              <div className="space-y-1">
                <div className="h-7 w-32 animate-pulse bg-slate-200 dark:bg-slate-900 rounded"></div>
                <div className="text-xs text-slate-300 space-x-2">
                  <span>
                    <div className="h-4 w-20 animate-pulse bg-slate-200 dark:bg-slate-900 rounded"></div>
                  </span>
                </div>
              </div>
            </div>
            <ul className="w-full flex flex-col gap-4">
              {Children.toArray(
                [...Array(4)].map((item) => (
                  <li className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="btn-icon animate-pulse bg-slate-200 dark:bg-slate-900 text-slate-400">
                        <div className="h-6 w-6 rounded"></div>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-sm">
                          <div className="h-4 w-16 animate-pulse bg-slate-200 dark:bg-slate-900 rounded"></div>
                        </span>
                        <span className="text-xs font-light text-slate-400">
                          <div className="h-2 w-10 animate-pulse bg-slate-200 dark:bg-slate-900 rounded"></div>
                        </span>
                      </div>
                    </div>
                    <span className="text-sm">
                      <div className="h-7 w-20 animate-pulse bg-slate-200 dark:bg-slate-900 rounded"></div>
                    </span>
                  </li>
                ))
              )}
            </ul>
            <div className="flex flex-col justify-center items-center gap-2">
              <div className="w-full h-14 btn rounded-full animate-pulse bg-slate-200 dark:bg-slate-900"></div>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full space-y-6">
        <h1 className="text-xl font-medium capitalize"><div className="h-9 w-72 animate-pulse bg-slate-100 dark:bg-slate-800 rounded"></div></h1>
        <div className="w-full grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Children.toArray(
            [...Array(4)].map(() => <ContentCardSkeleton />)
          )}
        </div>
      </section>
    </motion.div>
  );
};

export default Skeleton;
