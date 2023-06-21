import React from "react";
import { ArrowUp } from "@phosphor-icons/react";
import classes from "./scrollUpButton.module.css";

function ScrollToTopButton() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      className={classes.scrollToTopButton}
      onClick={scrollToTop}
      title="Voltar para o início"
    >
      <ArrowUp size={32} className={classes.scrollToTopStyle} />
    </button>
  );
}

export default ScrollToTopButton;
