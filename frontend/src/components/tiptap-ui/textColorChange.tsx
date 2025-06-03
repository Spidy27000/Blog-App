import * as React from "react"
import { isNodeSelection, type Editor } from "@tiptap/react"

// --- Hooks ---
import { useMenuNavigation } from "@/hooks/use-menu-navigation"
import { useTiptapEditor } from "@/hooks/use-tiptap-editor"

// --- Icons ---
import { BanIcon } from "@/components/tiptap-icons/ban-icon"
import { PaletteIcon } from "lucide-react" // Changed from HighlighterIcon

// --- Lib ---
import { isMarkInSchema } from "@/lib/tiptap-utils"

// --- UI Primitives ---
import type { ButtonProps } from "@/components/tiptap-ui-primitive/button"
import { Button } from "@/components/tiptap-ui-primitive/button"
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/tiptap-ui-primitive/popover"
import { Separator } from "@/components/tiptap-ui-primitive/separator"

// --- Styles ---


export interface TextColorPopoverColor {
  label: string
  value: string
  border?: string
}

export interface TextColorPopoverContentProps {
  editor?: Editor | null
  colors?: TextColorPopoverColor[]
  onClose?: () => void
}

export interface TextColorPopoverProps extends Omit<ButtonProps, "type"> {
  /** The TipTap editor instance. */
  editor?: Editor | null
  /** The text colors to display in the popover. */
  colors?: TextColorPopoverColor[]
  /** Whether to hide the text color popover when unavailable. */
  hideWhenUnavailable?: boolean
}

export const DEFAULT_TEXT_COLORS: TextColorPopoverColor[] = [
  {
    label: "Black",
    value: "#000000",
    border: '#e5e7eb',
  },
  {
    label: "Red",
    value: "#dc2626",
    border: '',
  },
  {
    label: "Blue",
    value: "#2563eb",
    border: '',
  },
  {
    label: "Green",
    value: "#16a34a",
    border: "",
  },
  {
    label: "Purple",
    value: "#9333ea",
    border: "",
  },
  {
    label: "Orange",
    value: "#ea580c",
    border: "",
  },
]

// Custom text color button component
export const TextColorButton = React.forwardRef<
  HTMLButtonElement,
  ButtonProps & { color: string; editor?: Editor | null }
>(({ className, children, color, editor, onClick, ...props }, ref) => {
  const handleClick = React.useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    if (editor) {
      editor.chain().focus().setColor(color).run()
    }
    onClick?.(e)
  }, [editor, color, onClick])

  return (
    <Button
      type="button"
      className={className}
      data-style="ghost"
      data-appearance="default"
      role="button"
      tabIndex={-1}
      ref={ref}
      onClick={handleClick}
      {...props}
    >
      {children || (
        <div 
          className="tiptap-color-swatch" 
          style={{ 
            backgroundColor: color,
            width: '16px',
            height: '16px',
            borderRadius: '2px',
            border: props.color === '#000000' ? '1px solid #e5e7eb' : 'none'
          }} 
        />
      )}
    </Button>
  )
})

TextColorButton.displayName = "TextColorButton"

export const TextColorPopoverButton = React.forwardRef<
  HTMLButtonElement,
  ButtonProps
>(({ className, children, ...props }, ref) => (
  <Button
    type="button"
    className={className}
    data-style="ghost"
    data-appearance="default"
    role="button"
    tabIndex={-1}
    aria-label="Change text color"
    tooltip="Text Color"
    ref={ref}
    {...props}
  >
    {children || <PaletteIcon className="tiptap-button-icon" />}
  </Button>
))

TextColorPopoverButton.displayName = "TextColorPopoverButton"

export function TextColorPopoverContent({
  editor: providedEditor,
  colors = DEFAULT_TEXT_COLORS,
  onClose,
}: TextColorPopoverContentProps) {
  const editor = useTiptapEditor(providedEditor)
  const containerRef = React.useRef<HTMLDivElement>(null)

  const removeTextColor = React.useCallback(() => {
    if (!editor) return
    editor.chain().focus().unsetColor().run()
    onClose?.()
  }, [editor, onClose])

  const menuItems = React.useMemo(
    () => [...colors, { label: "Remove text color", value: "none" }],
    [colors]
  )

  const { selectedIndex } = useMenuNavigation({
    containerRef,
    items: menuItems,
    orientation: "both",
    onSelect: (item) => {
      if (item.value === "none") {
        removeTextColor()
      }
      onClose?.()
    },
    onClose,
    autoSelectFirstItem: false,
  })

  return (
    <div
      ref={containerRef}
      className="tiptap-text-color-content"
      tabIndex={0}
    >
      <div className="tiptap-button-group" data-orientation="horizontal">
        {colors.map((color, index) => (
          <TextColorButton
            key={color.value}
            editor={editor}
            color={color.value}
            aria-label={`${color.label} text color`}
            tabIndex={index === selectedIndex ? 0 : -1}
            data-highlighted={selectedIndex === index}
            onClick={onClose}
          />
        ))}
      </div>

      <Separator />

      <div className="tiptap-button-group">
        <Button
          onClick={removeTextColor}
          aria-label="Remove text color"
          tabIndex={selectedIndex === colors.length ? 0 : -1}
          type="button"
          role="menuitem"
          data-style="ghost"
          data-highlighted={selectedIndex === colors.length}
        >
          <BanIcon className="tiptap-button-icon" />
        </Button>
      </div>
    </div>
  )
}

export function TextColorPopover({
  editor: providedEditor,
  colors = DEFAULT_TEXT_COLORS,
  hideWhenUnavailable = false,
  ...props
}: TextColorPopoverProps) {
  const editor = useTiptapEditor(providedEditor)
  const [isOpen, setIsOpen] = React.useState(false)
  const [isDisabled, setIsDisabled] = React.useState(false)

  const markAvailable = isMarkInSchema("textStyle", editor) // Changed from "highlight"

  React.useEffect(() => {
    if (!editor) return

    const updateIsDisabled = () => {
      let isDisabled = false

      if (!markAvailable || !editor) {
        isDisabled = true
      }
    }

    editor.on("selectionUpdate", updateIsDisabled)
    editor.on("update", updateIsDisabled)

    return () => {
      editor.off("selectionUpdate", updateIsDisabled)
      editor.off("update", updateIsDisabled)
    }
  }, [editor, markAvailable])

  // Check if any text color is active
  const isActive = editor?.getAttributes('textStyle')?.color != null

  const shouldShow = React.useMemo(() => {
    if (!hideWhenUnavailable || !editor) return true
    return !isNodeSelection(editor.state.selection)
  }, [hideWhenUnavailable, editor])

  if (!shouldShow || !editor || !editor.isEditable) {
    return null
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <TextColorPopoverButton
          disabled={isDisabled}
          data-active-state={isActive ? "on" : "off"}
          data-disabled={isDisabled}
          aria-pressed={isActive}
          {...props}
        />
      </PopoverTrigger>

      <PopoverContent aria-label="Text colors">
        <TextColorPopoverContent
          editor={editor}
          colors={colors}
          onClose={() => setIsOpen(false)}
        />
      </PopoverContent>
    </Popover>
  )
}

export default TextColorPopover