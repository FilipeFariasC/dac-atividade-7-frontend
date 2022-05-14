import { NavLink } from "react-router-dom";

interface NavItemProps{
  label: string;
  link: string;
  appendClassName?: string;
  children?: React.ReactNode | React.ReactNode[];
}

export default function NavItem({label, link, appendClassName, children}: NavItemProps){
  return (
    <li className={`nav-item ` + (appendClassName? appendClassName:"") }>
      <NavLink
      to={link}
      className={({isActive}) => "nav-link "+ (appendClassName? appendClassName+"-toggle":"") + (isActive ? ' active' : '') }
      data-bs-toggle={appendClassName?"dropdown":""}
      >
        {label}
      </NavLink>
      {children}
    </li>
  )
}