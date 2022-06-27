import React, { useEffect, useState } from "react";
type dataFormate = { userId: number; id: number; title: string; body: string };
const api = {
  valueGet: function () {
    return fetch("http://localhost:4002/post");
  },

  valuePost: async (userValue) => {
    return fetch("http://localhost:4002/post", {
      method: "POST",
      body: JSON.stringify({
        title: userValue.title,
        body: userValue.body,
        userId: userValue.userId,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    // .then((response) => {
    //   return response.json();
    // })
    // .then((value) => {
    //   return value;
    // });
  },

  valuePut: function (id, userValue) {
    return fetch(`http://localhost:4002/post/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        title: userValue.title,
        body: userValue.body,
        userId: userValue.userId,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    // .then((response) => {
    //   return response.json();
    // })
    // .then((value) => {
    //   return value;
    // });
  },

  valueDelete: function (id) {
    return fetch(`http://localhost:4002/post/${id}`, {
      method: "DELETE",
    });
    // .then((response) => {
    //   if (response.ok == true) return response.json();
    //   else return "Api is not working";
    // })
    // .then((value) => {
    //   return value;
    // });
  },
};

export default api;
