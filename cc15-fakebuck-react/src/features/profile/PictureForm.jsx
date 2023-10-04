import FormButton from "./FormButton";
import { useRef, useState } from "react";

export default function PictureForm({ title, children, initialSrc, onSave }) {
  const [file, setFile] = useState(null);

  const inputEl = useRef(null);

  return (
    <div>
      <input
        type="file"
        className="hidden"
        ref={inputEl}
        onChange={(e) => {
          if (e.target.files[0]) {
            setFile(e.target.files[0]);
          }
        }}
      />
      <div className="flex justify-between items-center">
        <h5 className="text-xl font-semibold ">{title}</h5>
        <div className="flex">
          {file && (
            <>
              <FormButton onClick={() => onSave(file)}>Save</FormButton>
              <FormButton
                onClick={() => {
                  inputEl.current.value = "";
                  setFile(null);
                }}
              >
                Cancel
              </FormButton>
            </>
          )}
          <FormButton
            onClick={() => {
              inputEl.current.click();
            }}
          >
            Edit
          </FormButton>
        </div>
      </div>
      <div className="flex justify-center">
        {children(file ? URL.createObjectURL(file) : initialSrc, () =>
          inputEl.current.click()
        )}
      </div>
    </div>
  );
}
