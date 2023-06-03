export const ReviewInput = () => {
  return (
    <div className = "w-full mt-5">
      <textarea className="outline-none rounded-sm border-2 border-gray-300 w-full px-4 py-2" placeholder="Write a review ..."/>
      <button className = "px-4 py-2 rounded-md bg-yellow-400">Post Review</button>
    </div>
  )
}