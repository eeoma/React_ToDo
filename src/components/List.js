import React from 'react'

const List= React.memo(({
    id,title,completed,todoData,setTodoData,provided,snapshot,
})=>{
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
    });
    setTodoData(newTodoData);  //todoData의 업데이트
};


  return (
    <div key={id} {...provided.draggableProps} ref={provided.innerRef}{...provided.dragHandleProps}
        className={`${snapshot.isDragging ?"bg-gray-400": "bg-gray-100"} flex items-center justify-between w-full px-4 py-1 my-2 text-grey-600 border rounded`}> {/*dragging 할때 색깔 변화줌*/}
        <div className="items-center">   
            <input type="checkbox" 
                onChange={()=>handleCompleteChange(id)}  //체크박스 표시 됐을 때 줄 그어지는 이벤트
                defaultChecked={completed} />
            <span className={completed ? "line-through": undefined }>  {/*completed 일때 line-through 하는 조건부 */}
            {title}
            </span>
        </div>
        <div className="items-center">
            <button className="px-4 py-2 float-right"
            onClick={()=>handleClick(id)}>x</button>
        </div>
    </div>
        );
});

export default List