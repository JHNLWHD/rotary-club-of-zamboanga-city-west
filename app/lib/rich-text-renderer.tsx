import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import type { Document } from '@contentful/rich-text-types';

// Rich text renderer options
const richTextOptions = {
  renderNode: {
    // Custom renderer for hyperlinks
    'hyperlink': (node: any, children: any) => {
      const { data } = node;
      const { uri } = data;
      return `<a href="${uri}" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-800 underline">${children}</a>`;
    },
    // Custom renderer for paragraphs
    'paragraph': (node: any, children: any) => {
      return `<p class="mb-4 leading-relaxed">${children}</p>`;
    },
    // Custom renderer for headings
    'heading-1': (node: any, children: any) => {
      return `<h1 class="text-3xl font-bold mb-6 text-gray-900">${children}</h1>`;
    },
    'heading-2': (node: any, children: any) => {
      return `<h2 class="text-2xl font-semibold mb-4 text-gray-900">${children}</h2>`;
    },
    'heading-3': (node: any, children: any) => {
      return `<h3 class="text-xl font-semibold mb-3 text-gray-900">${children}</h3>`;
    },
    'heading-4': (node: any, children: any) => {
      return `<h4 class="text-lg font-semibold mb-2 text-gray-900">${children}</h4>`;
    },
    'heading-5': (node: any, children: any) => {
      return `<h5 class="text-base font-semibold mb-2 text-gray-900">${children}</h5>`;
    },
    'heading-6': (node: any, children: any) => {
      return `<h6 class="text-sm font-semibold mb-2 text-gray-900">${children}</h6>`;
    },
    // Custom renderer for lists
    'unordered-list': (node: any, children: any) => {
      return `<ul class="list-disc list-inside mb-4 space-y-2">${children}</ul>`;
    },
    'ordered-list': (node: any, children: any) => {
      return `<ol class="list-decimal list-inside mb-4 space-y-2">${children}</ol>`;
    },
    'list-item': (node: any, children: any) => {
      return `<li class="text-gray-700">${children}</li>`;
    },
    // Custom renderer for blockquotes
    'blockquote': (node: any, children: any) => {
      return `<blockquote class="border-l-4 border-blue-500 pl-4 italic text-gray-600 mb-4">${children}</blockquote>`;
    },
    // Custom renderer for code blocks
    'code': (node: any, children: any) => {
      return `<code class="bg-gray-100 px-2 py-1 rounded text-sm font-mono">${children}</code>`;
    },
    // Custom renderer for bold text
    'bold': (node: any, children: any) => {
      return `<strong class="font-semibold">${children}</strong>`;
    },
    // Custom renderer for italic text
    'italic': (node: any, children: any) => {
      return `<em class="italic">${children}</em>`;
    },
    // Custom renderer for underlined text
    'underline': (node: any, children: any) => {
      return `<u class="underline">${children}</u>`;
    },
  },
};

/**
 * Renders Contentful Rich Text content to HTML string
 * @param document - The rich text document from Contentful
 * @returns HTML string
 */
export function renderRichText(document: Document): string {
  if (!document) return '';
  
  try {
    return documentToHtmlString(document, richTextOptions);
  } catch (error) {
    console.error('Error rendering rich text:', error);
    return '';
  }
}

/**
 * Renders Contentful Rich Text content to HTML string with custom options
 * @param document - The rich text document from Contentful
 * @param customOptions - Custom renderer options
 * @returns HTML string
 */
export function renderRichTextWithOptions(
  document: Document,
  customOptions: any
): string {
  if (!document) return '';
  
  try {
    const mergedOptions = {
      ...richTextOptions,
      renderNode: {
        ...richTextOptions.renderNode,
        ...customOptions.renderNode,
      },
    };
    
    return documentToHtmlString(document, mergedOptions);
  } catch (error) {
    console.error('Error rendering rich text with custom options:', error);
    return '';
  }
}

/**
 * Creates a React component that renders rich text content
 * @param document - The rich text document from Contentful
 * @param className - Additional CSS classes
 * @returns JSX element
 */
export function RichTextRenderer({ 
  document, 
  className = '' 
}: { 
  document: Document; 
  className?: string; 
}) {
  const htmlContent = renderRichText(document);
  
  return (
    <div 
      className={`prose prose-gray max-w-none ${className}`}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
}

/**
 * Truncates rich text content to a specified length
 * @param document - The rich text document from Contentful
 * @param maxLength - Maximum length in characters
 * @returns Truncated HTML string
 */
export function renderTruncatedRichText(
  document: Document,
  maxLength: number = 200
): string {
  if (!document) return '';
  
  try {
    const htmlContent = documentToHtmlString(document, richTextOptions);
    
    // Remove HTML tags for length calculation
    const textContent = htmlContent.replace(/<[^>]*>/g, '');
    
    if (textContent.length <= maxLength) {
      return htmlContent;
    }
    
    // Truncate and add ellipsis
    const truncatedText = textContent.substring(0, maxLength) + '...';
    return `<p class="mb-4 leading-relaxed">${truncatedText}</p>`;
  } catch (error) {
    console.error('Error rendering truncated rich text:', error);
    return '';
  }
} 