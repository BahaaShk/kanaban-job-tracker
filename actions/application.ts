"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { CreateApplicationInput, Status } from "@/types";

type ActionResult = {
  error: string | null;
};

export const createApplication = async (
  input: CreateApplicationInput,
): Promise<ActionResult> => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "Not authenticated" };

  const { error } = await supabase.from("applications").insert({
    ...input,
    user_id: user.id,
  });
  if (error) {
    return { error: error.message };
  }

  revalidatePath("/applications");

  return { error: null };
};

export const updateStatus = async (id: string, status: Status): Promise<ActionResult> => {

  const supabase = await createClient();
  const {error} = await supabase.from('applications').update({status}).eq('id', id)

  if(error) return {error: error.message}

  revalidatePath('/applications')

  return{ error:null}
};

export const deleteApplication = async (id : string): Promise<ActionResult> => {

  const supabase = await createClient();

  const { error} = await supabase.from('applications').delete().eq('id', id)

  if(error) return {error: error.message}
  revalidatePath('/applications')
  return { error: null}
}

