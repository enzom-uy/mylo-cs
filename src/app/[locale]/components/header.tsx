import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import MyloIcon from '@/app/favicon.ico'
import { getServerSession } from 'next-auth'
import Image from 'next/image'
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
        <header className="sticky top-0 z-10 w-full border-b border-b-border-dark backdrop-blur-[3px]">
            <nav className="flex items-center justify-between px-3 py-[0.4rem] md:px-6 lg:px-10 2xl:px-72">
                <Link
                    href="/"
                    className="flex items-center text-lg font-semibold text-accent-dark"
                >
                    {/* <Image src={MyloIcon} width={25} alt="Mylo logo" /> */}
                    <span className="text-accent-light font-bold">Mylo</span>
                    <span className="text-accent-light font-bold">/cs</span>
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
