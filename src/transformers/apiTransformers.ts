export const multipleSelectToApi = (
  data: any[],
  props: (item: any) => any = (item: any) => item.id ?? item.title // as default send item.id or item.title
): any => {
  return data?.map((item: any, index: number) => {
    return { [index]: props(item) }
  })
}
