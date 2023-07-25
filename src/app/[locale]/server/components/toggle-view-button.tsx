import { useTranslations } from 'next-intl'
import Link from 'next/link'

export const GoAdminButton = ({
    id,
    userIsAdmin,
    isAdminPage
}: {
    id: string
    userIsAdmin: boolean
    isAdminPage: boolean
}) => {
    const t = useTranslations()

    return (
        <Link
            href={`/server/${id}/${isAdminPage ? '' : 'admin'}`}
            className="fake-btn mb-0 mt-4 h-fit w-full justify-center bg-accent-light hover:bg-accent-light/90 md:max-w-fit lg:mt-0"
        >
            {userIsAdmin && !isAdminPage && t('Server-Profile.goto-admin')}
            {isAdminPage && t('Server-Profile.goto-normal')}
        </Link>
    )
}
