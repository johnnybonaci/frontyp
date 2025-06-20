type Entity = Record<string, any>

export interface OptionConfig {
  fieldValue?: string
  fieldLabel?: string
}

export interface OptionResult {
  name: any
  title: string
  value: any
  entity?: any
}

const getNestedValue = (obj: any, path: string): string => {
  return path.split('.').reduce((acc, part) => acc?.[part], obj)
}

export default function entitiesToOptions(
  entities: Entity[] = [],
  options?: OptionConfig,
  addEntity: boolean = false
): OptionResult[] {
  return entities?.map((entity) => entityToOption(entity, options, addEntity)) || []
}

export function entityToOption(
  entity: Entity,
  { fieldValue = 'id', fieldLabel = 'name' }: OptionConfig = {},
  addEntity: boolean = false
): OptionResult {
  return addEntity
    ? {
        entity,
        name: getNestedValue(entity, fieldLabel) || entity.name,
        title: getNestedValue(entity, fieldLabel) || entity.name,
        value:
          getNestedValue(entity, fieldValue) !== undefined
            ? getNestedValue(entity, fieldValue)
            : entity.value,
      }
    : {
        name: getNestedValue(entity, fieldLabel) || entity.name,
        title: getNestedValue(entity, fieldLabel) || entity.name,
        value: getNestedValue(entity, fieldValue) !== undefined ? entity[fieldValue] : entity.value,
      }
}
