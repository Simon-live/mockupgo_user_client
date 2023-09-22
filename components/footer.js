import { Children, useContext } from "react";
import InitialContext from "@contexts/initialContext";
import Link from "next/link";
import CustomLogo from "@components/logo/customLogo";

const Footer = () => {
  let { data } = useContext(InitialContext);

  return (
    <footer className="flex-shrink-0 px-6 md:px-8 lg:px-12 py-12 space-y-4 md:space-y-16 bg-slate-50 dark:bg-slate-950">
      <section className="flex justify-center md:justify-between items-start md:gap-12">
        {/* Logo and description */}
        <div className="space-y-4">
          <div className="flex flex-row md:flex-col items-start gap-2">
            <CustomLogo
              type="shape"
              className="h-4 md:h-14"
            />
            <CustomLogo
              type="text"
              className="h-4 md:h-6"
            />
          </div>
          <p className="hidden md:inline-block text-xs leading-5 font-light max-w-sm">
            {data?.description}
          </p>
        </div>
        {/* Links */}
        <div className="hidden w-1/3 md:flex gap-6">
          {Children.toArray(
            data?.footer_links?.map((item) => (
              <div className="flex-1 flex justify-end">
                <div className="flex flex-col justify-start items-start gap-2">
                  <span className="text-sm uppercase text-slate-400">
                    {item.title}
                  </span>
                  {Children.toArray(
                    item.url?.map((link) => (
                      <Link
                        href={link.url}
                        className="text-sm capitalize whitespace-nowrap">
                        {link.name}
                      </Link>
                    ))
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Copyright and statistic */}
      <section className="flex flex-col-reverse md:flex-row justify-between items-center font-light text-xs">
        <span>
          Move faster with NEXT.JS ❤{" "}
          {`${data?.statistic?.mockups} mockups, ${data?.statistic?.members} members.`}
        </span>
        <span>{data?.copy_right}</span>
      </section>
    </footer>
  );
};

export default Footer;
