import { Todo, TodoState } from "../../types/types";

// 초기 상태 정의
const initialState: TodoState = {
  list: [],
  nextID: 1, // ✅ 기본값 1로 설정하여 오류 방지
};

// 액션 타입 상수
const CREATE = "todo/CREATE" as const;
const DONE = "todo/DONE" as const;
const INIT = "todo/INIT" as const;
const DELETE = "todo/DELETE" as const;
const EDIT = "todo/EDIT" as const;

// 액션 생성자 함수
export function create(payload: { id?: number; text: string }) {
  return {
    type: CREATE,
    payload, // { id: number, text: string }
  };
}

export function done(id: number) {
  return {
    type: DONE,
    id, // id: number
  };
}

export function init(data: Todo[]) {
  return {
    type: INIT,
    data, // { id, text, done }[]
  };
}

export function del(id: number) {
  return {
    type: DELETE,
    id, // id: number
  };
}

export function edit(payload: { id: number; text: string }) {
  return {
    type: EDIT,
    payload,
  };
}
// 액션 타입 인터페이스
interface Init {
  type: typeof INIT;
  data: Todo[];
}

interface Done {
  type: typeof DONE;
  id: number;
}

interface Create {
  type: typeof CREATE;
  payload: { id: number; text: string };
}

interface Delete {
  type: typeof DELETE;
  id: number;
}
interface Edit {
  type: typeof EDIT;
  payload: { id: number; text: string };
}

type Action = Create | Done | Init | Delete | Edit;

// ✅ Redux Reducer
export function todoReducer(state: TodoState = initialState, action: Action) {
  switch (action.type) {
    case INIT:
      return {
        ...state,
        list: action.data,
        nextID:
          action.data.length === 0
            ? 1
            : action.data[action.data.length - 1].id + 1,
      };

    case CREATE:
      if (action.payload.text.trim() === "") return state;
      console.log("CREATE 호출됨", action);
      return {
        ...state,
        list: [
          ...state.list,
          { id: action.payload.id, text: action.payload.text, done: false },
        ],
        nextID: action.payload.id + 1, // ✅ 자동 증가
      };

    case DONE:
      console.log("DONE 호출됨", action);
      return {
        ...state,
        list: state.list.map((todo) =>
          todo.id === action.id ? { ...todo, done: true } : todo
        ),
      };

    case DELETE: // ✅ DELETE 기능 추가
      console.log("DELETE 호출됨", action);
      return {
        ...state,
        list: state.list.filter((todo: Todo) => todo.id !== action.id),
      };

    case EDIT:
      return {
        ...state,
        list: state.list.map((todo) =>
          todo.id === action.payload.id
            ? { ...todo, text: action.payload.text } // ✅ 수정된 데이터 반영
            : todo
        ),
      };

    default:
      return state;
  }
}
