const MagicButton = ({title, icon, position, handleClick, otherClasses}: 
    {title?:string, icon?:React.ReactNode, position?:string, handleClick?:() => void, otherClasses?:string}) => {
    return (
        <div>
            <button onClick={handleClick} className="relative inline-flex h-12 overflow-hidden rounded-lg p-[1px] focus:outline-none md:w-60 md:mt-10 f-btn sm:w-[46%]">
                <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                <span className={`inline-flex h-full cursor-pointer items-center justify-center rounded-xl dark:rounded-xl bg-violet-700 hover:bg-violet-800 dark:bg-slate-950 px-5 text-sm font-medium text-white backdrop-blur-3xl gap-2 ${otherClasses}`
            }>
                    {position === "left" && icon}
                    {title}
                    {position === "right" && icon}
                </span>
            </button>
        </div>
    )
}

export default MagicButton
