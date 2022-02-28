import React, {Component} from "react";
import "./App.css";

export default class App extends Component {
  state= {
    todoData : [  //배열 안에 객체 삽입
      {
        id: "1",
        title: "공부하기",
        completed: true,
      },
      {
        id: "2",
        title: "청소하기",
        completed: false,
      },
    ],
    value: "",
  };

  btnStyle= {  //클래스형
    color:"#fff",
    background:"#42afed",
    border: "none",
    padding: "5px 9px",
    borderRadius: "10px",
    cursor: "pointer",
    float: "right"
  }

  getStyle=()=> {  //목록들 밑에 생기는 점선
    return {
      padding: "10px",
      borderBottom: "1px #ccc dotted",
      textDecoration: "none",

    }
  }

  handleClick=(id)=> {   //state를 이용한 목록 삭제
    let newTodoData=this.state.todoData.filter((data)=> data.id!==id);  //삭제하지 않는 목록들만 남기는 것
    this.setState({todoData:newTodoData});
    //todoData를 newTodoData로 업데이트 하는 것
    
  };

  handleChange=(e)=> {  //입력한 할 일의 저장, event를 가져오므로 e를 사용
    this.setState({value: e.target.value});
  }

  handleSubmit=(e)=> {  //입력한 할 일 보이기 , event를 가져오므로 e를 사용
      e.preventDefault();
      //form 안에서 input을 전송할 때 페이지 리로드 되는 걸 막아줌

      //새로운 할 일 데이터
      let newTodo = {
        id: Date.now(),
        title: this.state.value,
        completed: false,
      };
      //원래 있던 할 일에 새로운 할 일 더해주기
      this.setState({todoData: [...this.state.todoData,newTodo] });
      //...this.state.todoData: 원래 있던 데이터들의 전개를 의미
  };

  render(){
    return(
      <div className="container">
        <div className="todoBlock">
            <div className="title">
                <h3>할 일 목록</h3>
            </div>
            {this.state.todoData.map((data)=> (   //react에서 list의 나열 시 key값을 사용함
                <div style={this.getStyle()} key={data.id}> 
                <p>    
                <input type="checkbox" defaultChecked={false} />
                {data.title}
                <button style={this.btnStyle} onClick={()=>this.handleClick(data.id)}>x</button>
                </p>
              </div>
            ))}
            <form style={{display:'flex'}} onSubmit={this.handleSubmit}>  {/* 입력을 위한 input, 버튼을 위한 input */}
              <input 
              type="text" 
              name="value" 
              autoComplete="off"  //검색 기록 저장 안되게
              style={{flex: '10',padding: '5px'}}
              placeholder="할 일을 입력하세요." 
              value={this.state.value}  //state 안에 있는 value가 됨
              onChange={this.handleChange}
              /> 
              <input 
              type="submit" 
              value="입력" 
              className="btn"
              style={{flex : '1'}} />
            </form>
        </div>
      </div>
    )
  }
}
