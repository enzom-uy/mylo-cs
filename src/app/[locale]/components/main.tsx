const Main: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <>
            <main className="flex h-full w-full max-w-5xl flex-col items-center px-6 pt-12 lg:pt-14">
                {children}
            </main>
        </>
    )
}

export default Main
