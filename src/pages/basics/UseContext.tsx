import React, { createContext, useContext, useState } from 'react';
import CodeBlock from '@/components/CodeBlock';
const code = ` import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
/**
 * 1️⃣ 创建上下文类型：包含当前主题和切换主题的函数
 */
interface ThemeContextType {
  theme: 'light' | 'dark'; // 当前主题：light 或 dark
  toggleTheme: () => void; // 切换主题函数
}

/**
 * 2️⃣ 创建 Context 实例，并提供默认值（只作为结构占位）
 */
const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme: () => {},
});

/**
 * 3️⃣ 自定义 Hook，简化子组件使用上下文的方式
 */
const useTheme = () => useContext(ThemeContext);

/**
 * 4️⃣ 给 Provider 添加 props 类型 —— 接收 children（JSX 子元素）
 */
interface ThemeProviderProps {
  children: ReactNode; // 表示可以传入任意 JSX，例如 <div>xxx</div>
}

/**
 * 5️⃣ 创建 ThemeProvider 组件，用于包裹整个页面或组件树
 *    并向下提供 theme 和 toggleTheme
 */
const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // 向下提供 context 值，包裹页面内容并设置背景样式
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div
        style={{
          background: theme === 'light' ? '#fff' : '#222',
          color: theme === 'light' ? '#000' : '#fff',
          minHeight: '100vh',
          padding: '2rem',
        }}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

/**
 * 6️⃣ 子组件：展示当前主题
 */
const ThemeStatus = () => {
  const { theme } = useTheme();
  return <p>当前主题：{theme === 'light' ? '🌞 浅色' : '🌙 深色'}</p>;
};

/**
 * 7️⃣ 子组件：按钮切换主题
 */
const ThemeToggleButton = () => {
  const { toggleTheme } = useTheme();
  return <button onClick={toggleTheme}>切换主题</button>;
};

/**
 * 8️⃣ 页面组件：用 Provider 包裹所有内容
 */
export default function UseContextWithTypesDemo() {
  return (
    <ThemeProvider>
      <h2>useContext + 类型注解 + 全注释 示例</h2>
      <ThemeStatus />
      <ThemeToggleButton />
    </ThemeProvider>
  );
}
  `;
import type { ReactNode } from 'react';
/**
 * 1️⃣ 创建上下文类型：包含当前主题和切换主题的函数
 */
interface ThemeContextType {
  theme: 'light' | 'dark'; // 当前主题：light 或 dark
  toggleTheme: () => void; // 切换主题函数
}

/**
 * 2️⃣ 创建 Context 实例，并提供默认值（只作为结构占位）
 */
const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme: () => {},
});

/**
 * 3️⃣ 自定义 Hook，简化子组件使用上下文的方式
 */
const useTheme = () => useContext(ThemeContext);

/**
 * 4️⃣ 给 Provider 添加 props 类型 —— 接收 children（JSX 子元素）
 */
interface ThemeProviderProps {
  children: ReactNode; // 表示可以传入任意 JSX，例如 <div>xxx</div>
}

/**
 * 5️⃣ 创建 ThemeProvider 组件，用于包裹整个页面或组件树
 *    并向下提供 theme 和 toggleTheme
 */
const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // 向下提供 context 值，包裹页面内容并设置背景样式
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div
        style={{
          background: theme === 'light' ? '#fff' : '#222',
          color: theme === 'light' ? '#000' : '#fff',
          minHeight: '100vh',
          padding: '2rem',
        }}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

/**
 * 6️⃣ 子组件：展示当前主题
 */
const ThemeStatus = () => {
  const { theme } = useTheme();
  return <p>当前主题：{theme === 'light' ? '🌞 浅色' : '🌙 深色'}</p>;
};

/**
 * 7️⃣ 子组件：按钮切换主题
 */
const ThemeToggleButton = () => {
  const { toggleTheme } = useTheme();
  return <button onClick={toggleTheme}>切换主题</button>;
};

/**
 * 8️⃣ 页面组件：用 Provider 包裹所有内容
 */
export default function UseContextWithTypesDemo() {
  return (
    <ThemeProvider>
      <h2>useContext 示例</h2>
      <ThemeStatus />
      <ThemeToggleButton />
      <CodeBlock title="当前组件源码" code={code} />
    </ThemeProvider>
  );
}
