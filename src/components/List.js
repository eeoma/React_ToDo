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

    const handleEnd=(result)=> {
      //result 매개변수에는 source 항목 및 대상 위치와 같은 드래그 이벤트에 대한 정보가 포함
      if(!result.destination) return;
      // 목적지가 없으면 (이벤트 취소) 이 함수를 종료한다.
      const newTodoData=todoData;

      //1. 변경시키는 아이템을 배열에서 지워준다.
      //2. reorderedItem 안에 지워진 아이템을 잡아준다.
      const [reorderedItem]=newTodoData.splice(result.source.index,1);

      //원하는 자리에 reorderedItem을 insert 해준다.
      newTodoData.splice(result.destination.index,0,reorderedItem);
      setTodoData(newTodoData);
    }


  return (
    <div>
      <DragDropContext onDragEnd={handleEnd}>
        <Droppable droppableId="todo">
        {(provided)=>(
        <div {...provided.droppableProps} ref={provided.innerRef}>  {/* droppable를 사용해서 필요한 정보들 */}
        {todoData.map((data,index)=> (   //react에서 list의 나열 시 key값을 사용함
          <Draggable
            key={data.id}  //map 속성 안에 있으므로 key 값을 가지고 있어야함
            draggableId={data.id.toString()}  //string값으로 바꿔줌
            index={index}
          >
            {(provided,snapshot) => (
          <div key={data.id} {...provided.draggableProps} ref={provided.innerRef}{...provided.dragHandleProps}
              className={`${snapshot.isDragging ?"bg-gray-400": "bg-gray-100"} flex items-center justify-between w-full px-4 py-1 my-2 text-grey-600 border rounded`}> {/*dragging 할때 색깔 변화줌*/}
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
            )}
          </Draggable>
        ))}
        {provided.placeholder}  
        {/* placeholder 속성은 목록에 빈 공간을 만듬, 이렇게 하면 드래그 작업이 자연스럽게 느껴짐 */}
        </div>
        )}
        </Droppable>
      </DragDropContext>
    </div>
  )
}
