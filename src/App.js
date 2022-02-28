import React, {Component} from "react";
import "./App.css";

export default class App extends Component {
  btnStyle= {  //클래스형
    color:"#fff",
    background:"#42afed",
    border: "none",
    padding: "5px 9px",
    borderRadius: "10px",
    cursor: "pointer",
    float: "right"
  }

  getStyle=()=> {  //함수형
    return {
      padding: "10px",
      borderBottom: "1px #ccc dotted",
      textDecoration: "none",

    }
  }

  todoData = [  //배열 안에 객체 삽입
    {
      id: "1",
      title: "공부하기",
      completed: true,
    },
    {
      id: "2",
      title: "청소하기",
      completed: false,
    }
  ];

  handleClick=(id)=> {   //함수 선언

  };

  render(){
    return(
      <div className="container">
        <div className="todoBlock">
            <div className="title">
                <h3>할 일 목록</h3>
            </div>
            {this.todoData.map((data)=> (   //react에서 list의 나열 시 key값을 사용함
                <div style={this.getStyle()} key={data.id}> 
                <p>    
                <input type="checkbox" defaultChecked={false} />
                {data.title}
                <button style={this.btnStyle} onClick={()=>this.handleClick(data.id)}>x</button>
                </p>
              </div>
            ))}
        </div>
      </div>
    )
  }
}
