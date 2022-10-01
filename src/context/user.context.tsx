import { AppRouter } from "../server/router/app.router";
import React, { createContext, useContext } from "react";
import { inferProcedureOutput } from "@trpc/server";

type TQuery = keyof AppRouter["_def"]["queries"];

type InferQueryOutput<TRouteKey extends TQuery> = inferProcedureOutput<
  AppRouter["_def"]["queries"][TRouteKey]
>;

const UserContext = createContext<InferQueryOutput<"users.me">>(null);

interface ContextProps {
  children: React.ReactNode;
  value: InferQueryOutput<"users.me"> | undefined;
}

export function UserContextProvider({ children, value }: ContextProps) {
    return <UserContext.Provider value={value || null}>{children}</UserContext.Provider>
}

export const useUserContext = () => useContext(UserContext);

