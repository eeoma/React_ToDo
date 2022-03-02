import React, {useState} from "react";
import "./App.css";

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

  const btnStyle= {  //클래스형
    color:"#fff",
    background:"#42afed",
    border: "none",
    padding: "5px 9px",
    borderRadius: "10px",
    cursor: "pointer",
    float: "right"
  }

  const getStyle=(completed)=> {  //목록들 밑에 생기는 점선
    return {
      padding: "10px",
      borderBottom: "1px #ccc dotted",
      textDecoration: completed ? "line-through": "none",  //삼항 연산자의 이용

    };
  }

  const handleClick=(id)=> {   //state를 이용한 목록 삭제
    let newTodoData=todoData.filter((data)=> data.id!==id);  //삭제하지 않는 목록들만 남기는 것
    setTodoData(newTodoData);
    //todoData를 newTodoData로 업데이트 하는 것
    
  };

  const handleChange=(e)=> {  //입력한 할 일의 저장, event를 가져오므로 e를 사용
    setValue(e.target.value);
  }

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

  const handleCompleteChange=(id)=> {  //완료한 일 밑줄 그어지기
    let newTodoData=todoData.map(data=> {
      if(data.id===id){
        data.completed = !data.completed;  //completed 값을 false에서 true로 바꿔주는 것
      }
      return data;
    })
    setTodoData(newTodoData);
  }


    return(
      <div className="container">
        <div className="todoBlock">
            <div className="title">
                <h3>할 일 목록</h3>
            </div>
            {todoData.map((data)=> (   //react에서 list의 나열 시 key값을 사용함
                <div style={getStyle(data.completed)} key={data.id}> 
                <p>    
                <input type="checkbox" 
                onChange={()=>handleCompleteChange(data.id)}  //체크박스 표시 됐을 때 줄 그어지는 이벤트
                defaultChecked={false} />
                {data.title}
                <button style={btnStyle} onClick={()=>handleClick(data.id)}>x</button>
                </p>
              </div>
            ))}
            <form style={{display:'flex'}} onSubmit={handleSubmit}>  {/* 입력을 위한 input, 버튼을 위한 input */}
              <input 
              type="text" 
              name="value" 
              autoComplete="off"  //검색 기록 저장 안되게
              style={{flex: '10',padding: '5px'}}
              placeholder="할 일을 입력하세요." 
              value={value} 
              onChange={handleChange}
              /> 
              <input 
              type="submit" 
              value="입력" 
              className="btn"
              style={{flex : '1'}} />
            </form>
        </div>
      </div>
    );
}
