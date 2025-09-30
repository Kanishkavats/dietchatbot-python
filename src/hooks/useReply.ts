// ======================= Add Comment ======================= //

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addReply } from "../services/replyApi";
interface addReplyprops{
    id:string|null;
    data:{
    comment: string;
    name: string;
    email: string
    }
}
export const useAddReply=()=>{
      const queryClient = useQueryClient();

      return useMutation({
        mutationFn:({id,data}:addReplyprops)=>addReply(id,data),
        onSuccess:(data)=>{
            console.log("Reply Added",data)
        },
        onError:()=>{
            console.log("data not added");
        }
      })
}