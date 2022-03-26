import { createContext, useContext, useState } from "react";

export const NavBarContext = createContext();

export function NavBarProvider({ children }) {
  const [isHome, setIsHome] = useState(false)

  function handleIsHome(prop) {
    setIsHome(prop)
  }
  return (
    <NavBarContext.Provider value={{
      isHome,
      handleIsHome,
      setIsHome,
    }}>
      {children}
    </NavBarContext.Provider>
  )
}

export function useNavbarContext() {
  return useContext(NavBarContext)
}