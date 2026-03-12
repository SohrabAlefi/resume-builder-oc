export default function Textarea(props) {
  return (
    <textarea
      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 resize-none"
      {...props}
    />
  )
}
