'use client'

import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize from 'rehype-sanitize'
import remarkGfm from 'remark-gfm'

interface MarkdownContentProps {
  content: string
}

export function MarkdownContent({ content }: MarkdownContentProps) {
  return (
    <div className='prose prose-lg dark:prose-invert max-w-none'>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeSanitize]}
        components={{
          h1: ({ children, ...props }) => (
            <h1 className='mt-8 mb-6 text-4xl font-bold' {...props}>
              {children}
            </h1>
          ),
          h2: ({ children, ...props }) => (
            <h2 className='mt-8 mb-4 text-3xl font-bold' {...props}>
              {children}
            </h2>
          ),
          h3: ({ children, ...props }) => (
            <h3 className='mt-6 mb-3 text-2xl font-semibold' {...props}>
              {children}
            </h3>
          ),
          h4: ({ children, ...props }) => (
            <h4 className='mt-4 mb-2 text-xl font-semibold' {...props}>
              {children}
            </h4>
          ),
          p: ({ children, ...props }) => (
            <p className='mb-4 leading-relaxed' {...props}>
              {children}
            </p>
          ),
          ul: ({ children, ...props }) => (
            <ul className='mb-4 ml-6 list-disc space-y-2' {...props}>
              {children}
            </ul>
          ),
          ol: ({ children, ...props }) => (
            <ol className='mb-4 ml-6 list-decimal space-y-2' {...props}>
              {children}
            </ol>
          ),
          li: ({ children, ...props }) => (
            <li className='leading-relaxed' {...props}>
              {children}
            </li>
          ),
          blockquote: ({ children, ...props }) => (
            <blockquote
              className='border-primary/30 bg-muted/50 my-6 border-l-4 pl-4 italic'
              {...props}
            >
              {children}
            </blockquote>
          ),
          code: ({ children, className, ...props }) => {
            const isInline = !className
            if (isInline) {
              return (
                <code
                  className='bg-muted rounded px-1.5 py-0.5 font-mono text-sm'
                  {...props}
                >
                  {children}
                </code>
              )
            }
            return (
              <code
                className={`bg-muted block overflow-x-auto rounded-lg p-4 font-mono text-sm ${className}`}
                {...props}
              >
                {children}
              </code>
            )
          },
          pre: ({ children, ...props }) => (
            <pre className='my-4 overflow-x-auto' {...props}>
              {children}
            </pre>
          ),
          a: ({ children, ...props }) => (
            <a
              className='text-primary hover:text-primary/80 underline underline-offset-4'
              target='_blank'
              rel='noopener noreferrer'
              {...props}
            >
              {children}
            </a>
          ),
          img: ({ alt, ...props }) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              className='my-6 rounded-lg'
              alt={alt || ''}
              loading='lazy'
              {...props}
            />
          ),
          hr: ({ ...props }) => (
            <hr className='border-border my-8' {...props} />
          ),
          strong: ({ children, ...props }) => (
            <strong className='font-bold' {...props}>
              {children}
            </strong>
          ),
          em: ({ children, ...props }) => (
            <em className='italic' {...props}>
              {children}
            </em>
          ),
          table: ({ children, ...props }) => (
            <div className='my-6 overflow-x-auto'>
              <table
                className='border-border w-full border-collapse border'
                {...props}
              >
                {children}
              </table>
            </div>
          ),
          thead: ({ children, ...props }) => (
            <thead className='bg-muted' {...props}>
              {children}
            </thead>
          ),
          th: ({ children, ...props }) => (
            <th
              className='border-border border px-4 py-2 text-left font-semibold'
              {...props}
            >
              {children}
            </th>
          ),
          td: ({ children, ...props }) => (
            <td className='border-border border px-4 py-2' {...props}>
              {children}
            </td>
          )
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
