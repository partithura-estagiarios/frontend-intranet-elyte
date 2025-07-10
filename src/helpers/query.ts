import { MaybeRef } from "@vueuse/core";
import { useMutation, useQuery } from "villus";

export async function runQuery<T>(
  query: MaybeRef<Document>,
  variables?: any
): Promise<T> {
  const { data } = (await useQuery({
    query,
    variables,
    cachePolicy: "network-only",
  }).execute()) as {
    data: T;
  };
  return data;
}

export async function runMutation(
  query: MaybeRef<Document>,
  variables: object
): Promise<Record<string, Record<string, string>>> {
  const { data } = (await useMutation(query).execute(variables)) as {
    data: Record<string, Record<string, string>>;
  };
  return data;
}
