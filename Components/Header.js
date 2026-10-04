import React from 'react';
import Link from 'next/link';
import styles from './Header.module.css';
import cn from 'classnames';

const Header = ({ className }) => {
  const appName = process.env.NEXT_PUBLIC_APP_NAME;

  const navItems = [
    { href: '/', label: 'Accueil' },
    { href: '/authors', label: 'Authors' },
    { href: '/messages', label: 'Messages' },
    { href: '/contact', label: 'Contact' },
  ];


  return (
    <header className={cn(styles.header, className)}>
      <nav className={styles.nav}>
        {appName} -
        {navItems.map((item) => (
          <Link href={item.href} key={item.href} className={styles.link}>
            {item.label}
          </Link>
        ))}

      </nav>
    </header>
  );
};

export default Header;
