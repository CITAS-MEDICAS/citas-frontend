<template>
  <div class="text-nowrap">
    <slot name="control" />
    <b-button
              v-if="$can('print', PERMISSION_MEDICAL_APPOINTMENTS) && resolveEditButton(item.status.name)"
              variant="flat-success"
              class="btn-icon rounded-circle"
              @click="handleSubmit(item.id)">
      <feather-icon icon="PrinterIcon" />
    </b-button>
    <router-link
      v-if="$can('update', PERMISSION_MEDICAL_APPOINTMENTS) && resolveEditButton(item.status.name)"
      :to="{ name: 'medical-appointments-edit', params: { appointmentId: item.id }
     }">
      <b-button
        variant="flat-success"
        class="btn-icon rounded-circle"
      >
        <feather-icon icon="EditIcon" />
      </b-button>
    </router-link>
    <a :href="`http://wa.me/591${item.treatment.patient.phone_number}`" target="_blank">
      <b-button
        variant="flat-info"
        class="btn-icon rounded-circle"
      >
        <feather-icon icon="MessageSquareIcon" />
      </b-button>
    </a>
    <router-link :to="{
        name: 'insured-treatment-history',
        params: { treatmentId: item.treatment.id, },
        query: { cita: item.id }
      }">
      <b-button
        variant="flat-warning"
        class="btn-icon "
      >
        <feather-icon icon="EyeIcon" />
        <small> Historial</small>
      </b-button>
    </router-link>
  </div>
</template>

<script>
import { PERMISSION_MEDICAL_APPOINTMENTS } from '@/permissions'
import { AppointmentResource } from '@/network/lib/appointment'
export default {
  name: 'ActionButtons',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  setup() {
    function resolveEditButton(status) {
      return status === 'RESERVADO' || status === 'SOLICITADO'
    }

    return {
      resolveEditButton,
      PERMISSION_MEDICAL_APPOINTMENTS
    }
  },
  methods: {
    async handleSubmit(id) {
      console.log("handleSubmit print")
      try {
        AppointmentResource.print(id).then(response => {
          const url = window.URL.createObjectURL(new Blob([response.data]))
          const link = document.createElement('a')
          link.href = url
          link.setAttribute('download', 'caratula_estadistica.pdf') //or any other extension
          document.body.appendChild(link)
          link.click()
        })
      }
      catch (e){
        alert("NOTA: Debe asegurarse que el asegurado tiene asignado Centro y Consultorio")
      }

    }
  },
}
</script>
