import { motion } from "framer-motion";

const ContentCardSkeleton = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-2">
      <div className="bg-slate-100 dark:bg-slate-800 w-full h-64 md:h-52 p-4 flex justify-end items-start bg-center bg-cover rounded-lg md:rounded-xl"></div>
      <div className="w-full px-1 space-y-1 md:space-y-2">
        <div className="space-y-1 md:space-y-2">
          <span className="text-xs font-light capitalize">
            <div className="h-3 w-12 animate-pulse bg-slate-100 dark:bg-slate-800 dark:bg-slate-800 rounded"></div>
          </span>
        </div>
        <div className="flex justify-between items-center gap-4">
          <h3 className="inline-block text-ellipsis whitespace-nowrap overflow-hidden">
            <div className="h-6 w-28 animate-pulse bg-slate-100 dark:bg-slate-800 rounded"></div>
          </h3>
          <span className="text-sm">
            <div className="h-6 w-12 animate-pulse bg-slate-100 dark:bg-slate-800 rounded"></div>
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default ContentCardSkeleton;
