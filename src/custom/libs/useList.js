import { ref, provide, watch } from '@vue/composition-api'
import { app } from '@/main'
import { useRouter } from '@core/utils/utils'

const useList = function () {
  const { route } = useRouter()

  const refTable = ref(null)
  const perPage = ref(10)
  const perPageOptions = [10, 25, 50, 100]
  const currentPage = ref(1)
  const totalRows = ref(0)
  const searchQuery = ref('')
  const sortBy = ref('updated_at')
  const isSortDirDesc = ref(true)
  const isBusy = ref(false)

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

    if (!result.isConfirmed) return false

    const isDeleted = await ResourceClass.destroy(resourceId)

    if (isDeleted.status == 204) {
      app.$swal({
        icon: 'success',
        title: '¡Eliminado!',
        text: 'La operación se realizo exitosamente.',
        timer: 1500,
        customClass: {
          confirmButton: 'btn btn-success',
        },
      })

      return true
    } else {
      app.$swal({
        icon: 'warning',
        title: '¡Error!',
        text: 'Ocurrio un error en el proceso.',
        timer: 1500,
        customClass: {
          confirmButton: 'btn btn-success',
        },
      })

      return false
    }
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
    isBusy,
    route,
    deleteResource,
    refetchData,
  }
}

export default useList
