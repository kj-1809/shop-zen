export const HomepageLoading = () => {
  return (
    <div className = "flex flex-col">
      <div className = "w-full h-[70vh] animate-pulse bg-slate-300">
      </div>
      <div className = "grid grid-cols-1 md:grid-cols-3 mt-4 p-2">
        <div className = "h-96 bg-slate-300 rounded-md animate-pulse m-2"></div>
        <div className = "h-96 bg-slate-300 rounded-md animate-pulse m-2"></div>
        <div className = "h-96 bg-slate-300 rounded-md animate-pulse m-2"></div>
      </div>
    </div>
  )
}