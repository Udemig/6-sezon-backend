import React from "react";
import InputField from "../components/InputField";
import { inputs } from "../utils/constants";

const Create = () => {
  return (
    <div className="min-h-screen bg-yellow-600 flex items-center justify-center px-5 py-8">
      <div className="bg-white w-full max-w-[1000px] p-10 rounded shodow-lg grid grid-cols-1 md:grid-cols-2">
        <form className="flex flex-col gap-8">
          <h1 className="text-3xl font-semibold">Yeni Film Oluştur</h1>

          {inputs.map((props) => (
            <InputField {...props} />
          ))}
          <button>Oluştur</button>
        </form>
      </div>
    </div>
  );
};

export default Create;
