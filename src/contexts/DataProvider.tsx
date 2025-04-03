import { type ReactNode } from 'react'
import DataContext from './DataContext.ts'
import useFetchData from 'hooks/useFetchData.tsx'
import LoadingRing from 'components/LoadingRing'

interface DataProviderProps {
  children: ReactNode
}

const DataProvider = ({ children }: DataProviderProps): ReactNode => {
  const data = useFetchData()

  if (data.loading) {
    return <LoadingRing center />
  }

  return <DataContext.Provider value={data}>{children}</DataContext.Provider>
}

export default DataProvider
