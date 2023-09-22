"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import CustomLogo from "@components/logo/customLogo";
import SpringButton from "@components/springButton";

const NotFound = () => {
  const router = useRouter();
  useEffect(() => {
    document.title = "404 - Mockupgo";
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full h-full grid place-items-center">
      <div className="space-y-12">
        <div className="h-32 w-auto relative flex justify-center">
          <CustomLogo type="shape" />
          <div className="h-96 w-96 absolute top-2/3 flex justify-center">
            <div className="h-full w-full backdrop-blur-lg"></div>
          </div>
        </div>
        <div className="relative z-10 flex flex-col gap-4 items-center">
          <span className="px-2 py-1 bg-theme-blue/5 text-theme-blue text-xs rounded capitalize">
            404 not found
          </span>
          <div className="text-center space-y-2">
            <h1 className="font-medium text-3xl">We've lost this page</h1>
            <p className="text-slate-400 text-sm">
              Sorry, the page you are looking for doesn't exist or has been
              moved.
            </p>
          </div>
          <SpringButton
            onClick={() => router.push("/")}
            className="mt-4 btn text-sm bg-theme-blue text-white">
            Go home
          </SpringButton>
        </div>
      </div>
    </motion.div>
  );
};

export default NotFound;
