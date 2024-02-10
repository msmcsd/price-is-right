import { FormEventHandler } from "react";
import "../css/ItemLookup.css";

type ItemLookupFormProps = {
  handleTextChange: FormEventHandler,
  handleSubmit: FormEventHandler,
  numericInput?: boolean
}

const ItemLookupForm = ({ handleTextChange, handleSubmit, numericInput } : ItemLookupFormProps) => {

  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, '');
  }

  return (
    <form className="flex-form" onSubmit={handleSubmit}>
      <input type="text"
            name="barcode"
            inputMode={numericInput? "numeric":"text"}
            placeholder="Enter barcode"
            onChange={handleTextChange}
            onInput={handleInput}
            required
      />
      <input type="submit" className="red-button" value="Look up" />
    </form>
  )
}

export default ItemLookupForm;