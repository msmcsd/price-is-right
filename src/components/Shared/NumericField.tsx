import InputField from "./InputField";

type NumericFieldProps = {
  label: string,
  handleChange: React.FormEventHandler,
  required?: boolean,
  value?: number
}

const NumericField = ({label, required, value, handleChange}: NumericFieldProps) => {

  // Numbers only. Only one decimal allowed.
  const handlePriceInput = (e: React.FormEvent<HTMLInputElement>) => {
    e.currentTarget.value = e.currentTarget.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');
  }

  return (
    <InputField value={value?.toString()} label={label} inputMode="numeric" handleChange={handleChange} handleInput={handlePriceInput} required={required}/>
  )
}

export default NumericField;