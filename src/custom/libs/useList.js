import { ref, provide, watch } from '@vue/composition-api'
import { MedicalCenterResource } from '@/network/lib/medicalCenter'

const useList = function () {
  const refTable = ref(null)
  const perPage = ref(10)
  const perPageOptions = [10, 25, 50, 100]
  const currentPage = ref(1)
  const totalRows = ref(0)
  const searchQuery = ref('')
  const sortBy = ref('id')
  const isSortDirDesc = ref(true)

  let timer = null

  const refetchData = () => {
    refTable.value.refresh()
  }

  watch([searchQuery, perPage, currentPage, isSortDirDesc, sortBy], () => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      refetchData()
    }, 500)
  })

  provide('perPage', perPage)
  provide('searchQuery', searchQuery)
  provide('currentPage', currentPage)

  return {
    refTable,
    perPage,
    perPageOptions,
    currentPage,
    totalRows,
    searchQuery,
    sortBy,
    isSortDirDesc,
  }
}

export default useList
