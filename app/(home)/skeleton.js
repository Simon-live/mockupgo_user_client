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
      {/* Banner */}
      <div className="w-full h-96 grid grid-cols-1 md:grid-cols-3 grid-rows-2 gap-6">
        {/* Carouse */}
        <div className="col-span-1 md:col-span-2 row-span-2 bg-slate-100 dark:bg-slate-800 rounded-2xl overflow-hidden"></div>
        {/* Campaign */}
        {Children.toArray(
          [...Array(2)].map(() => (
            <div className="hidden md:block col-span-1 row-span-1 animate-pulse bg-slate-100 dark:bg-slate-800 rounded-2xl overflow-hidden"></div>
          ))
        )}
      </div>

      <section className="w-full space-y-6 flex flex-col">
        <h1 className="text-xl font-medium capitalize">
          <div className="h-9 w-72 animate-pulse bg-slate-100 dark:bg-slate-800 rounded"></div>
        </h1>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Children.toArray([...Array(24)].map(() => <ContentCardSkeleton />))}
        </div>
      </section>
    </motion.div>
  );
};

export default Skeleton;
