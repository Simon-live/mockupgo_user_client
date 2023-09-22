"use client";
import { Children, useState, useContext } from "react";
import InitialContext from "@contexts/initialContext";
import { useRouter } from "next/navigation";
import CustomLogo from "@components/logo/customLogo";
import Icon from "@components/icon";
import SpringButton from "@components/springButton";

const Navbar = () => {
  let { data, handleThemeChange } = useContext(InitialContext);
  const router = useRouter();

  const [visibility, setVisibility] = useState(false);
  const [subcategoryVisibility, setSubcategoryVisibility] = useState(null);

  return (
    <nav className="px-6 md:px-8 lg:px-12 py-4 flex justify-between items-center gap-8 border-b-[1px] border-slate-100 dark:border-slate-800">
      {/* Logo */}
      <CustomLogo
        onClick={() => router.push("/")}
        className="h-6 cursor-pointer"
      />
      {/* Menu */}
      <div className="grow hidden md:flex justify-start items-center gap-8">
        {/* Browser category */}
        {data?.browser_category && (
          <div
            onMouseEnter={() => setVisibility(true)}
            onMouseLeave={() => setVisibility(false)}
            className="cursor-pointer flex items-center gap-1 relative">
            <span className="text-sm">Browser</span>
            <Icon
              className="text-xs"
              icon={`fa-solid fa-chevron-${visibility ? "up" : "down"}`}
            />
            <div
              onClick={(e) => e.stopPropagation()}
              className={`${
                visibility ? "opacity-100 visible" : "opacity-0 invisible"
              } w-auto transition-all p-2 space-y-1 bg-white dark:bg-slate-800 rounded-lg md:rounded-xl shadow-[0_8px_25px_0] shadow-slate-500/10 absolute z-50 -bottom-2 translate-y-full`}>
              {Children.toArray(
                data?.browser_category?.map((item) => (
                  <div
                    onClick={() => router.push(item.url)}
                    onMouseEnter={() => setSubcategoryVisibility(item.title)}
                    onMouseLeave={() => setSubcategoryVisibility(null)}
                    className="flex gap-8 px-4 py-2 rounded-lg md:rounded-xl items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-900 cursor-pointer relative">
                    <span className="text-sm capitalize whitespace-nowrap">
                      <Icon
                        className={`text-xs text-slate-600 mr-2`}
                        icon="fa-solid fa-hashtag"
                      />
                      {item.title}
                    </span>
                    <Icon
                      className={`text-xs text-slate-600 ${
                        !item?.subcategory
                          ? "opacity-0 invisible"
                          : "opacity-100 visible"
                      }`}
                      icon="fa-solid fa-chevron-right"
                    />
                    {item?.subcategory && (
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        className={`${
                          subcategoryVisibility === item.title
                            ? "opacity-100 visible"
                            : "opacity-0 invisible"
                        } w-auto transition-all p-2 space-y-1 bg-white dark:bg-slate-800 rounded-lg md:rounded-xl shadow-[0_8px_25px_0] shadow-slate-500/10 absolute z-50 -right-2 top-0 translate-x-full`}>
                        {Children.toArray(
                          item?.subcategory?.map((item) => (
                            <div
                              onClick={() => router.push(item.url)}
                              className="flex gap-8 px-4 py-2 rounded-lg md:rounded-xl items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-900 cursor-pointer relative">
                              <span className="text-sm capitalize whitespace-nowrap">
                                <Icon
                                  className={`text-xs text-slate-600 mr-2`}
                                  icon="fa-solid fa-hashtag"
                                />
                                {item.title}
                              </span>
                            </div>
                          ))
                        )}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        )}
        {/* Other menu */}
        {Children.toArray(
          data?.header_menu?.map((item) => (
            <div
              onClick={() => router.push(item.url)}
              className="cursor-pointer">
              <span className="text-sm">{item.title}</span>
            </div>
          ))
        )}
      </div>
      {/* Button */}
      <div className="flex items-center gap-4">
        <section className="flex items-center gap-4">
          <SpringButton
            onClick={() => router.push("/search")}
            className="btn-icon">
            <Icon
              className="text-xs"
              icon="fa-solid fa-search"
            />
          </SpringButton>
          <SpringButton
            onClick={() => {
              let t =
              typeof window !== "undefined" && window.localStorage.getItem("theme") === "light"
                  ? "dark"
                  : "light";
                  typeof window !== "undefined" && window?.localStorage.setItem("theme", t);
              handleThemeChange(t);
            }}
            className="btn-icon">
            {typeof window !== "undefined" && window.localStorage.getItem("theme") === "light" ? (
              <Icon
                className="text-xs"
                icon="fa-solid fa-moon"
              />
            ) : (
              <Icon
                className="text-xs"
                icon="fa-solid fa-sun"
              />
            )}
          </SpringButton>
        </section>
        <SpringButton className="hidden md:block btn text-sm text-theme-blue bg-theme-blue/5">
          SIGN
        </SpringButton>
      </div>
    </nav>
  );
};

export default Navbar;
