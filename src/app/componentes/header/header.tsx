"use client";

import styles from "../../page.module.css";
import MenuLateral from "../menuLateral/menuLateral";
import GearMenu from "../gearMenu/GearMenu";

export default function Header() {
  return (
    <header className={styles.header}>
      <MenuLateral />
      <GearMenu />
    </header>
  );
}
