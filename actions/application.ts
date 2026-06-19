"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { CreateApplicationInput } from "@/types";

export const createApplication = async (
  input: CreateApplicationInput,
): Promise<{
  error: string | null;
}> => {
  const supabase = await createClient()
  const {data : {user}} = await supabase.auth.getUser()

  if(!user) return {error: "Not authenticated"}

  const {error} = await supabase.from("applications").insert({
    ...input,
    user_id : user.id
  })
  if(error){
    return{error: error.message}
  }

  revalidatePath('/applications')

  return {error: null}
};
