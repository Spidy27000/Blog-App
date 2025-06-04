import * as React from "react"
import { isNodeSelection, type Editor } from "@tiptap/react"

// --- Hooks ---
import { useMenuNavigation } from "@/hooks/use-menu-navigation"
import { useTiptapEditor } from "@/hooks/use-tiptap-editor"

// --- Icons ---
import { BanIcon } from "@/components/tiptap-icons/ban-icon"
import { ALargeSmall } from 'lucide-react'; // Font size icon

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

export interface FontSizePopoverSize {
  label: string
  value: string
  displaySize?: string // For showing the size in the UI
}

export interface FontSizePopoverContentProps {
  editor?: Editor | null
  sizes?: FontSizePopoverSize[]
  onClose?: () => void
}

export interface FontSizePopoverProps extends Omit<ButtonProps, "type"> {
  /** The TipTap editor instance. */
  editor?: Editor | null
  /** The font sizes to display in the popover. */
  sizes?: FontSizePopoverSize[]
  /** Whether to hide the font size popover when unavailable. */
  hideWhenUnavailable?: boolean
}

export const DEFAULT_FONT_SIZES: FontSizePopoverSize[] = [
  {
    label: "Small",
    value: "12px",
    displaySize: "12px",
  },
  {
    label: "Normal",
    value: "14px", 
    displaySize: "14px",
  },
  {
    label: "Medium",
    value: "16px",
    displaySize: "16px",
  },
  {
    label: "Large",
    value: "18px",
    displaySize: "18px",
  },
  {
    label: "Extra Large",
    value: "24px",
    displaySize: "24px",
  },
  {
    label: "Huge",
    value: "32px",
    displaySize: "32px",
  },
]

// Custom font size button component
export const FontSizeButton = React.forwardRef<
  HTMLButtonElement,
  ButtonProps & { size: FontSizePopoverSize; editor?: Editor | null }
>(({ className, children, size, editor, onClick, ...props }, ref) => {
  const handleClick = React.useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    if (editor) {
      // Use fontSize attribute with the custom extension
      console.log(size.value)
      editor.chain().focus().setMark('textStyle', { fontSize: size.value }).run()
    }
    onClick?.(e)
  }, [editor, size.value, onClick])

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
        <span 
          className="tiptap-font-size-preview"
          style={{ 
            fontWeight: 'normal',
            lineHeight: '1.2',
            display: 'flex',
            alignItems: 'center',
            minWidth: '40px',
            justifyContent: 'center'
          }}
        >
          {size.value}
        </span>
      )}
    </Button>
  )
})

FontSizeButton.displayName = "FontSizeButton"

export const FontSizePopoverButton = React.forwardRef<
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
    aria-label="Change font size"
    tooltip="Font Size"
    ref={ref}
    {...props}
  >
    {children || <span className="tiptap-button-icon text-black flex justify-center items-center text-[1.1rem] font-santoshi-bold">🗚</span>}
  </Button>
))

FontSizePopoverButton.displayName = "FontSizePopoverButton"

export function FontSizePopoverContent({
  editor: providedEditor,
  sizes = DEFAULT_FONT_SIZES,
  onClose,
}: FontSizePopoverContentProps) {
  const editor = useTiptapEditor(providedEditor)
  const containerRef = React.useRef<HTMLDivElement>(null)

  const removeFontSize = React.useCallback(() => {
    if (!editor) return
    // Remove the fontSize attribute specifically
    editor.chain().focus().unsetMark('textStyle', { fontSize: null }).run()
    onClose?.()
  }, [editor, onClose])

  const menuItems = React.useMemo(
    () => [...sizes, { label: "Remove font size", value: "none" }],
    [sizes]
  )

  const { selectedIndex } = useMenuNavigation({
    containerRef,
    items: menuItems,
    orientation: "vertical", // Changed to vertical for font sizes
    onSelect: (item) => {
      if (item.value === "none") {
        removeFontSize()
      }
      onClose?.()
    },
    onClose,
    autoSelectFirstItem: false,
  })

  return (
    <div
      ref={containerRef}
      className="tiptap-font-size-content"
      tabIndex={0}
    >
      <div className="tiptap-button-group" data-orientation="vertical">
        {sizes.map((size, index) => (
          <FontSizeButton
            key={size.value}
            editor={editor}
            size={size}
            aria-label={`${size.label} font size (${size.value})`}
            tabIndex={index === selectedIndex ? 0 : -1}
            data-highlighted={selectedIndex === index}
            onClick={onClose}
          />
        ))}
        {/* <input type="number" name="fontSize" id="" placeholder="12px" className="w-[3rem] text-sm border-2 rounded-md"/> */}
      </div>

      <Separator />

      <div className="tiptap-button-group">
        <Button
          onClick={removeFontSize}
          aria-label="Remove font size"
          tabIndex={selectedIndex === sizes.length ? 0 : -1}
          type="button"
          role="menuitem"
          data-style="ghost"
          data-highlighted={selectedIndex === sizes.length}
        >
          <BanIcon className="tiptap-button-icon" />
        </Button>
      </div>
    </div>
  )
}

export function FontSizePopover({
  editor: providedEditor,
  sizes = DEFAULT_FONT_SIZES,
  hideWhenUnavailable = false,
  ...props
}: FontSizePopoverProps) {
  const editor = useTiptapEditor(providedEditor)
  const [isOpen, setIsOpen] = React.useState(false)
  const [isDisabled, setIsDisabled] = React.useState(false)

  const markAvailable = isMarkInSchema("textStyle", editor) // Font size uses textStyle mark

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

  // Check if any font size is active
  const isActive = editor?.getAttributes('textStyle')?.fontSize != null

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
        <FontSizePopoverButton
          disabled={isDisabled}
          data-active-state={isActive ? "on" : "off"}
          data-disabled={isDisabled}
          aria-pressed={isActive}
          {...props}
        />
      </PopoverTrigger>

      <PopoverContent aria-label="Font sizes">
        <FontSizePopoverContent
          editor={editor}
          sizes={sizes}
          onClose={() => setIsOpen(false)}
        />
      </PopoverContent>
    </Popover>
  )
}

export default FontSizePopover