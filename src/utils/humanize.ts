import _ from 'lodash'

export default function humanize(str: string) {
  return _.capitalize(_.trim(_.snakeCase(str).replace(/_id$/, '').replace(/_/g, ' ')))
}
