import Select from "react-select/creatable";
import { Link } from "react-router-dom";
import { useState } from "react";

const Form = ({ isLoading, mutate }) => {
  const [ingredients, setIngredients] = useState([]);
  const handleSubmit = (e) => {
    e.preventDefault();

    //bütün inputlarda ki verilere obje formatında eriş
    const formData = new FormData(e.target);
    let newRecipe = Object.fromEntries(formData.entries());

    //adımları "," e göre diziye çevir
    newRecipe.instructions = newRecipe.instructions.split(",");

    //malzemeleri nesneye ekle
    newRecipe.ingredients = ingredients;

    console.log(newRecipe);

    //api isteği at
    mutate(newRecipe);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="my-5 flex flex-col gap-7 max-w-[550px] mx-auto"
    >
      <Field label="Başlık">
        <input className="inp" name="recipeName" required />
      </Field>

      <Field label="Kategori">
        <input className="inp" name="category" required />
      </Field>

      <Field label="Süre">
        <input className="inp" name="recipeTime" required />
      </Field>

      <Field label="Malzemeler">
        <Select
          isMulti
          onChange={(options) =>
            setIngredients(options.map((opt) => opt.value))
          }
        />
      </Field>

      <Field label="Tarif Adımları (, ile ayırınız)">
        <textarea
          className="inp min-h-[80px] max-h-[300px] "
          name="instructions"
        ></textarea>
      </Field>

      <Field label="Sunum Önerisi">
        <textarea
          className="inp min-h-[80px] max-h-[200px] "
          name="servingSuggestion"
        ></textarea>
      </Field>

      <div className="flex justify-end gap-6">
        <Link to="/" className="btn">
          Geri
        </Link>

        <button className="btn bg-red-400 hover:bg-red-500" type="submit">
          Oluştur
        </button>
      </div>
    </form>
  );
};

export default Form;

//HOC -Higher Order Components

const Field = ({ children, label }) => {
  return (
    <div className="flex flex-col gap-1">
      <label> {label} </label>

      {children}
    </div>
  );
};
