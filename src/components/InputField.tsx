type InputFieldProps = {
  label: string,
  value?: string,
  handleChange: React.FormEventHandler,
  handleInput: React.FormEventHandler,
  required?: boolean
}

const InputField = ({ label, value, required, handleChange, handleInput }: InputFieldProps) => {

   return (
    <label htmlFor="inp" className="inp" >
      <input type="text"
        id="inp"
        value={value}
        required={required}
        onChange={handleChange}
        onInput={handleInput}
        placeholder="&nbsp;" />
      <span className="label">{label}</span>
    </label>
  )
}

export default InputField;