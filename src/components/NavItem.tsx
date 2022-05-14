import { NavLink } from "react-router-dom";

interface NavItemProps{
  label: string;
  link: string;
}

export default function NavItem({label, link}: NavItemProps){
  return (
    <li className="nav-item">
      <NavLink
      to={link}
      className={({isActive}) => "nav-link " + (isActive ? 'active' : '') } 
      >
        {label}
      </NavLink>
    </li>
  )
}