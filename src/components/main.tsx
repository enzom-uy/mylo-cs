const Main: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <main className="flex max-w-3xl flex-col items-center px-6 py-16">
            {children}
        </main>
    )
}

export default Main
