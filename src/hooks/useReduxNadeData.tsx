import { useAppSelector } from '@/redux/hooks'
import { NadeAuthorNadeType } from '@/services/getServer'

interface Props {
    isAdmin?: boolean
    nades: NadeAuthorNadeType[]
}

export const useNadesData = ({ isAdmin, nades }: Props) => {
    const reduxIsLoading = useAppSelector((state) => state.nadesReducer.loading)
    const reduxNades = useAppSelector((state) => state.nadesReducer.nades)

    return { reduxIsLoading, reduxNades }
}
