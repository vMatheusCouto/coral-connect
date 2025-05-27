'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TextAlign from '@tiptap/extension-text-align'
import Heading from '@tiptap/extension-heading'
import Highlight from '@tiptap/extension-highlight'
import Image from '@tiptap/extension-image'
import BulletList from '@tiptap/extension-bullet-list'
import OrderedList from '@tiptap/extension-ordered-list'
import Paragraph from '@tiptap/extension-paragraph'
import ImageResize from 'tiptap-extension-resize-image'
import ToolBar from './toolbar'

  const CustomStarterKit = StarterKit.extend({
    HardBreak: {
        keepMarks: false,
        keepAttributes: false,
    },
    addKeyboardShortcuts() {
      return {
        'Enter': () => this.editor.commands.setHardBreak(),
      }
    },
  })


interface TextEditorProps {
  content: string;
  onChange: (value: string) => void;
}

export default function TextEditor({ content, onChange }: TextEditorProps) {
    const editor = useEditor({
        extensions: [
            CustomStarterKit.configure(),
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            Heading.configure({
                levels: [1, 2, 3],
            }),
            OrderedList.configure({
                HTMLAttributes: {
                    class: 'list-decimal ml-3',
                },
            }),
            BulletList.configure({
                HTMLAttributes: {
                    class: 'list-disc ml-3',
                },
            }),
            Highlight.configure({
                HTMLAttributes: {
                    class: 'bg-primary',
                },
            }),
            Image,
            ImageResize,
            Paragraph
        ],
        content,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML())
        },
        editorProps: {
            attributes: {
                class: 'min-h-[156px] max-h-[536px] w-3xl border rounded-md bg-card/10 hover:rounded-t z-10 p-6 focus:outline-1 overflow-y-scroll',
            },
        },
    })

    return (
        <div className='flex flex-col'>
            <ToolBar editor={editor}/>
            <EditorContent editor={editor}/>
        </div>
    )
}