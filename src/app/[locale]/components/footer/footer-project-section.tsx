import Link from 'next/link'

interface Props {
    contributeText: string
}

export const FooterProjectSection = ({ contributeText }: Props) => {
    return (
        <>
            <ul className="flex flex-col gap-2 text-sm md:flex-row">
                <li>
                    <Link
                        href="https://github.com/enzom-uy/new-mylo"
                        target="_blank"
                        className="footer-link"
                    >
                        Github
                    </Link>
                </li>
                <li>
                    <Link
                        href="https://github.com/enzom-uy/new-mylo#contributing"
                        target="_blank"
                        className="footer-link"
                    >
                        {contributeText}
                    </Link>
                </li>
            </ul>
        </>
    )
}
