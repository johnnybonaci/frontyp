import entitiesToOptions from 'utils/entityToOptions'
import useAuth from 'features/Auth/hooks/useAuth.ts'
import useFetchPubs from 'hooks/useFetchPubs.tsx'
import useFetchSubs from 'hooks/useFetchSubs.tsx'
import useFetchBuyers from 'hooks/useFetchBuyers.tsx'
import useFetchCampaigns from 'hooks/useFetchCampaigns.tsx'

export type ResourceName = 'pubs' | 'subs' | 'buyers' | 'campaigns'

export const LIST_ENTITIES_PERMISSIONS: Record<ResourceName, string> = {
  pubs: 'yes',
  subs: 'yes',
  buyers: 'yes',
  campaigns: 'yes',
}

const FIELD_LABEL: Record<ResourceName, string> = {
  pubs: 'name',
  subs: 'name',
  buyers: 'name',
  campaigns: 'name',
}

const FIELD_VALUE: Record<ResourceName, string> = {
  pubs: 'id',
  subs: 'id',
  buyers: 'id',
  campaigns: 'id',
}

const useGetOptions = (
  resourceName: ResourceName,
  filters?: any,
  withEntity: boolean = false,
  extraParameters: any = {}
): Array<{ title: string; id?: string }> => {
  const { checkPermissions } = useAuth()

  if (!checkPermissions(LIST_ENTITIES_PERMISSIONS[resourceName])) {
    return []
  }

  const hookParams = {
    persistConfig: false,
    filters: { ...filters, size: 100 },
    ...extraParameters,
  }

  let resourceList: any[] = []

  switch (resourceName) {
    case 'buyers':
      resourceList = useFetchBuyers(hookParams)?.buyers || []
      break
    case 'pubs':
      resourceList = useFetchPubs(hookParams)?.pubs || []
      break
    case 'subs':
      resourceList = useFetchSubs(hookParams)?.subs || []
      break
    case 'campaigns':
      resourceList = useFetchCampaigns(hookParams)?.campaigns || []
      break
    default:
      return []
  }

  return entitiesToOptions(
    resourceList,
    {
      fieldLabel: FIELD_LABEL[resourceName],
      fieldValue: FIELD_VALUE[resourceName],
    },
    withEntity
  )
}

export default useGetOptions
