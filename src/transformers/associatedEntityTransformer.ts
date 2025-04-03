import { type AssociatedEntity, type AssociatedEntityFromApi } from 'types/associatedEntity'

export const associatedEntityFromApi = (
  data?: AssociatedEntityFromApi
): AssociatedEntity | undefined => {
  if (data) {
    return { id: data?.id ?? data?.name, name: data?.name }
  }

  return undefined
}
