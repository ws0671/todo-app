import { useForm } from "react-hook-form";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { toDoState, categoryState, newCategoryState } from "../atoms";

export interface IForm {
  toDo: string;
  category: string;
}

function CreateToDo() {
  const setCategory = useSetRecoilState(newCategoryState);

  const setToDos = useSetRecoilState(toDoState);
  const category = useRecoilValue(categoryState);

  const { register, handleSubmit, setValue } = useForm<IForm>();
  const handleValid = ({ toDo }: IForm) => {
    setToDos((oldToDos) => [
      { text: toDo, id: Date.now(), category },
      ...oldToDos,
    ]);
    setValue("toDo", "");
  };
  const {
    register: cateRegister,
    handleSubmit: cateSubmit,
    setValue: cateSetValue,
  } = useForm<IForm>();

  const handleCateValid = ({ category }: IForm) => {
    setCategory((categories) => [...categories, category]);
    cateSetValue("category", "");
  };

  return (
    <>
      <form onSubmit={cateSubmit(handleCateValid)}>
        <input
          {...cateRegister("category", { required: "Please write a Category" })}
          placeholder="Write a category"
        />
        <button>추가하기</button>
      </form>
      <form onSubmit={handleSubmit(handleValid)}>
        <input
          {...register("toDo", { required: "Please write a To Do" })}
          placeholder="Write a to do"
        />
        <button>Add</button>
      </form>
    </>
  );
}

export default CreateToDo;
