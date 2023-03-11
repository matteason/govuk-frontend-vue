// Based on https://gist.github.com/rhysburnie/a255e7246d919872029b17d4b2b26419
import { useSlots } from 'vue'

export default function useHasSlot(name) {
  const slots = useSlots()
  return slots[name] && !isEmptySlot(slots[name]())
}

function isEmptySlot(items) {
  if (!items.length) return true
  return !items.some(hasSlotContent)
}

function hasSlotContent(item) {
  const type = item.type.toString()
  if (type === 'Symbol(Comment)') return false
  if (type === 'Symbol(Text)' && !item.children.trim()) return false
  if (type === 'Symbol(Fragment)' && !item.children.length) return false
  return true
}
