import React, { Children } from 'react'
import {LuCopy,LuCheck,LuCode} from "react-icons/lu"
import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm'
import {Prism as SyntaxHightlighter} from 'react-syntax-highlighter'
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';

const AIResponsePreview = ({content}) => {
    if(!content) return null
  return (
    <div className=''>
        <div className=''>
            <ReactMarkdown
              remarkPlugins={{remarkGfm}}
              components={{
                p({Children}){
                    return <p className=''>{Children}</p>;
                },
                strong({children}){
                    return <strong>{children}</strong>
                },
                em({children}){
                    return <em>{children}</em>
                },
                ul({children}){
                    return <ul className=''>{children}</ul>
                },
                ol({children}){
                    return <ol className=''></ol>
                },
                li({children}){
                    return <li className=''></li>
                },
                blockquote({children}){
                    return <blockquote className=''>{childer}</blockquote>
                },
                h1({children}){
                    return <h1 className=''>{children}</h1>
                },
                h2({children}){
                    return <h2 className=''>{children}</h2>
                },
                h3({children}){
                    return <h3 className=''>{children}</h3>
                },
                h4({children}){
                    return <h4 className=''>{children}</h4>
                },
                a({children,href}){
                    return <a href={href} className=''>{children}</a>
                },
                table({children}){
                    return <table>{children}</table>
                }


              }}
        </div>
     
    </div>
  )
}

export default AIResponsePreview
