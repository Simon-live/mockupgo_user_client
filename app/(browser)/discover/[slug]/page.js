"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ContentGrid from "../../contentGrid";
// Service
import generalService from "@services/general";

const Discover = ({ params }) => {
  const router = useRouter();
  const category = params?.slug;
  const searchParams = useSearchParams();
  const tag = searchParams.get("t");

  const [data, setData] = useState(null);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState({ name: "", order: -1 });

  const getData = async () => {
    try {
      const res = await generalService.getResource({
        pageNumber: page,
        ...(category && { category }),
        ...(tag && { tag }),
        ...(sort.name && {
          sort: sort.name,
          order: sort.order,
        }),
      });
      setData(res?.data?.data);
    } catch (error) {
      router.replace("/404");
    }
  };

  useEffect(() => {
    getData();
  }, [page]);

  useEffect(() => {
    if (page === 1) {
      getData();
    } else {
      setPage(1);
    }
  }, [category, sort, tag]);

  useEffect(() => {
    document.title = (`${category?.toUpperCase()} - ` || "Loading... - ") + "Mockupgo";
  }, [data]);

  return (
    <ContentGrid
      data={data}
      currentPage={page}
      onFlip={setPage}
      onSort={setSort}>
      {/* Digest */}
      <section className="text-center space-y-4">
        <h1 className="font-semibold text-4xl capitalize">{category}</h1>
        <p className="text-sm font-light text-slate-600">
          10,000+ of the best web design work, designs, illustrations, and
          graphic elements.
        </p>
      </section>
    </ContentGrid>
  );
};

export default Discover;
