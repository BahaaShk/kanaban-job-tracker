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

// actions/applications.ts

// 'use server'

// CONCEPT NOTE — Server Actions, recap + what's new here
//
// 'use server' at the top of the file marks every exported function as a Server Action —
// it runs only on the server, never shipped to the browser as JS. You already used this
// pattern in actions/auth.ts. The new thing here: these actions also need to revalidate
// cached data after a write, which auth.ts didn't need.
//
// CONCEPT NOTE — revalidatePath
//
// Next.js caches rendered pages. If you create an application via a Server Action,
// the kanban board page won't automatically know data changed — it'll keep showing
// stale cached data until you tell Next.js to refetch.
// `revalidatePath('/applications')` tells Next.js: "the data behind this route changed,
// throw away the cache for it." You call this at the end of every action that
// writes to the database.

// TODO: import createClient from '@/lib/supabase/server'
// TODO: import revalidatePath from 'next/cache'
// TODO: import the CreateApplicationInput and Status types from '@/types'

// ============================================================
// createApplication
// ============================================================

// TODO: define an async function called createApplication
//   - accepts: input (type: CreateApplicationInput)
//   - returns: a typed result — { error: string | null }
//     (this is the "return typed result" pattern from auth.ts — no throwing)

//   - step 1: get the Supabase server client (await createClient())
//   - step 2: get the current user via supabase.auth.getUser()
//     hint: destructure user from data, same pattern as the dashboard layout
//   - step 3: if no user, return { error: 'Not authenticated' }
//   - step 4: insert a new row into the 'applications' table
//     hint: supabase.from('applications').insert({ ...input, user_id: user.id })
//     - spread the input fields, then explicitly add user_id
//       (never trust a user_id from the client — always set it server-side from the session)
//   - step 5: if the insert returns an error, return { error: error.message }
//   - step 6: call revalidatePath('/applications')
//   - step 7: return { error: null }

// ============================================================
// updateStatus
// ============================================================

// TODO: define an async function called updateStatus
export const updateStatus = async (id: string, status: Status): Promise<ActionResult> => {

  const supabase = await createClient();
  const {error} = await supabase.from('applications').update({status}).eq('id', id)

  if(error) return {error: error.message}

  revalidatePath('/applications')

  return{ error:null}
};
//   - accepts: id (type: string), status (type: Status)
//   - returns: { error: string | null }

//   - step 1: get the Supabase server client
//   - step 2: update the 'applications' table
//     hint: supabase.from('applications').update({ status }).eq('id', id)
//     - note: you don't need to manually check user.id here —
//       RLS policy already scopes updates to auth.uid() = user_id at the DB level
//       (this is why RLS matters: even if you forgot the check, Postgres blocks it)
//   - step 3: if error, return { error: error.message }
//   - step 4: revalidatePath('/applications')
//   - step 5: return { error: null }

// ============================================================
// deleteApplication
// ============================================================

// TODO: define an async function called deleteApplication
//   - accepts: id (type: string)
//   - returns: { error: string | null }

//   - same shape as updateStatus, but use .delete().eq('id', id) instead of .update()
//   - same revalidatePath and return pattern
