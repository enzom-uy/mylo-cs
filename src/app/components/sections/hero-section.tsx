import { getServerSession } from 'next-auth'
import LoginDiscordButton from '../login-discord-btn'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import InviteBot from '@/app/components/invite-bot'

const Hero = async () => {
    const session = await getServerSession(authOptions)
    return (
        <section className="flex w-full justify-center border-b border-b-border-dark px-10 pb-6">
            <div className="flex flex-col gap-4">
                <h1 className="m-0 text-3xl font-semibold">
                    Mejora tu juego con granadas útiles.
                </h1>
                <div className="max-w-md font-semibold text-light-muted">
                    <p>
                        Comparte, aprende y domina
                        <span className="csgo"> Counter-Strike</span>.
                    </p>
                    <p>
                        Lleva tu juego al siguiente nivel. Une{' '}
                        <span className="text-[#7289DA]">Discord</span> y
                        <span className="text-accent-dark"> mylo</span>
                        <span className="csgo">/csgo</span> para crear, ver y
                        compartir las granadas más útiles.
                    </p>
                </div>
                <div className="flex flex-wrap items-center gap-4">
                    {!session && <LoginDiscordButton />}
                    <InviteBot />
                </div>
            </div>
        </section>
    )
}

export default Hero
