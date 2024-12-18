import { ReactElement } from "react";

import "./AppItem.css";

interface IAppItem {
  icon: ReactElement;
  title: string;
  link: string;
  activeWhen: string;
  color: string;
}

function AppItem({ icon, title, link, activeWhen, color }: IAppItem) {

  const getClass = () => {
    const link = window.location.pathname.split('/');

    console.log(window.location.pathname, link, color)
    
    return link && link.length >= 1 && activeWhen === link[1] ? 'active' : 'not-active'
  }

  return (
    <li className={`item-gallery ${getClass()}`}>
      <a href={link}>
        <i>{icon}</i>
        <p>{title}</p>
      </a>
    </li>
  );
}

export default AppItem;