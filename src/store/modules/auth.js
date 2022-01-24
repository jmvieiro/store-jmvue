import axios from "axios";

export const namespaced = true;

export const state = {
  user: {},
  errorLogin: "",
  errorRegister: "",
};
export const mutations = {
  REGISTER(state, payload) {
    state.user = [{ ...payload }];
  },
  ERROR_REGISTER(state, payload) {
    state.errorRegister = payload;
  },
  LOGIN(state, payload) {
    state.user = payload;
  },
  LOGOUT(state) {
    state.user = {};
  },
  ERROR_LOGIN(state, payload) {
    state.errorLogin = payload;
  },
};
export const actions = {
  register(context, payload) {
    if (payload.password != payload.password2)
      context.commit("ERROR_REGISTER", "Las contraseñas no coinciden.");
    else {
      axios
        .post(
          "https://61ba1ffb48df2f0017e5a919.mockapi.io/api/v1/users",
          payload
        )
        .then((res) => {
          context.commit("REGISTER", res.data);
        })
        .catch((res) => {
          console.log(`Ha ocurrido un error al registrar al usuario ${res}`);
        });
    }
  },
  login(context, payload) {
    axios
      .get(
        `https://61ba1ffb48df2f0017e5a919.mockapi.io/api/v1/users?email=${payload.email}&password=${payload.password}`
      )
      .then((res) => {
        if (res.data.length === 1 && res.data[0].password === payload.password)
          context.commit("LOGIN", res.data);
        else context.commit("ERROR_LOGIN", "Usuario o contraseña incorrecta.");
      })
      .catch((res) => {
        console.log(`Ha ocurrido un error al loguar al usuario: ${res}`);
      });
  },
  logout(context) {
    context.commit("LOGOUT");
  },
};
export const getters = {
  user: (state) => state.user,
  errorLogin: (state) => state.errorLogin,
  errorRegister: (state) => state.errorRegister,
};
