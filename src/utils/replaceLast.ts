export default function replaceLast(text: string, find: string, replace: string) {
  var index = text.lastIndexOf(find)

  if (index >= 0) {
    return text.substring(0, index) + replace + text.substring(index + find.length)
  }

  return text.toString()
}
