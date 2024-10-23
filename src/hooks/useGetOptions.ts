import entitiesToOptions from 'utils/entityToOptions'
import useAuth from 'features/Auth/hooks/useAuth.ts'

type ResourceName = string

type Options = {
  [key in `${ResourceName}Options`]: any[]
}

const HOOKS_MAP: Record<ResourceName, any> = {
}

export const LIST_ENTITIES_PERMISSIONS: Record<ResourceName, any> = {
  roles: 'yes',
}

const FIELD_LABEL: Record<ResourceName, string> = {
  roles: 'name',
}

const FIELD_VALUE: Record<ResourceName, string> = {
  roles: 'id',
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
      const hookData = resourceFetchHook?.({ filters, ...extraParameters })

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
