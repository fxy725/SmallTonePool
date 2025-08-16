import { MDXProvider } from '@mdx-js/react';
import { ComponentProps } from 'react';

const components = {
    h1: ({ children }: ComponentProps<'h1'>) => (
        <h1 className="text-3xl font-bold mt-8 mb-4 text-gray-900 dark:text-white text-hero">
            {children}
        </h1>
    ),
    h2: ({ children }: ComponentProps<'h2'>) => (
        <h2 className="text-2xl font-semibold mt-6 mb-3 text-gray-900 dark:text-white text-hero">
            {children}
        </h2>
    ),
    h3: ({ children }: ComponentProps<'h3'>) => (
        <h3 className="text-xl font-semibold mt-5 mb-2 text-gray-900 dark:text-white text-hero">
            {children}
        </h3>
    ),
    p: ({ children }: ComponentProps<'p'>) => (
        <p className="text-base leading-relaxed mb-4 text-gray-700 dark:text-gray-300 text-content">
            {children}
        </p>
    ),
    ul: ({ children }: ComponentProps<'ul'>) => (
        <ul className="list-disc list-inside mb-4 space-y-2 text-gray-700 dark:text-gray-300 text-content">
            {children}
        </ul>
    ),
    ol: ({ children }: ComponentProps<'ol'>) => (
        <ol className="list-decimal list-inside mb-4 space-y-2 text-gray-700 dark:text-gray-300 text-content">
            {children}
        </ol>
    ),
    li: ({ children }: ComponentProps<'li'>) => (
        <li className="pl-2 text-content">{children}</li>
    ),
    blockquote: ({ children }: ComponentProps<'blockquote'>) => (
        <blockquote className="border-l-4 border-blue-500 pl-4 py-2 mb-4 italic text-gray-600 dark:text-gray-400 bg-blue-50 dark:bg-blue-900/20 text-content">
            {children}
        </blockquote>
    ),
    code: ({ children, className }: ComponentProps<'code'>) => {
        const isInline = !className?.includes('language-');

        if (isInline) {
            return (
                <code className="bg-gray-100 dark:bg-gray-800 text-blue-600 dark:text-blue-400 px-1.5 py-0.5 rounded text-sm text-code">
                    {children}
                </code>
            );
        }

        return (
            <code className="block bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-4 rounded-lg overflow-x-auto text-sm text-code border border-gray-200 dark:border-gray-700">
                {children}
            </code>
        );
    },
    pre: ({ children }: ComponentProps<'pre'>) => (
        <pre className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto mb-4 border border-gray-200 dark:border-gray-700 text-content">
            {children}
        </pre>
    ),
    a: ({ href, children }: ComponentProps<'a'>) => (
        <a
            href={href}
            className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline"
            target="_blank"
            rel="noopener noreferrer"
        >
            {children}
        </a>
    ),
    strong: ({ children }: ComponentProps<'strong'>) => (
        <strong className="font-semibold text-gray-900 dark:text-white text-content">
            {children}
        </strong>
    ),
    em: ({ children }: ComponentProps<'em'>) => (
        <em className="italic text-gray-700 dark:text-gray-300 text-content">
            {children}
        </em>
    ),
    table: ({ children }: ComponentProps<'table'>) => (
        <div className="overflow-x-auto mb-4 text-content">
            <table className="min-w-full border border-gray-300 dark:border-gray-600">
                {children}
            </table>
        </div>
    ),
    th: ({ children }: ComponentProps<'th'>) => (
        <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 bg-gray-100 dark:bg-gray-800 font-semibold text-left text-content">
            {children}
        </th>
    ),
    td: ({ children }: ComponentProps<'td'>) => (
        <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-content">
            {children}
        </td>
    ),
};

export function MDXRenderer({ children }: { children: React.ReactNode }) {
    return (
        <MDXProvider components={components}>
            <div className="prose prose-lg dark:prose-invert max-w-none">
                {children}
            </div>
        </MDXProvider>
    );
}
