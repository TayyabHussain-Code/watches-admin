import { invokeApi } from "../../utills/InvokeApi";

export const Handlelogin = (data) => {
  const requestObj = {
    path: "/auth/login",
    method: "POST",
    headers: {
      Accept: "application/json",
      "ngrok-skip-browser-warning": "true",
    },
    postData: data,
  };
  return invokeApi(requestObj);
};

export const HandleBrandList = () => {
  const requestObj = {
    path: "/brand/get",
    method: "GET",
    headers: {
      Accept: "application/json",
      "ngrok-skip-browser-warning": "true",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  return invokeApi(requestObj);
};

export const HandleAddBrand = (data) => {
  const requestObj = {
    path: "/brand/add",
    method: "POST",
    headers: {
      Accept: "application/json",
      "ngrok-skip-browser-warning": "true",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    postData: data,
  };
  return invokeApi(requestObj);
};
export const HandleUpdateBrandData = (id, data) => {
  const requestObj = {
    path: `/brand/update/${id}`,
    method: "POST",
    headers: {
      Accept: "application/json",
      "ngrok-skip-browser-warning": "true",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    postData: data,
  };
  return invokeApi(requestObj);
};
export const HandleCateogryList = () => {
  const requestObj = {
    path: "/category/get",
    method: "GET",
    headers: {
      Accept: "application/json",
      "ngrok-skip-browser-warning": "true",
    },
  };
  return invokeApi(requestObj);
};

export const HandleAddCateogry = (data) => {
  const requestObj = {
    path: "/category/add",
    method: "POST",
    headers: {
      Accept: "application/json",
      "ngrok-skip-browser-warning": "true",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    postData: data,
  };
  return invokeApi(requestObj);
};
export const HandleDeleteBrand = (id) => {
  const requestObj = {
    path: `/brand/delete/${id}`,
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "ngrok-skip-browser-warning": "true",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  return invokeApi(requestObj);
};


export const HandleIdData = (id) => {
  const requestObj = {
    path: `/category/get/${id}`,
    method: "GET",
    headers: {
      Accept: "application/json",
      "ngrok-skip-browser-warning": "true",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  return invokeApi(requestObj);
};

export const HandleUpdateData = (id, data) => {
  const requestObj = {
    path: `/category/update/${id}`,
    method: "POST",
    headers: {
      Accept: "application/json",
      "ngrok-skip-browser-warning": "true",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    postData: data,
  };
  return invokeApi(requestObj);
};
export const HandleDeleteCateogray = (id) => {
  const requestObj = {
    path: `/category/delete/${id}`,
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "ngrok-skip-browser-warning": "true",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  return invokeApi(requestObj);
};

export const HandleProductId = (id) => {
  const requestObj = {
    path: `/product/get/${id}`,
    method: "GET",
    headers: {
      Accept: "application/json",
      "ngrok-skip-browser-warning": "true",
    },
  };
  return invokeApi(requestObj);
};

export const HandleProductList = () => {
  const requestObj = {
    path: "/product/get",
    method: "GET",
    headers: {
      Accept: "application/json",
      "ngrok-skip-browser-warning": "true",
    },
  };
  return invokeApi(requestObj);
};
export const HandleDeleteProduct = (id) => {
  const requestObj = {
    path: `/product/delete/${id}`,
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "ngrok-skip-browser-warning": "true",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  return invokeApi(requestObj);
};

export const HandleAddProduct = (submitData) => {
  const requestObj = {
    path: `/product/add`,
    method: "POST",
    headers: {
      Accept: "application/json",
      "ngrok-skip-browser-warning": "true",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "multipart/form-data",
    },
    postData: submitData,
  };
  return invokeApi(requestObj);
};


export const HandleDashboard = () => {
  const requestObj = {
    path: `/dashboard `,
    method: "GET",
    headers: {
      Accept: "application/json",
      "ngrok-skip-browser-warning": "true",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  return invokeApi(requestObj);
};



export const HandleOrders = () => {
  const requestObj = {
    path: `/product/show-checkout-orders`,
    method: "GET",
    headers: {
      Accept: "application/json",
      "ngrok-skip-browser-warning": "true",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  return invokeApi(requestObj);
};




export const HandleProductDataUpdate = (id, UpdatedData) => {
  const requestObj = {
    path: `/product/update/${id}`,
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "ngrok-skip-browser-warning": "true",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    postData: UpdatedData,
  };
  return invokeApi(requestObj);
};


export const HandleOrderStatus = (id, UpdatedData) => {
  const requestObj = {
    path: `/product/change-order-status/${id}`,
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "ngrok-skip-browser-warning": "true",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    postData: { status: UpdatedData },
  };
  return invokeApi(requestObj);
};






