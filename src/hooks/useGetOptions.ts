import entitiesToOptions from 'utils/entityToOptions'
import useAuth from 'features/Auth/hooks/useAuth.ts'
import useFetchPubs from 'hooks/useFetchPubs.tsx'
import useFetchSubs from 'hooks/useFetchSubs.tsx'
import useFetchBuyers from 'hooks/useFetchBuyers.tsx'
import useFetchCampaigns from 'hooks/useFetchCampaigns.tsx'
import useFetchProviders from './useFetchProviders'

type ResourceName = string

type Options = {
  [key in `${ResourceName}Options`]: any[]
}

const HOOKS_MAP: Record<ResourceName, any> = {
  pubs: useFetchPubs,
  subs: useFetchSubs,
  buyers: useFetchBuyers,
  campaigns: useFetchCampaigns,
  providers: useFetchProviders,
}

export const LIST_ENTITIES_PERMISSIONS: Record<ResourceName, any> = {
  roles: 'yes',
  pubs: 'yes',
  subs: 'yes',
  buyers: 'yes',
  campaigns: 'yes',
}

const FIELD_LABEL: Record<ResourceName, string> = {
  roles: 'name',
  pubs: 'name',
  subs: 'name',
  buyers: 'name',
  campaigns: 'name',
}

const FIELD_VALUE: Record<ResourceName, string> = {
  roles: 'id',
  pubs: 'id',
  subs: 'id',
  buyers: 'id',
  campaigns: 'id',
}

const useGetOptions = (
  resourceNameList: ResourceName[],
  filters?: any,
  withEntity: boolean = false,
  extraParameters: any = {}
): Options => {
  const options: Partial<Options> = {}
  const { checkPermissions } = useAuth()

  resourceNameList.forEach((resourceName: ResourceName) => {
    options[`${resourceName}Options`] = []
    if (checkPermissions(LIST_ENTITIES_PERMISSIONS[resourceName])) {
      const resourceFetchHook = HOOKS_MAP[resourceName]
      const hookData = resourceFetchHook?.({
        persistConfig: false,
        filters: { ...filters, size: 100 },
        ...extraParameters,
      })

      const resourceList = hookData?.[resourceName] || []
      options[`${resourceName}Options`] = entitiesToOptions(
        resourceList,
        {
          fieldLabel: FIELD_LABEL[resourceName],
          fieldValue: FIELD_VALUE[resourceName],
        },
        withEntity
      )
    }
  })

  return options as Options
}

export default useGetOptions
