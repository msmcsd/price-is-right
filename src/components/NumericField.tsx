type NumericFieldProps = {
  label: string,
  handleChange: React.FormEventHandler
}

const NumericField = ({label, handleChange}: NumericFieldProps) => {

  // Numbers only. Only one decimal allowed.
  const handlePriceInput = (e: React.FormEvent<HTMLInputElement>) => {
    e.currentTarget.value = e.currentTarget.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');
  }

  return (
    <label htmlFor="inp" className="inp">
      <input type="text"
            id="inp"
            onChange={handleChange}
            onInput={handlePriceInput}
            placeholder="&nbsp;" />
          <span className="label">{label}</span>
    </label>
  )
}

export default NumericField;