import { Children } from "react";
import { useRouter } from "next/navigation";
import Icon from "@components/icon";
import config from "@config/default";

const ContentCard = ({ data }) => {
  const router = useRouter();
  return (
    <div className="space-y-1 md:space-y-2 group">
      <div
        onClick={() => router.push(`/post/${data?._id}`)}
        className="bg-slate-100 w-full h-64 md:h-52 p-4 flex justify-end items-start bg-center bg-cover rounded-lg md:rounded-xl cursor-pointer group-hover:shadow-2xl group-hover:shadow-slate-300 dark:group-hover:shadow-slate-950 transition-all duration-300"
        style={{
          backgroundImage: `url(${config?.contentPath}/${data?.thumbnail?.file_name})`,
        }}>
        {data?.collection_id && (
          <Icon
            icon="fa-solid fa-bars-progress"
            className="text-white text-sm"
          />
        )}
      </div>
      <div className="w-full px-1">
        <div className="space-x-1 md:space-x-2">
          {Children.toArray(
            data?.category?.map((item, index) => (
              <>
                {index > 0 && (
                  <span className="text-xs text-slate-300 font-light capitalize">
                    /
                  </span>
                )}
                <span
                  onClick={() => router.push(`/discover/${item?.title}`)}
                  className="text-xs text-slate-300 font-light capitalize cursor-pointer">
                  {item?.title}
                </span>
              </>
            ))
          )}
        </div>
        <div className="flex justify-between items-center gap-4">
          <h3
            onClick={() => router.push(`/post/${data?._id}`)}
            className="inline-block text-ellipsis whitespace-nowrap overflow-hidden  cursor-pointer">
            {data?.title}
          </h3>
          <span className="text-sm text-slate-600 dark:text-slate-100">
            {data?.price > 0 ? `$${data?.price}` : "Free"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ContentCard;
