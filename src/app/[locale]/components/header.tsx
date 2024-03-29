import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import HeaderMenu from './header-menu'
import LocaleSwitcher from './locale-switcher'

const Header = async () => {
    const session = await getServerSession(authOptions)
    const avatarImage = session?.user?.image as string
    const userFirstTwoLetters = session?.user?.name
        ?.slice(0, 2)
        .toUpperCase() as string
    const userName = session?.user?.name as string
    return (
        <header className="sticky top-0 z-10 w-full bg-transparent backdrop-blur-[3px]">
            <nav className="flex items-center justify-between">
                <Link
                    href="/"
                    className="flex items-center text-lg font-bold text-accent-light"
                >
                    <span>Mylo/cs</span>
                </Link>
                <div className="flex items-center gap-4">
                    <LocaleSwitcher />
                    {session && (
                        <HeaderMenu
                            avatarImage={avatarImage}
                            avatarFallback={userFirstTwoLetters}
                            userName={userName}
                        />
                    )}
                </div>
            </nav>
        </header>
    )
}

export default Header
