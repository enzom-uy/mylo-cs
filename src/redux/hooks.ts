import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { store, AppDispatch, RootState } from './store'

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
