"use client";

import React, {useState, useEffect} from "react";
import {useTheme} from "next-themes";
import {Classic} from "@theme-toggles/react";
import "@theme-toggles/react/css/Classic.css";

export const ToggleDarkMode = () => {
  const {resolvedTheme, setTheme} = useTheme();
  const [isDarkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (resolvedTheme) {
      setDarkMode(resolvedTheme === "dark");
    }
  }, [resolvedTheme]);

  const toggleDarkMode = (toggled) => {
    setDarkMode(toggled);
    setTheme(toggled ? "dark" : "light");
  };

  return (
    <Classic
      toggled={isDarkMode}
      onToggle={toggleDarkMode}
      duration={750}
      style={{fontSize: 40}}
    />
  );
};
