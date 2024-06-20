import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { links } from "./links";
import styles from "../../styles/navbar.module.css"
import Time from "../clock/clock";

interface NavLink {
  path: string;
  name: string;
}

const NavLinks: React.FC<{ links: NavLink[] }> = ({ links }) => {

  const router = useRouter();
  return (
    <div className={styles.linksContaner}>
    <ul className={styles.navLinks}>
      {links.map((link) => (
        <li key={link.path} className={router.pathname === link.path ? styles.active : ""}>
          <Link href={link.path}>
            <h1 className={styles.linkUrl}>{link.name}</h1>
          </Link>
        </li>
      ))}
    </ul>
    </div>
  );
};

const Navbar: React.FC = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.container}/>
      <NavLinks links={links} />
      <div />
    </nav>
  );
};

export default Navbar;
