declare module 'react-syntax-highlighter' {
  export * from 'react-syntax-highlighter/dist/esm';
}

declare module 'react-syntax-highlighter/dist/esm' {
  import { ComponentType } from 'react';

  export const Prism: any;
  export const Light: any;
  export const registerLanguage: any;

  const SyntaxHighlighter: ComponentType<any>;
  export default SyntaxHighlighter;
}

declare module 'react-syntax-highlighter/dist/esm/styles/prism' {
  const styles: { [key: string]: any };
  export default styles;
}
declare module 'react-syntax-highlighter/dist/esm/styles/prism/one-dark' {
  const style: any;
  export default style;
}
