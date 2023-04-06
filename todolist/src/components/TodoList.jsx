import { useState } from "react";
import './todoMain.css';

// id 시작 변수
let globalId = 4;

const TodoMain = (props) => {
    {/** const */}
    // Todo 받아올 공간
    const [todoList, setTodoList] = useState(
        [
            {id: 1, today: new Date().getMonth()+1+"월 "+new Date().getDate()+"일", todo: "예시입니다", checked: false, onToday: true},
            {id: 2, today: new Date().getMonth()+1+"월 "+new Date().getDate()+"일", todo: "두번째 할일", checked: false, onToday: true},
            {id: 3, today: new Date().getMonth()+"월 "+new Date().getDate()+"일", todo: "세번째 할일", checked: false, onToday: false}
        ]
    );

    // 추가 todo 받아올 공간
    const [inputTodo, setInputTodo] = useState("");
    // 오늘 리스트 받아올 공간
    const [todayNewList, setTodayNewList] = useState("");

    {/** 메소드 공간 */}
    // input text에서 TO DO 이름 받아오는 메소드
    // input text - onChange
    const inputChange = (e) => {setInputTodo(e.target.value)}
    // input text 저장 공간
    // button 누르면 입력 받은 todo 출력
    const addTodo = () => {
        const newTodo = todoList.concat (
            {   
                id : globalId++,
                today: new Date().getMonth()+"월 "+new Date().getDate()+"일",
                todo: inputTodo,
                checked: false,
                onToday: true
            }
        );
        setTodoList(newTodo);
    }
    // button 누르면 해당 li 삭제 >> filter
    const deleteList = (id) => {
        const newList = todoList.filter(
            (n) => n.id !== id
        );
        setTodoList(newList);
    }
    // 모든 할일 - 오늘 할일 구분해서 보여주기
    // 오늘 할일 목록 >> true
    // 모든 할일 -> 전체
    const showAll = () => {

    }
    // 오늘 할일 -> onToday : false일 때 class notShowList
    // const showToday = (todo) => {
    //     const todayList = todoList.filter(
    //         () => todo.show)
    //         setTodoList({todoList : todayList});

    // }
    // 오늘 할일인지 확인 메소드
    const trueFalseToday = () => {
        todoList.map(()=>{
            const checkToday = () => {
                if (todoList.today == new Date().getMonth()+1+"월 "+new Date().getDate()+"일") {
                    return {onToday : true}
                }
                else {
                    return {onToday : false}
                }
            }
            setTodoList(checkToday);
        })
    }

    return(
    <div className="mainDiv">
        <h1>To Do List</h1>
        <div className="inputTodo">
            <input type="text"
                // 할일 입력 받아옴
                onChange={inputChange}
                placeholder="Todo를 입력하세요."
            />
            <button
                // 클릭 시 li에 할일 추가
                onClick={addTodo}
            >+
            </button>
        </div>
        <hr />
        <div className="showTodo">
            <button
                //
            >모든 할일</button>
            <button 
                onClick={trueFalseToday}
            >오늘 할일</button>
        </div>
        <ul className="todoList">
            {
                // map으로 불러와 li 생성
                todoList.map((todo)=>
                <li key={todo.id}
                    className={todo.today == new Date().getMonth()+1+"월 "+new Date().getDate()+"일"
                    ? "" : "notShowList"}
                >
                    <p
                        className={todo.checked ? "on" : ""}
                    >{todo.today}</p>
                    <input type="checkbox"
                    // check 시 color 변경, 취소선 >> class "on"으로
                    // map으로 불러와 checked 상태 바꾸기 
                        checked={todo.checked} readOnly
                        onClick={()=> {
                            const onOffCheck = todoList.map((c)=>{
                                if (todo.id !== c.id) {
                                    return c;
                                }
                                else {
                                    return {...c, checked: !c.checked}
                                }
                            });
                            setTodoList(onOffCheck);
                        }}
                    />
                    <span
                        className={todo.checked ? "on" : ""}
                    >{todo.todo}</span>
                    <button
                    // onClick 시 해당 li 삭제 버튼
                        onClick={()=>deleteList(todo.id)}
                    >X</button>
                </li>)
            }
        </ul>
    </div>
    );
} 

export default TodoMain