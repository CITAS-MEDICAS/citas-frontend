<template>
  <div class="text-nowrap">
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
  }
}
</script>