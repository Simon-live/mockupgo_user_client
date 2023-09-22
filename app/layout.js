"use client";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import Navbar from "@components/navbar";
import Footer from "@components/footer";
import InitialContext from "@contexts/initialContext";
import "@styles/globals.css";
// Service
import generalService from "@services/general";

const RootLayout = ({ children }) => {
  const [data, setData] = useState(null);
  const [theme, setTheme] = useState("");

  library.add(fas, far);

  useEffect(() => {
    document.title = "Mockupgo";

    /* Get data */
    const getData = async () => {
      generalService
        .getContent({
          key: [
            "statistic",
            "description",
            "footer_links",
            "browser_category",
            "header_menu",
            "carousel",
            "campaign_banner",
            "copy_right",
          ],
        })
        .then((res) => {
          setData(res.data.data);
        });
    };
    getData();

    /* Switch theme */
    const localTheme = window.localStorage.getItem("theme");
    if (localTheme === "light" || localTheme === "dark") {
      setTheme(localTheme);
    } else {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        setTheme("dark");
      } else {
        setTheme("light");
      }
    }
  }, []);

  return (
    <html
      className={theme}
      lang="en">
      <body className="flex flex-col min-h-screen transition-all">
        <Toaster />
        <InitialContext.Provider value={{ data, handleThemeChange: setTheme }}>
          <Navbar />
          <main className="flex-[1_0_auto] p-6 md:px-8 lg:px-12 md:py-12">
            {children}
          </main>
          <Footer />
        </InitialContext.Provider>
      </body>
    </html>
  );
};

export default RootLayout;
