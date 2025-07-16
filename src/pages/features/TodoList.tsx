// 引入 React 相关钩子函数
import React, { useReducer, useState, useEffect } from 'react';
import CodeBlock from '@/components/CodeBlock';
const code = `
// 引入 React 相关钩子函数
import React, { useReducer, useState, useEffect } from 'react';

// 每条 todo 任务的结构定义：包含编号、标题和是否完成状态
interface TodoItem {
  index: number;
  title: string;
  done: boolean;
}

// 所有支持的操作类型，使用 TypeScript 的联合类型做限制
type Action =
  | { type: 'add'; payload: string } // 添加任务，payload 是任务名
  | { type: 'del'; payload: number } // 删除任务，payload 是任务 id
  | { type: 'toggle'; payload: number } // 切换完成状态
  | { type: 'edit'; payload: { index: number; title: string } } // 编辑任务标题
  | { type: 'load'; payload: TodoItem[] }; // 从 localStorage 加载数据

// 核心 reducer：根据 action 类型返回新的 todoList 状态
function todoReducer(state: TodoItem[], action: Action): TodoItem[] {
  switch (action.type) {
    case 'add':
      return [
        { index: Date.now(), title: action.payload, done: false }, // 用当前时间戳作为唯一 ID
        ...state,
      ];
    case 'del':
      return state.filter((item) => item.index !== action.payload); // 过滤掉指定 ID 的任务
    case 'toggle':
      return state.map((item) =>
        item.index === action.payload ? { ...item, done: !item.done } : item
      ); // 切换 done 状态
    case 'edit':
      return state.map((item) =>
        item.index === action.payload.index
          ? { ...item, title: action.payload.title }
          : item
      ); // 替换标题
    case 'load':
      return action.payload; // 初始化从 localStorage 加载
    default:
      return state;
  }
}

// 组件主入口
export default function TodoList() {
  // 用 useReducer 管理 todo 列表数据
  const [todoList, dispatch] = useReducer(todoReducer, []);

  // 输入框内容
  const [text, setText] = useState('');

  // 筛选条件：'all' / 'done' / 'undone'
  const [filter, setFilter] = useState<'all' | 'done' | 'undone'>('all');

  // 当前正在编辑的任务 ID
  const [editIndex, setEditIndex] = useState<number | null>(null);

  // 编辑输入框内容
  const [editText, setEditText] = useState('');

  // ✅ 页面初始化时执行一次，从 localStorage 加载任务
  useEffect(() => {
    const data = localStorage.getItem('todo_list');
    if (data) {
      dispatch({ type: 'load', payload: JSON.parse(data) });
    }
  }, []);

  // ✅ 每次 todoList 改变时同步保存到 localStorage
  useEffect(() => {
    localStorage.setItem('todo_list', JSON.stringify(todoList));
  }, [todoList]);

  // 添加任务按钮点击事件
  const handleAdd = () => {
    const trimmed = text.trim(); // 去除空格
    if (!trimmed) return; // 空输入不处理
    if (todoList.some((t) => t.title === trimmed)) {
      alert('重复任务！');
      return;
    }
    dispatch({ type: 'add', payload: trimmed }); // 发送添加 action
    setText(''); // 清空输入框
  };

  // 处理保存编辑（失焦或按回车）
  const handleEditSave = (index: number) => {
    const trimmed = editText.trim();
    if (trimmed) {
      dispatch({ type: 'edit', payload: { index, title: trimmed } });
    }
    setEditIndex(null); // 退出编辑状态
    setEditText('');
  };

  // 获取当前筛选后的列表
  const getFilteredList = () => {
    switch (filter) {
      case 'done':
        return todoList.filter((t) => t.done);
      case 'undone':
        return todoList.filter((t) => !t.done);
      default:
        return todoList;
    }
  };

  return (
    <div
      style={{
        maxWidth: 500,
        margin: '0 auto',
        padding: '2rem',
        fontFamily: 'sans-serif',
      }}
    >
      <h2>📋 TodoList</h2>

      {/* 输入框 + 添加按钮 */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="请输入任务"
          style={{ flex: 1, padding: 8, fontSize: 16 }}
        />
        <button
          onClick={handleAdd}
          style={{ padding: '8px 16px', fontSize: 16 }}
        >
          添加
        </button>
      </div>

      {/* 筛选按钮区域 */}
      <div style={{ marginBottom: 16 }}>
        <button onClick={() => setFilter('all')}>全部</button>{' '}
        <button onClick={() => setFilter('undone')}>未完成</button>{' '}
        <button onClick={() => setFilter('done')}>已完成</button>
      </div>

      {/* 渲染列表 */}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {getFilteredList().map((item) => (
          <li
            key={item.index}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.5rem 0',
              borderBottom: '1px solid #eee',
              color: item.done ? '#aaa' : '#000',
              textDecoration: item.done ? 'line-through' : 'none',
            }}
          >
            {/* 如果是编辑状态，显示 input；否则显示文本 */}
            {editIndex === item.index ? (
              <input
                value={editText}
                autoFocus
                onChange={(e) => setEditText(e.target.value)}
                onBlur={() => handleEditSave(item.index)}
                onKeyDown={(e) =>
                  e.key === 'Enter' && handleEditSave(item.index)
                }
                style={{ flex: 1 }}
              />
            ) : (
              <span
                style={{ flex: 1, cursor: 'pointer' }}
                onClick={() =>
                  dispatch({ type: 'toggle', payload: item.index })
                }
              >
                {item.title}
              </span>
            )}

            {/* 编辑按钮 + 删除按钮 */}
            <div style={{ marginLeft: 8 }}>
              <button
                onClick={() => {
                  setEditIndex(item.index); // 设置当前正在编辑的任务
                  setEditText(item.title); // 填入默认值
                }}
              >
                ✏️
              </button>{' '}
              <button
                onClick={() => dispatch({ type: 'del', payload: item.index })}
              >
                ❌
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* 没有任务时提示文案 */}
      {getFilteredList().length === 0 && (
        <p style={{ textAlign: 'center', color: '#999' }}>暂无任务</p>
      )}
    </div>
  );
}
`;
// 每条 todo 任务的结构定义：包含编号、标题和是否完成状态
interface TodoItem {
  index: number;
  title: string;
  done: boolean;
}

// 所有支持的操作类型，使用 TypeScript 的联合类型做限制
type Action =
  | { type: 'add'; payload: string } // 添加任务，payload 是任务名
  | { type: 'del'; payload: number } // 删除任务，payload 是任务 id
  | { type: 'toggle'; payload: number } // 切换完成状态
  | { type: 'edit'; payload: { index: number; title: string } } // 编辑任务标题
  | { type: 'load'; payload: TodoItem[] }; // 从 localStorage 加载数据

// 核心 reducer：根据 action 类型返回新的 todoList 状态
function todoReducer(state: TodoItem[], action: Action): TodoItem[] {
  switch (action.type) {
    case 'add':
      return [
        { index: Date.now(), title: action.payload, done: false }, // 用当前时间戳作为唯一 ID
        ...state,
      ];
    case 'del':
      return state.filter((item) => item.index !== action.payload); // 过滤掉指定 ID 的任务
    case 'toggle':
      return state.map((item) =>
        item.index === action.payload ? { ...item, done: !item.done } : item
      ); // 切换 done 状态
    case 'edit':
      return state.map((item) =>
        item.index === action.payload.index
          ? { ...item, title: action.payload.title }
          : item
      ); // 替换标题
    case 'load':
      return action.payload; // 初始化从 localStorage 加载
    default:
      return state;
  }
}

// 组件主入口
export default function TodoList() {
  // 用 useReducer 管理 todo 列表数据
  const [todoList, dispatch] = useReducer(todoReducer, []);

  // 输入框内容
  const [text, setText] = useState('');

  // 筛选条件：'all' / 'done' / 'undone'
  const [filter, setFilter] = useState<'all' | 'done' | 'undone'>('all');

  // 当前正在编辑的任务 ID
  const [editIndex, setEditIndex] = useState<number | null>(null);

  // 编辑输入框内容
  const [editText, setEditText] = useState('');

  // ✅ 页面初始化时执行一次，从 localStorage 加载任务
  useEffect(() => {
    const data = localStorage.getItem('todo_list');
    if (data) {
      dispatch({ type: 'load', payload: JSON.parse(data) });
    }
  }, []);

  // ✅ 每次 todoList 改变时同步保存到 localStorage
  useEffect(() => {
    localStorage.setItem('todo_list', JSON.stringify(todoList));
  }, [todoList]);

  // 添加任务按钮点击事件
  const handleAdd = () => {
    const trimmed = text.trim(); // 去除空格
    if (!trimmed) return; // 空输入不处理
    if (todoList.some((t) => t.title === trimmed)) {
      alert('重复任务！');
      return;
    }
    dispatch({ type: 'add', payload: trimmed }); // 发送添加 action
    setText(''); // 清空输入框
  };

  // 处理保存编辑（失焦或按回车）
  const handleEditSave = (index: number) => {
    const trimmed = editText.trim();
    if (trimmed) {
      dispatch({ type: 'edit', payload: { index, title: trimmed } });
    }
    setEditIndex(null); // 退出编辑状态
    setEditText('');
  };

  // 获取当前筛选后的列表
  const getFilteredList = () => {
    switch (filter) {
      case 'done':
        return todoList.filter((t) => t.done);
      case 'undone':
        return todoList.filter((t) => !t.done);
      default:
        return todoList;
    }
  };

  return (
    <div>
      <div
        style={{
          maxWidth: 500,
          margin: '0 auto',
          padding: '2rem',
          fontFamily: 'sans-serif',
        }}
      >
        <h2>📋 TodoList</h2>

        {/* 输入框 + 添加按钮 */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="请输入任务"
            style={{ flex: 1, padding: 8, fontSize: 16 }}
          />
          <button
            onClick={handleAdd}
            style={{ padding: '8px 16px', fontSize: 16 }}
          >
            添加
          </button>
        </div>

        {/* 筛选按钮区域 */}
        <div style={{ marginBottom: 16 }}>
          <button onClick={() => setFilter('all')}>全部</button>{' '}
          <button onClick={() => setFilter('undone')}>未完成</button>{' '}
          <button onClick={() => setFilter('done')}>已完成</button>
        </div>

        {/* 渲染列表 */}
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {getFilteredList().map((item) => (
            <li
              key={item.index}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.5rem 0',
                borderBottom: '1px solid #eee',
                color: item.done ? '#aaa' : '#000',
                textDecoration: item.done ? 'line-through' : 'none',
              }}
            >
              {/* 如果是编辑状态，显示 input；否则显示文本 */}
              {editIndex === item.index ? (
                <input
                  value={editText}
                  autoFocus
                  onChange={(e) => setEditText(e.target.value)}
                  onBlur={() => handleEditSave(item.index)}
                  onKeyDown={(e) =>
                    e.key === 'Enter' && handleEditSave(item.index)
                  }
                  style={{ flex: 1 }}
                />
              ) : (
                <span
                  style={{ flex: 1, cursor: 'pointer' }}
                  onClick={() =>
                    dispatch({ type: 'toggle', payload: item.index })
                  }
                >
                  {item.title}
                </span>
              )}

              {/* 编辑按钮 + 删除按钮 */}
              <div style={{ marginLeft: 8 }}>
                <button
                  onClick={() => {
                    setEditIndex(item.index); // 设置当前正在编辑的任务
                    setEditText(item.title); // 填入默认值
                  }}
                >
                  ✏️
                </button>{' '}
                <button
                  onClick={() => dispatch({ type: 'del', payload: item.index })}
                >
                  ❌
                </button>
              </div>
            </li>
          ))}
        </ul>

        {/* 没有任务时提示文案 */}
        {getFilteredList().length === 0 && (
          <p style={{ textAlign: 'center', color: '#999' }}>暂无任务</p>
        )}
      </div>
      <CodeBlock title="当前组件源码" code={code} />
    </div>
  );
}
