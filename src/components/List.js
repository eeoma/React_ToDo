import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Droppable } from 'react-beautiful-dnd';
import { DragDropContext } from 'react-beautiful-dnd';

export default function List({todoData,setTodoData}) {  //props로 필요한 데이터 함수 가져오기

    const handleClick=(id)=> {   //state를 이용한 목록 삭제
        let newTodoData=todoData.filter((data)=> data.id!==id);  //삭제하지 않는 목록들만 남기는 것
        setTodoData(newTodoData);
        //todoData를 newTodoData로 업데이트 하는 것
        
    };

    const handleCompleteChange=(id)=> {  //완료한 일 밑줄 그어지기
        let newTodoData=todoData.map(data=> {
            if(data.id===id){
            data.completed = !data.completed;  //completed 값을 false에서 true로 바꿔주는 것
            }
            return data;
        })
        setTodoData(newTodoData);  //todoData의 업데이트
    };


  return (
    <div>
      <DragDropContext>
        <Droppable droppableId="todo">
        {provided=>(
        <div {...provided.droppableProps} ref={provided.innerRef}>
        {todoData.map((data,index)=> (   //react에서 list의 나열 시 key값을 사용함
          <Draggable
            key={data.id}  //map 속성 안에 있으므로 key 값을 가지고 있어야함
            draggableId={data.id.toString()}
            index={index}
          >
            {(provided,snapshot) => (
          <div key={data.id} {...provided.draggableProps} ref={provided.innerRef}{...provided.dragHandleProps}> 
            <div className="flex items-center justify-between w-full px-4 py-1 my-2 text-grey-600 bg-gray-100 border rounded"> 
              <div className="items-center">   
              <input type="checkbox" 
                onChange={()=>handleCompleteChange(data.id)}  //체크박스 표시 됐을 때 줄 그어지는 이벤트
                defaultChecked={data.completed} />
               <span className={data.completed ? "line-through": undefined }>  {/*completed 일때 line-through 하는 조건부 */}
                 {data.title}
              </span>
              </div>
              <div className="items-center">
              <button className="px-4 py-2 float-right"
               onClick={()=>handleClick(data.id)}>x</button>
              </div>
            </div>
          </div>
            )}
          </Draggable>
        ))}
        {provided.placeholder}
        </div>
        )}
        </Droppable>
      </DragDropContext>
    </div>
  )
}
