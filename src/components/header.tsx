import Link from 'next/link'

const Header = () => {
    return (
        <header className="border-b border-b-border-dark">
            <nav className="px-3 py-[0.4rem]">
                <Link
                    href="/"
                    className="text-lg font-semibold text-accent-dark"
                >
                    mylo
                    <span className="csgo">/csgo</span>
                </Link>
            </nav>
        </header>
    )
}

export default Header
