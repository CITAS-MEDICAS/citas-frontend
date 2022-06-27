<template>
  <div class="auth-wrapper auth-v2">
    <b-row class="auth-inner m-0">
      <!-- Brand logo-->
      <b-link class="brand-logo">
        <!-- <vuexy-logo /> -->
        <!-- <h2 class="brand-text text-primary ml-1">CNS - Regional La Paz</h2> -->
      </b-link>
      <!-- /Brand logo-->

      <!-- Left Text-->
      <b-col lg="8" class="d-none d-lg-flex align-items-center p-5">
        <div class="w-100 d-lg-flex align-items-center justify-content-center px-5">
          <!-- <b-img fluid :src="imgUrl" alt="Login V2" /> -->
        </div>
      </b-col>
      <!-- /Left Text-->

      <!-- Login-->
      <b-col lg="4" class="d-flex align-items-center auth-bg px-2 p-lg-5">
        <b-col sm="8" md="6" lg="12" class="px-xl-2 mx-auto">
          <b-img
            :src="require('@/assets/images/logo/logo_cns1.png')"
            center
            class="mb-1 mb-sm-0"
            height="150"
          />
          <br>
          <b-card-title title-tag="h2" class="font-weight-bold mb-1">
            Inicio de Sesión
          </b-card-title>
          <b-card-text class="mb-2">
            Para obtener las credenciales, debe aceptar términos y registrarse.
          </b-card-text>

          <!-- form -->
          <validation-observer ref="loginForm" #default="{ invalid }">
            <b-form class="auth-login-form mt-2" @submit.prevent="handleLogin">
              <!-- email -->
              <b-form-group label="Email" label-for="login-email">
                <validation-provider #default="{ errors }" name="Email" rules="required|email">
                  <b-form-input
                    id="login-email"
                    v-model="userEmail"
                    :state="errors.length > 0 ? false : null"
                    name="login-email"
                    placeholder="john@example.com"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>

              <!-- forgot password -->
              <b-form-group>
                <div class="d-flex justify-content-between">
                  <label>Contraseña</label>
                </div>
                <validation-provider #default="{ errors }" name="Password" rules="required">
                  <b-input-group
                    class="input-group-merge"
                    :class="errors.length > 0 ? 'is-invalid' : null"
                  >
                    <b-form-input
                      id="login-password"
                      v-model="password"
                      :state="errors.length > 0 ? false : null"
                      class="form-control-merge"
                      :type="passwordFieldType"
                      name="login-password"
                      placeholder="············"
                    />
                    <b-input-group-append is-text>
                      <feather-icon
                        class="cursor-pointer"
                        :icon="passwordToggleIcon"
                        @click="togglePasswordVisibility"
                      />
                    </b-input-group-append>
                  </b-input-group>
                  <small class="text-danger">{{ errors[0] }}</small>
                  <b-link to="#" class="text-right">
                    <small>Olvide mi contraseña</small>
                  </b-link>
                </validation-provider>
              </b-form-group>

              <!-- checkbox -->
              <!--              <b-form-group>-->
              <!--                <b-form-checkbox id="remember-me" v-model="status" name="checkbox-1">-->
              <!--                  Remember Me-->
              <!--                </b-form-checkbox>-->
              <!--              </b-form-group>-->

              <!-- submit buttons -->
              <b-button type="submit" variant="primary" block :disabled="invalid">
                Iniciar Sesión
              </b-button>
            </b-form>
          </validation-observer>

          <b-card-text class="text-center mt-2">
            <span>Si aún no se registro, haga click </span>
            <b-link :to="{ name: 'registration-form' }">
              <span>aquí.</span>
            </b-link>
          </b-card-text>
        </b-col>
      </b-col>
      <!-- /Login-->
    </b-row>
  </div>
</template>

<script>
/* eslint-disable global-require */
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import VuexyLogo from '@core/layouts/components/Logo.vue'

import { required, email } from '@validations'
import { togglePasswordVisibility } from '@core/mixins/ui/forms'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import store from '@/store/index'

// import { getHomeRouteForLoggedInUser } from '@/auth/utils'
import { AUTH_REQUEST } from '@/store/modules/auth'

export default {
  components: {
    VuexyLogo,
    ValidationProvider,
    ValidationObserver
  },
  mixins: [togglePasswordVisibility],
  data() {
    return {
      status: '',
      userEmail: '',
      password: '',
      sideImg: require('@/assets/images/pages/login-v2.svg'),
      // validation rulesimport store from '@/store/index'
      required,
      email
    }
  },
  computed: {
    passwordToggleIcon() {
      return this.passwordFieldType === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },
    imgUrl() {
      if (store.state.appConfig.layout.skin === 'dark') {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.sideImg = require('@/assets/images/pages/login-v2-dark.svg')
        return this.sideImg
      }
      return this.sideImg
    }
  },
  methods: {
    async handleLogin() {
      const isValid = await this.$refs.loginForm.validate()

      if (!isValid) return

      this.$store
        .dispatch(AUTH_REQUEST, {
          email: this.userEmail,
          password: this.password
        })
        .then(user => {
          this.$ability.update([{ resource: 'dashboard', action: 'read' }])
          this.$router.push('/').then(() => {
            this.$toast({
              component: ToastificationContent,
              props: {
                title: `Bienvenido ${user?.fullname || ''}`,
                icon: 'UserCheckIcon',
                variant: 'success'
              }
            })
          })
        })
      // .catch(error => {
      //   this.$toast({
      //     component: ToastificationContent,
      //     props: {
      //       title: 'Credenciales Invalidos',
      //       icon: 'AlertCircleIcon',
      //       variant: 'danger'
      //     }
      //   })
      // })
    }
  }
}
</script>

<style lang="scss">
@import '@core/scss/vue/pages/page-auth.scss';
</style>
