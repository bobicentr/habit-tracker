import { useState } from "react";
import { useGetHabitsQuery } from "../../api/apiSlice";
import AddModal from "./AddModal";
import HabitCard from "./HabitCard";
import sevenDays from "../../utils/dateHelper";

const weekDays = sevenDays() 

function HabitList() {
  const [modalOpen, setModalOpen] = useState(false);
  const { data: habitsData, isLoading } = useGetHabitsQuery();
  return (
    <>
      {isLoading ? (
        <h1 className="text-gray-600 text-xl">
          Загрузка, подождите немного...
        </h1>
      ) : (
        <div className="flex flex-col w-full text-center">
          <AddModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
          {habitsData?.length === 0 ? (
            <p className="text-slate-500">
              У тебя пока нет привычек.{" "}
              <span
                onClick={() => setModalOpen(true)}
                className="text-blue-500 cursor-pointer underline decoration-1 decoration-dashed "
              >
                Добавь первую!
              </span>
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
              {habitsData?.map((habit) => (
                <HabitCard key={habit.id} habit={habit} weekDays={weekDays}/>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default HabitList;
