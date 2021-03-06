import $axios from '../api.js'
import lib from "../lib/lib";

const state = () => ({
    data_users: []
})

const mutations = {
    ASSIGN_DATA_USERS(state, payload) {
        state.data_users = payload
    },
}

const actions = {
    getUser({ commit }, payload) {
        let page = payload && payload.page
        let search = payload && payload.search
        let type = payload && payload.type
        let pages = !page ? '' : `&page=${page}`
        let searchTerm = !search ? '' : `&search=${search}`
        let types = !type ? '' : `&type=${type}`
        return new Promise((resolve) => {
            $axios.get(`/users?${pages}${searchTerm}${types}`, lib.getConfig())
                .then((response) => {
                    commit('ASSIGN_DATA_USERS', response.data.data)
                    resolve(response.data.data)
                })
        })
    },

    createUser({ dispatch }, payload) {
        return new Promise((resolve) => {
            $axios.post(`/users`, payload, lib.getConfig())
                .then((response) => {
                    resolve(response.data)
                })
        })
    },

    getUserByID({ commit }, params) {
        return new Promise((resolve) => {
            $axios.get(`/users/${params}`, lib.getConfig())
                .then((response) => {
                    resolve(response.data.data)
                })
        })
    },

    updateUser({ dispatch }, params) {
        return new Promise((resolve) => {
            $axios.put(`/users/${params.id}`, params, lib.getConfig())
                .then((response) => {
                    resolve(response.data)
                })
        })
    },

    removeUser({ dispatch }, params) {
        return new Promise((resolve) => {
            $axios.delete(`/users/${params}`, lib.getConfig())
                .then((response) => {
                    resolve(response.data)
                })
        })
    },
}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}