import InviteBot from '@/app/[locale]/components/invite-bot'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { Session, getServerSession } from 'next-auth'
import { useTranslations } from 'next-intl'
import LoginDiscordButton from '../login-discord-btn'

const HeroContent = ({ session }: { session: Session | null }) => {
    const t = useTranslations('Hero')
    return (
        <>
            <h1 className="m-0 text-center text-3xl font-semibold lg:text-start">
                {t('title')}
            </h1>
            <div className="text-center font-semibold text-muted-foreground md:max-w-[58ch] lg:text-start">
                <p>
                    {t('share-learn')}
                    <span className="csgo"> {t('counter-strike')}</span>.
                </p>
                <p>
                    {t('next-level')}
                    <span className="text-[#7289DA]">Discord</span> {t('and')}
                    <span className="csgo"> {t('mylo-cs')} </span>
                    {t('rest')}
                </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 lg:justify-start">
                {!session && <LoginDiscordButton />}
                <InviteBot />
            </div>
        </>
    )
}

const Hero = async () => {
    const session = await getServerSession(authOptions)
    return (
        <section className="flex w-full justify-center border-b border-b-border-dark pb-6 lg:justify-start">
            <div className="flex flex-col gap-2 p-4">
                <HeroContent session={session} />
            </div>
        </section>
    )
}

export default Hero
