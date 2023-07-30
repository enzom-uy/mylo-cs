const Main: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <>
            <main className="flex h-full w-full max-w-[110rem] flex-grow flex-col pt-12">
                {children}
            </main>
        </>
    )
}

export default Main
