type InputFieldProps = {
  label: string,
  value?: string,
  inputMode?: "search" | "text" | "email" | "tel" | "url" | "none" | "numeric" | "decimal" | undefined,
  handleChange: React.FormEventHandler,
  handleInput: React.FormEventHandler,
  required?: boolean
}

const InputField = ({ label, value, inputMode = "text", required, handleChange, handleInput }: InputFieldProps) => {

   return (
    <label htmlFor="inp" className="inp" >
      <input type="text"
        id="inp"
        inputMode={inputMode}
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