import { Children } from "react";
import { motion } from "framer-motion";
import ContentCardSkeleton from "@components/contentCardSkeleton";

const Skeleton = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full space-y-6">
      {/* Filter */}
      <div className="h-12 flex justify-between items-center gap-4">
        <div className="w-1/5 py-2 px-3 animate-pulse bg-slate-100 dark:bg-slate-800 rounded-2xl">
          <div className="h-5"></div>
        </div>
        <div className="w-1/5 py-2 px-3 animate-pulse bg-slate-100 dark:bg-slate-800 rounded-2xl">
          <div className="h-5"></div>
        </div>
      </div>
      {/* Cards */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Children.toArray([...Array(12)].map(() => <ContentCardSkeleton />))}
      </div>
    </motion.section>
  );
};

export default Skeleton;
