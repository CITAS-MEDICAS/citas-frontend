import { ref, provide, watch } from '@vue/composition-api'
import { app } from '@/main'

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

  const deleteResource = async (resourceId, ResourceClass) => {
    const result = await app.$swal({
      title: '¿Esta used seguro/a?',
      text: 'No se pordrá revertir este cambio.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'Cancelar',
      customClass: {
        confirmButton: 'btn btn-warning',
        cancelButton: 'btn btn-outline-dark ml-1',
      },
      buttonsStyling: false,
    })

    if (!result) return false

    const isDeleted = await ResourceClass.destroy(resourceId)

    if (isDeleted.status == 204) {
      app.$swal({
        icon: 'success',
        title: '¡Eliminado!',
        text: 'La operación se realizo exitosamente.',
        customClass: {
          confirmButton: 'btn btn-success',
        },
      })

      return true
    }

    return false
  }

  return {
    refTable,
    perPage,
    perPageOptions,
    currentPage,
    totalRows,
    searchQuery,
    sortBy,
    isSortDirDesc,
    deleteResource,
  }
}

export default useList
