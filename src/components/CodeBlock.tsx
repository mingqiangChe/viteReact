//展示预览
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import oneDark from 'react-syntax-highlighter/dist/esm/styles/prism/one-dark';

interface CodeBlockProps {
  code: string;
  language?: string; // 默认 tsx
  title?: string;
}

export default function CodeBlock({
  code,
  language = 'tsx',
  title,
}: CodeBlockProps) {
  return (
    <div className="my-4 rounded-xl bg-[#1e1e1e] p-4 text-sm text-white shadow-lg">
      {title && <div className="mb-2 text-base font-bold">{title}</div>}
      <SyntaxHighlighter language={language} style={oneDark} showLineNumbers>
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
