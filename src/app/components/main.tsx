const Main: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <>
            <main className="flex w-full max-w-3xl flex-col items-center px-6 pt-12 lg:pt-20">
                {children}
            </main>
        </>
    )
}

export default Main
