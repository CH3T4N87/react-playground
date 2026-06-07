interface FormField{
    label: string,
    required?: boolean,
    error?: string,
    children: React.ReactNode
}


const FormField = ({children, label, error, required}: FormField) => {
  return (
    <div>
        <label htmlFor="">{label} {required && <span>*</span>}</label>
        {children}
        {error && <span>{error}</span>}
    </div>
  )
}

export default FormField