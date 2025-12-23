import { useState } from "react";
import { useAddHabitMutation } from "../../api/apiSlice";
import categoryConfig from "../../utils/utilConsts";

const createId = () => Date.now();
const categoriesArray = Object.entries(categoryConfig).map(([key, value]) => {
  return {
    id: key,
    ...value,
  };
});

function AddModal({ modalOpen, setModalOpen }) {
  const [titleInput, setTitleInput] = useState("");
  const [descInput, setDescInput] = useState("");
  const [intervalOneInput, setIntervalOneInput] = useState("0");
  const [categoryOption, setCategoryOption] = useState("health");
  const [intervalOneShaking, setIntervalOneShaking] = useState(false);
  const [titleShaking, setTitleShaking] = useState(false);

  const [triggerAddHabit, { isLoading }] = useAddHabitMutation();

  const intervalOneCheck = (value) => {
    if (value <= 10 && value >= 0) setIntervalOneInput(value);
    else {
      setIntervalOneShaking(true);
      setTimeout(() => setIntervalOneShaking(false), 400);
    }
  };

  const handleAdd = async () => {
    if (!titleInput.trim()) {
      setTitleShaking(true);
      setTimeout(() => setTitleShaking(false), 400);
      return;
    }
    try {
      await triggerAddHabit({
        id: createId(),
        title: titleInput,
        desc: descInput,
        goal: Number(intervalOneInput),
        category: categoryOption,
      }).unwrap();
      console.log("Успех!");
      setModalOpen(false); // Закроется только если unwrap прошел успешно
      resetForm();
    } catch (err) {
      console.error("Не удалось добавить привычку:", err);
      // Тут можно вывести уведомление об ошибке пользователю
    }
  };

  const resetForm = () => {
    setTitleInput("");
    setDescInput("");
    setCategoryOption("health");
    setIntervalOneInput("0");
  };

  return (
    <div>
      <div className="flex flex-col items-center">
        <button
          className="py-3 rounded-lg bg-blue-800 border-2 w-11/12 md:w-2/12 cursor-pointer 
          hover:bg-blue-600 transition-all border-blue-500 text-white duration-200"
          id="modalBtn"
          onClick={() => setModalOpen(true)}
        >
          Добавить новую
        </button>
      </div>
      {modalOpen && (
        <>
          <div
            className="fixed inset-0 z-10 bg-gray-900/50 backdrop-blur-sm"
            onClick={() => {
              setModalOpen(false), resetForm();
            }}
          />
          <div className="fixed w-11/12 md:max-w-md rounded-xl -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 z-20 flex flex-col items-center justify-between gap-2 p-4 bg-white">
            <input
              className={`rounded-md p-2 placeholder-gray-700 border 
                ${
                  titleShaking
                    ? "border-amber-400 animate-shake bg-amber-200"
                    : "bg-slate-300 border-slate-500"
                }`}
              type="text"
              name=""
              id=""
              value={titleInput}
              placeholder="Название..."
              onChange={(e) => setTitleInput(e.target.value)}
            />
            <input
              className="bg-slate-300 rounded-md p-2 placeholder-gray-700 border border-slate-500"
              type="text"
              name=""
              id=""
              placeholder="Описание..."
              value={descInput}
              onChange={(e) => setDescInput(e.target.value)}
            />
            <div className="flex justify-center gap-1">
              <input
                className={`max-w-3/24  rounded-md px-1 border
                ${
                  intervalOneShaking
                    ? "border-amber-400 animate-shake bg-amber-200"
                    : "border-slate-500 bg-slate-300"
                }`}
                type="number"
                name=""
                id=""
                value={intervalOneInput}
                onChange={(e) => intervalOneCheck(e.target.value)}
              />
              <p>раз в неделю</p>
            </div>
            <select
              value={categoryOption}
              className="border border-slate-500 rounded p-1"
              onChange={(e) => setCategoryOption(e.target.value)}
              name=""
              id=""
            >
              {categoriesArray.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.label}
                </option>
              ))}
            </select>
            <div className="flex w-full justify-around items-center">
              <button
                disabled={
                  isLoading || !titleInput.trim() || intervalOneInput === "0"
                }
                onClick={handleAdd}
                className={`py-3 rounded-lg border-2 w-5/12  disabled:opacity-50 transition-all 
                  disabled:cursor-not-allowed text-white border-blue-500 bg-blue-800`}
              >
                {isLoading ? "Подождите" : "Добавить"}
              </button>
              <button
                className="py-3 rounded-lg bg-red-800 border-2 w-5/12 border-red-500 text-white"
                onClick={() => {
                  setModalOpen(false), resetForm();
                }}
              >
                Отмена
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default AddModal;
