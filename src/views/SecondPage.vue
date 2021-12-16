<template>
  <b-card title="Create Awesome 🙌">
    <b-card-text>This is your second page.</b-card-text>
    <b-card-text
      >Chocolate sesame snaps pie carrot cake pastry pie lollipop muffin. Carrot
      cake dragée chupa chups jujubes. Macaroon liquorice cookie wafer tart
      marzipan bonbon. Gingerbread jelly-o dragée chocolate.</b-card-text
    >

    <button v-if="$can('ver', 'Facebook')">VER FACEBOOK</button>
    <button v-if="$can('actualizar', 'Twitter')">VER FACEBOOK</button>
  </b-card>
</template>
