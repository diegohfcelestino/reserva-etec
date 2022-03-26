/* eslint-disable no-unused-vars */
import React, { useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { supabase } from "../supabaseClient";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const session = supabase.auth.session();

    setUser(session?.user ?? null);
    setLoading(false);

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => {
      listener?.unsubscribe();
    };
  }, []);

  async function resetPassword(email, callback) {
    if (!email) {
      return toast.error("Informe seu email!")
    } else {
      const { error } = await supabase.auth.api.resetPasswordForEmail(email)
      if (error) {
        return toast.error(error.message)
      } else {
        return toast.success("Verifique e-mail de noreply@mail.app.supabase.io", {
          onClose: callback
        })
      }
    }
  }

  const value = {
    signUp: (data) => supabase.auth.signUp(data),
    signIn: (data) => supabase.auth.signIn(data),
    signOut: () => supabase.auth.signOut(),
    user,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
