import React from 'react';

export default function Form({handleSubmit,value,setValue}) {
    //handleSubmit는 함수 뿐만아니라 다른 state도 안에 있기 때문에 app.js안에서 처리해주는 것이 좋다
  
    const handleChange=(e)=> {  //입력한 할 일의 저장, event를 가져오므로 e를 사용
        setValue(e.target.value);
      };

  return (
        <form onSubmit={handleSubmit} className="flex pt-3">  {/* 입력을 위한 input, 버튼을 위한 input */}
              <input 
              type="text" 
              name="value" 
              className="w-full px-3 py-2 mr-4 text-grey-500 border rounded shadow focus:border-none"
              autoComplete="off"  //검색 기록 저장 안되게
              placeholder="할 일을 입력하세요." 
              value={value} 
              onChange={handleChange}
              /> 
              <input 
              className="p-2 text-blue-500 border-2 border-blue-400 rounded hover:text-white hover:bg-blue-400 hover:shadow-lg cursor-pointer"
              type="submit" 
              value="입력"
              />
            </form>
  );
}
