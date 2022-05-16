
interface FormGroupProps {
  label: string;
  forModel: string;
  children: React.ReactNode;
}


export default function FormGroup({label, forModel, children}: FormGroupProps) {
  return (
    <div className="form-group mb-2">
      <label className="col-form-label" htmlFor={forModel}>{label}</label>
      {children}
    </div>
  );
}