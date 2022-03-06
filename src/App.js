import React, {useState} from "react";
import "./App.css";
import Form from "./components/Form";
import List from "./components/List";

export default function App() {
  /*state= {
    todoData : [  //배열 안에 객체 삽입
      {
        id: "1",
        title: "공부하기",
        completed: false,
      },
      {
        id: "2",
        title: "청소하기",
        completed: false,
      },
    ],
    value: "",
  };
  */

  //첫번째 인수는 변수 이름, 두번째 이름은 State를 정하는 함수
  const [todoData, setTodoData]=useState([]);
  const [value, setValue]=useState("");

  const handleSubmit=(e)=> {  //입력한 할 일 보이기 , event를 가져오므로 e를 사용
    e.preventDefault();
    //form 안에서 input을 전송할 때 페이지 리로드 되는 걸 막아줌

    //새로운 할 일 데이터
    let newTodo = {
      id: Date.now(),
      title:value,
      completed: false,
    };

      //원래 있던 할 일에 새로운 할 일 더해주기
      setTodoData(prev => [...prev,newTodo]);
      setValue("");
      //...this.state.todoData: 원래 있던 데이터들의 전개를 의미
      // value: "" : 입력창을 다시 비워줌
  };


    return(
      <div className="flex items-center justify-center w-screen h-screen bg-blue-200">
        <div className="w-full p-6 m-4 bg-white rounded shadow-sm lg:w-3/4 lg:max-w-lg"> 
        {/*반응형- lg 사이즈일 때 75% width
          max-wix-width일 때 32rem을 넘지 않음*/} 
            <div className="flex justify-between mb-3">
                <h3>할 일 목록</h3>
            </div>

            <List todoData={todoData} setTodoData={setTodoData}/>
            {/*List.js에서 todoData, setTodoData의 사용을 위해 
              List 컴포넌트에 Props 내려줌*/}

            <Form handleSubmit={handleSubmit} value={value} setValue={setValue}/>
        </div>
      </div>
    );
}
