import { MaybeRef } from "@vueuse/core";
import { useQuery, useMutation } from "villus";

import { DocumentNode } from "graphql";
interface CustomError {
  response?: {
    status?: number;
  };
}

const ERROR_MESSAGE_401 = 401;

export async function runQuery(
  query: MaybeRef<DocumentNode>,
  variables: Record<string, string> | null = null
): Promise<Record<string, string | number | boolean>> {
  const result = (await useQuery({
    query,
    variables,
    cachePolicy: "network-only",
  }).execute()) as {
    error: CustomError;
    data: Record<string, string | number>;
  };

  detectError(result.error as CustomError);
  return result.data;
}

export async function runMutation(
  query: MaybeRef<DocumentNode>,
  variables: object
): Promise<Record<string, Record<string, string>>> {
  const result = (await useMutation(query).execute(variables)) as {
    error: CustomError;
    data: Record<string, Record<string, string>>;
  };
  detectError(result.error as CustomError);
  return result.data;
}

function detectError(error: CustomError) {
  if (error) {
    switch (error.response?.status) {
      case ERROR_MESSAGE_401:
        const rotaAtual = window.location.pathname;
        userStorage.setRoute(rotaAtual);
        userStorage.setId(userStorage.user.id);
        userStorage.logout(ERROR_MESSAGE_401);
        break;
      default:
        console.error(`Error ${error} - `);
        break;
    }
  }
}
