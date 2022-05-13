
interface FormGroupProps {
  label: string;
  forModel: string;
  children: React.ReactNode;
}


export default function FormGroup(props: FormGroupProps) {
  return (
    <div className="form-group mb-2">
      <label htmlFor={props.forModel}>{props.label}</label>
      {props.children}
    </div>
  );
}