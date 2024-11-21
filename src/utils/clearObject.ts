import _ from 'lodash'

export default function clearObject(objectToClear: object): object {
  return _.omitBy(objectToClear, (value) => {
    return (
      (_.isArray(value) && _.isEmpty(value)) ||
      (_.isString(value) && _.isEmpty(_.trim(value))) ||
      value === null ||
      value === undefined
    )
  })
}
