import LoginDiscordButton from '../login-discord-btn'

const Hero = () => {
    return (
        <section className="border-b border-b-border-dark pb-6">
            <div className="flex flex-col gap-3">
                <h1 className="text-3xl font-semibold">
                    Eleva tu juego con granadas útiles.
                </h1>
                <div className="max-w-md font-semibold text-light-muted">
                    <p>
                        Comparte, aprende y domina{' '}
                        <span className="csgo">Counter-Strike</span>.
                    </p>
                    <p>
                        Accede a nuestra colección de granadas y lleva tu juego
                        al siguiente nivel.
                    </p>
                </div>
                <LoginDiscordButton />
            </div>
        </section>
    )
}

export default Hero