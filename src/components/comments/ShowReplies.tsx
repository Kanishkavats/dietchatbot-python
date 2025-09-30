'use client'
import { useGetReplies } from "@/src/hooks/useComments";
import CustomLoader from "../common/Loader/CustomLoader";
import ButtonLoader from "../common/Loader/ButtonLoader";

export default function ShowReply({commentId}:{commentId:string|null}) {
 const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useGetReplies(commentId);

  const allReplies = data?.pages.flatMap((page) => page.replies) ?? [];
 if (isLoading) return  <div className="w-10 h-10 mt-5 flex items-center justify-start"><ButtonLoader/></div>;
  if (isError) return <div className="text-sm text-red-500">Failed to load replies.</div>;
  return(
        <div className="max-w-2xl mt-2 mx-auto ml-4 space-y-4">
    {allReplies.map((reply,index) => (
      <div key={`${reply.id}-${index}`} className="flex flex-row items-start space-x-2">
        <div className="w-7 h-7 flex-shrink-0 rounded-full overflow-hidden border-2 border-dashed border-yellow-400 p-1 bg-white flex items-center justify-center">
          <span className="text-xs font-bold text-gray-500">
            {reply.name.charAt(0).toUpperCase()}
          </span>
        </div>
        <div className="flex-1">
          <h5 className="text-xs sm:text-sm font-bold font-nunito">{reply.name}</h5>
          <p className="text-xs mt-0.5 text-gray-green font-nunito leading-snug whitespace-pre-line">
            {reply.comment}
          </p>
        </div>
      </div>
    ))}
    {hasNextPage && (
      <button
        onClick={() => fetchNextPage()}
        disabled={isFetchingNextPage}
        className="text-xs cursor-pointer text-gray-green hover:underline mt-2"
      >
        {isFetchingNextPage ? "Loading more..." : "Load more replies"}
      </button>
      )}
     </div>
    )
}