import { useContext } from 'react'
import DataContext from '../contexts/DataContext.ts'
import { type UseFetchDataResponse } from 'hooks/useFetchData.tsx'

const useData = (): UseFetchDataResponse => useContext(DataContext)

export default useData
