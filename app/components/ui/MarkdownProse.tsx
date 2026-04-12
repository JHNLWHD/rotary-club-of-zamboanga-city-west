import { Box } from "@chakra-ui/react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type MarkdownProseProps = {
  content: string;
  className?: string;
};

export function MarkdownProse({ content, className = "" }: MarkdownProseProps) {
  return (
    <Box
      className={`leading-relaxed prose prose-sm prose-slate max-w-none text-slate-800 prose-p:text-slate-800 prose-p:leading-relaxed prose-li:text-slate-800 prose-ul:marker:text-slate-600 prose-strong:text-slate-900 prose-strong:font-semibold prose-ul:my-2 prose-li:my-1.5 [&_a]:text-blue-700 [&_a]:underline ${className}`.trim()}
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </Box>
  );
}
