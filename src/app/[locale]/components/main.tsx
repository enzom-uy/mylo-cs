const Main: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <>
            <main className="flex h-full w-full max-w-[130rem] flex-grow flex-col items-center pt-12">
                {children}
            </main>
        </>
    )
}

export default Main
