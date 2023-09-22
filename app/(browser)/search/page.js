"use client";
import { useState, useEffect } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import Icon from "@components/icon";
import SpringButton from "@components/springButton";
import toast from "@components/toast";
import ContentGrid from "../contentGrid";
// Service
import generalService from "@services/general";

const Search = () => {
  const router = useRouter();
  const pathname = usePathname();
  // Query params
  const searchParams = useSearchParams();
  const [query, category, tag] = [
    searchParams.get("s"),
    searchParams.get("c"),
    searchParams.get("t"),
  ];

  const [data, setData] = useState(null);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState({ name: "", order: -1 });

  const getData = async () => {
    try {
      const res = await generalService.getResource({
        pageNumber: page,
        ...(query && { search: query }),
        ...(category && { category }),
        ...(tag && { tag }),
        ...(sort.name && {
          sort: sort.name,
          order: sort.order,
        }),
      });
      setData(res?.data?.data);
    } catch (error) {
      setData({})
    }
  };

  const handleSearch = (query) => {
    router.push(`${pathname}?s=${query}`);
  };

  const getDataByUpload = async (e) => {
    const data = new FormData();
    data.append("file", e.target.files[0]);
    e.target.value = null;
    router.push(pathname);
    try {
      const res = await generalService.getSimilarity(data);
      if (res?.data?.data?.result?.length > 0) {
        setData(res.data.data);
      } else {
        toast.info("No similar content");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    document.title = "Search - Mockupgo";
    getData();
  }, [page]);

  useEffect(() => {
    if (page === 1) {
      getData();
    } else {
      setPage(1);
    }
  }, [query, category, tag, sort]);

  return (
    <ContentGrid data={data} currentPage={page} onFlip={setPage} onSort={setSort}>
      {/* Searchbar */}
      <section className="w-full md:w-1/2 px-4 py-2 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center overflow-hidden">
        <Icon
          className="ml-2 text-slate-600 dark:text-slate-100 text-sm"
          icon="fa-solid fa-magnifying-glass"
        />
        <input
          className="w-full py-2 px-3 bg-transparent placeholder:text-slate-300"
          placeholder="Find your favorite mockup"
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch(e.target.value);
          }}
        />
        <SpringButton
          onClick={(e) => e.currentTarget.firstElementChild.click()}
          className="w-8 h-8 text-slate-600 dark:text-slate-100 bg-transparent btn-icon text-sm">
          <input
            type="file"
            accept=".jpg,.jpeg,.png,.webp"
            className="hidden"
            onChange={(e) => getDataByUpload(e)}
          />
          <Icon icon="fa-solid fa-camera" />
        </SpringButton>
      </section>
      {/* Digest */}
      <section className="text-center space-y-4">
        <p className="text-sm font-light text-slate-600 dark:text-slate-300">
          10,000+ of the best web design work, designs, illustrations, and
          graphic elements.
        </p>
      </section>
    </ContentGrid>
  );
};

export default Search;
