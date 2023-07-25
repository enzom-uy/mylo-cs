import Link from 'next/link'

export const FooterAboutSection = ({
    supportText,
    termsText
}: {
    supportText: string
    termsText: string
}) => {
    return (
        <>
            <ul className="flex flex-col gap-2 text-sm md:flex-row">
                <li>
                    <a
                        href="https://discord.gg/uKq853scxZ"
                        target="_blank"
                        className="footer-link"
                    >
                        {supportText}
                    </a>
                </li>
                <li>
                    <Link href="/faq" className="footer-link">
                        FAQ
                    </Link>
                </li>
                <li>
                    <Link href="/terms" className="footer-link">
                        {termsText}
                    </Link>
                </li>
            </ul>
        </>
    )
}
