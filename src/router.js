import Vue from 'vue'
import Router from 'vue-router'
import StartPage from './views/StartPage'
import Results from './views/Results'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'start-page',
            component: StartPage
        },
        {
            path: '/results',
            name: 'results',
            component: Results,
            props: {
                requestID: Number,
                apiKey: String
            }
        }
    ]
})
