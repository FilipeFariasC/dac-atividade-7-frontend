
interface NavItemProps{
  page: boolean;
  goToPage: ()=> void;
  label: string;

}

export default function NavItem(props: NavItemProps){
  return (
    <li className="nav-item">
      <a 
      className={`nav-link `+ (props.page ? "active" : "")}
      href="/" 
      onClick={
        (event)=>{
          event.preventDefault();
          props.goToPage();
        }
      }>
        {props.label}
      </a>
    </li>
  )
}