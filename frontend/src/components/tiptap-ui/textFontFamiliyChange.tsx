import * as React from "react"
import { isNodeSelection, type Editor } from "@tiptap/react"

// --- Hooks ---
import { useMenuNavigation } from "@/hooks/use-menu-navigation"
import { useTiptapEditor } from "@/hooks/use-tiptap-editor"

// --- Icons ---
import { BanIcon } from "@/components/tiptap-icons/ban-icon"
import { TypeIcon } from "lucide-react" // Font size icon

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

export interface FontFamilyPopover {
  label: string
  value: string
  displayFontFamily?: string // For showing the size in the UI
}

export interface FontSizePopoverContentProps {
  editor?: Editor | null
  fontFamily?: FontFamilyPopover[]
  onClose?: () => void
}

export interface FontSizePopoverProps extends Omit<ButtonProps, "type"> {
  /** The TipTap editor instance. */
  editor?: Editor | null
  /** The font sizes to display in the popover. */
  fontFamily?: FontFamilyPopover[]
  /** Whether to hide the font size popover when unavailable. */
  hideWhenUnavailable?: boolean
}

export const DEFAULT_FONT_FAMILIES: FontFamilyPopover[] = [
  {
    label: "Sans Serif",
    value: "Arial, sans-serif",
    displayFontFamily: "Arial, sans-serif",
  },
  {
    label: "Serif",
    value: "Times New Roman, serif",
    displayFontFamily: "Times New Roman, serif",
  },
  {
    label: "Monospace",
    value: "Courier New, monospace",
    displayFontFamily: "Courier New, monospace",
  },
  {
    label: "System",
    value: "system-ui, -apple-system, sans-serif",
    displayFontFamily: "system-ui, -apple-system, sans-serif",
  },
  {
    label: "Georgia",
    value: "Georgia, serif",
    displayFontFamily: "Georgia, serif",
  },
  {
    label: "Helvetica",
    value: "Helvetica, Arial, sans-serif",
    displayFontFamily: "Helvetica, Arial, sans-serif",
  },
  {
    label: "Verdana",
    value: "Verdana, Geneva, sans-serif",
    displayFontFamily: "Verdana, Geneva, sans-serif",
  },
  {
    label: "Trebuchet MS",
    value: "Trebuchet MS, Helvetica, sans-serif",
    displayFontFamily: "Trebuchet MS, Helvetica, sans-serif",
  },
  {
    label: "Tahoma",
    value: "Tahoma, Geneva, sans-serif",
    displayFontFamily: "Tahoma, Geneva, sans-serif",
  },
  {
    label: "Times",
    value: "Times, Times New Roman, serif",
    displayFontFamily: "Times, Times New Roman, serif",
  },
  {
    label: "Palatino",
    value: "Palatino, Palatino Linotype, serif",
    displayFontFamily: "Palatino, Palatino Linotype, serif",
  },
  {
    label: "Book Antiqua",
    value: "Book Antiqua, Palatino, serif",
    displayFontFamily: "Book Antiqua, Palatino, serif",
  },
  {
    label: "Garamond",
    value: "Garamond, Times New Roman, serif",
    displayFontFamily: "Garamond, Times New Roman, serif",
  },
  {
    label: "Monaco",
    value: "Monaco, Consolas, monospace",
    displayFontFamily: "Monaco, Consolas, monospace",
  },
  {
    label: "Consolas",
    value: "Consolas, Monaco, monospace",
    displayFontFamily: "Consolas, Monaco, monospace",
  },
  {
    label: "Menlo",
    value: "Menlo, Monaco, Consolas, monospace",
    displayFontFamily: "Menlo, Monaco, Consolas, monospace",
  },
  {
    label: "Source Code Pro",
    value: "Source Code Pro, Menlo, monospace",
    displayFontFamily: "Source Code Pro, Menlo, monospace",
  },
  {
    label: "Fira Code",
    value: "Fira Code, Consolas, monospace",
    displayFontFamily: "Fira Code, Consolas, monospace",
  },
  {
    label: "Comic Sans MS",
    value: "Comic Sans MS, cursive",
    displayFontFamily: "Comic Sans MS, cursive",
  },
  {
    label: "Impact",
    value: "Impact, Arial Black, sans-serif",
    displayFontFamily: "Impact, Arial Black, sans-serif",
  },
]
// Custom font size button component
export const FontFamilyButton = React.forwardRef<
  HTMLButtonElement,
  ButtonProps & { fontFamily: FontFamilyPopover; editor?: Editor | null }
>(({ className, children, fontFamily, editor, onClick, ...props }, ref) => {
  const handleClick = React.useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    if (editor) {
      // Use fontSize attribute with the custom extension
      console.log(fontFamily)
      editor.chain().focus().setFontFamily(fontFamily.value).run()
    }
    onClick?.(e)
  }, [editor, fontFamily.value, onClick])

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
            justifyContent: 'center',
            fontFamily: fontFamily.value
          }}
        >
          {fontFamily.label}
        </span>
      )}
    </Button>
  )
})

FontFamilyButton.displayName = "FontFamilyButton"

export const FontFamilyPopoverButton = React.forwardRef<
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
    aria-label="Change font Family"
    tooltip="Font Style"
    ref={ref}
    {...props}
  >
    {children || <TypeIcon className="tiptap-button-icon" />}
  </Button>
))

FontFamilyPopoverButton.displayName = "FontFamilyPopoverButton"

export function FontSizePopoverContent({
  editor: providedEditor,
  fontFamilies = DEFAULT_FONT_FAMILIES,
  onClose,
}: FontSizePopoverContentProps) {
  const editor = useTiptapEditor(providedEditor)
  const containerRef = React.useRef<HTMLDivElement>(null)

  const removeFontFamily = React.useCallback(() => {
    if (!editor) return
    // Remove the fontSize attribute specifically
    editor.chain().focus().unsetFontFamily().run()
    onClose?.()
  }, [editor, onClose])

  const menuItems = React.useMemo(
    () => [...fontFamilies, { label: "Remove font family", value: "none" }],
    [fontFamilies]
  )

  const { selectedIndex } = useMenuNavigation({
    containerRef,
    items: menuItems,
    orientation: "vertical", // Changed to vertical for font sizes
    onSelect: (item) => {
      if (item.value === "none") {
        removeFontFamily()
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
      <div className="tiptap-button-group overflow-y-scroll h-[8rem]" data-orientation="vertical">
        {fontFamilies.map((fonts, index) => (
          <FontFamilyButton
            key={fonts.value}
            editor={editor}
            fontFamily={fonts}
            aria-label={`${fonts.label} font family (${fonts.value})`}
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
          onClick={removeFontFamily}
          aria-label="Remove font family"
          tabIndex={selectedIndex === fontFamilies.length ? 0 : -1}
          type="button"
          role="menuitem"
          data-style="ghost"
          data-highlighted={selectedIndex === fontFamilies.length}
        >
          <BanIcon className="tiptap-button-icon" />
        </Button>
      </div>
    </div>
  )
}

export function FontFamilysPopover({
  editor: providedEditor,
  fontFamilys = DEFAULT_FONT_FAMILIES,
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
  const isActive = editor?.getAttributes('textStyle')?.fontFamily != null

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
        <FontFamilyPopoverButton
          disabled={isDisabled}
          data-active-state={isActive ? "on" : "off"}
          data-disabled={isDisabled}
          aria-pressed={isActive}
          {...props}
        />
      </PopoverTrigger>

      <PopoverContent aria-label="Font Family">
        <FontSizePopoverContent
          editor={editor}
          fontFamily={fontFamilys}
          onClose={() => setIsOpen(false)}
        />
      </PopoverContent>
    </Popover>
  )
}

export default FontFamilysPopover