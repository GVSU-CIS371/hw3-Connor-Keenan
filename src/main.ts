import { createApp } from "vue"
import { createPinia } from "pinia"
import "./styles/mug.scss";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate"
import App from "./App.vue"
import { useBeverageStore } from "./stores/beverageStore"
import './firebase.ts'

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.use(pinia)

const store = useBeverageStore()
store.init().then(() => {
  app.mount("#app")
})