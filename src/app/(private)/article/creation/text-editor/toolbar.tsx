'use client'

import { 
  Heading1, Heading2, Heading3, 
  Bold, Italic, Strikethrough, 
  AlignLeft, AlignCenter, AlignRight, AlignJustify,
  List, ListOrdered, Code, Highlighter
} from "lucide-react"
import { Toggle } from "@/components/ui/toggle"
import { type Editor } from '@tiptap/react'

interface ToolBarProps {
  editor: Editor | null
}

interface ToolbarOption {
  icon: React.ReactNode
  onClick: () => void
  pressed: boolean
}

export default function ToolBar({ editor }: ToolBarProps) {
  if (!editor) {
    return null
  }

  const Options: ToolbarOption[] = [
    {
      icon: <Heading1 className="size-4" />,
      onClick: () => {
        editor.chain().focus().toggleHeading({ level: 1 }).run()
      },
      pressed: editor.isActive('heading', { level: 1 }),
    },
    {
      icon: <Heading2 className="size-4" />,
      onClick: () => {
        editor.chain().focus().toggleHeading({ level: 2 }).run()
      },
      pressed: editor.isActive('heading', { level: 2 }),
    },
    {
      icon: <Heading3 className="size-4" />,
      onClick: () => {
        editor.chain().focus().toggleHeading({ level: 3 }).run()
      },
      pressed: editor.isActive('heading', { level: 3 }),
    },
    {
      icon: <Bold className="size-4" />,
      onClick: () => { 
        editor.chain().focus().toggleBold().run() 
      },
      pressed: editor.isActive('bold'),
    },
    {
      icon: <Italic className="size-4" />,
      onClick: () => { 
        editor.chain().focus().toggleItalic().run() 
      },
      pressed: editor.isActive('italic'),
    },
    {
      icon: <Strikethrough className="size-4" />,
      onClick: () => { 
        editor.chain().focus().toggleStrike().run() 
      },
      pressed: editor.isActive('strike'),
    },
    {
      icon: <Code className="size-4" />,
      onClick: () => { 
        editor.chain().focus().toggleCode().run() 
      },
      pressed: editor.isActive('code'),
    },
    {
      icon: <AlignLeft className="size-4" />,
      onClick: () => { 
        editor.chain().focus().setTextAlign('left').run() 
      },
      pressed: editor.isActive({ textAlign: 'left' }),
    },
    {
      icon: <AlignCenter className="size-4" />,
      onClick: () => { 
        editor.chain().focus().setTextAlign('center').run() 
      },
      pressed: editor.isActive({ textAlign: 'center' }),
    },
    {
      icon: <AlignRight className="size-4" />,
      onClick: () => { 
        editor.chain().focus().setTextAlign('right').run() 
      },
      pressed: editor.isActive({ textAlign: 'right' }),
    },
    {
      icon: <AlignJustify className="size-4" />,
      onClick: () => { 
        editor.chain().focus().setTextAlign('justify').run() 
      },
      pressed: editor.isActive({ textAlign: 'justify' }),
    },
    {
      icon: <List className="size-4" />,
      onClick: () => { 
        editor.chain().focus().toggleBulletList().run() 
      },
      pressed: editor.isActive('bulletList'),
    },
    {
      icon: <ListOrdered className="size-4" />,
      onClick: () => { 
        editor.chain().focus().toggleOrderedList().run() 
      },
      pressed: editor.isActive('orderedList'),
    },
    {
      icon: <Highlighter className="size-4" />,
      onClick: () => { 
        editor.chain().focus().toggleHighlight().run() 
      },
      pressed: editor.isActive('highlight'),
    }
  ]

  return (
    <div className="border align-center justify-center rounded-md p-1.5 bg-muted backdrop-blur space-x-1 right-10 flex flex-wrap gap-1 border-b-0">
      {Options.map((option, index) => (
        <Toggle
          key={index}
          size="sm"
          pressed={option.pressed}
          onPressedChange={option.onClick}
          className="data-[state=on]:bg-background/30"
        >
          {option.icon}
        </Toggle>
      ))}
    </div>
  )
}

