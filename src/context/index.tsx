"use client";

import { supabase } from "@/lib/supabase";
import { User } from "@/types";
import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext<any>(undefined)

export function AppWrapper({ children }: {
  children: React.ReactNode
}) {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        setLoading(true);

        const {
          data
        }: any = await supabase.auth.getSession()

        if (data) {
          console.log(data)
          setUser(data.user)
        }
      } catch (e) {
        // Handle error
        console.log(e);
      } finally {
        setLoading(false);
      }
    }

    fetchCurrentUser();
  }, [])

  if (loading) return <div>Loading...</div>

  return <AppContext.Provider value={{
    user,
    supabase
  }}>
    {children}
  </AppContext.Provider>
}

export function useAppContext() {
  return useContext(AppContext);
};