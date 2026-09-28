export const AuthEndpoints = {
  login: 'auth/login',
  register: 'auth/register',
  refreshToken: 'auth/refreshtoken',
  logout: 'auth/logout'
};

export const CartEndPoints = {
  getAll: 'cart/getallcarts',
  getById: 'cart/getcartbyid',
  create: 'cart/createcart',
  update: 'cart/updatecart',
  delete: 'cart/deletecart',
  addItem: 'cart/additemtocart',
  removeItem: 'cart/removeitemfromcart',
}

export const BrandEndPoints = {
  getAll: 'brand/getallbrands',
  getById: 'brand/getbrandbyid',
  create: 'brand/createbrand',
  update: 'brand/updatebrand',
  delete: 'brand/deletebrand'
}

export const CategoryEndPoints = {
  getAll: 'category/getallcategorys',
  getById: 'category/getcategorybyid',
  create: 'category/createcategory',
  update: 'category/updatecategory',
  delete: 'category/deletecategory'
}

export const OrderEndPoints = {
  getAll: 'order/getallorders',
  getById: 'order/getorderbyid',
  create: 'order/createorder',
  update: 'order/updateorder',
  delete: 'order/deleteorder',
  addItem: 'order/additemtoorder',
  removeItem: 'order/removeitemfromorder',
}

export const ProductEndPoints = {
  getAll: 'product/getallproducts',
  getById: 'product/getproductbyid',
  create: 'product/createproduct',
  update: 'product/updateproduct',
  delete: 'product/deleteproduct'
}

export const ProductVariantEndPoints = {
  getAll: 'productvariant/getallproductvariants',
  getById: 'productvariant/getproductvariantbyid',
  create: 'productvariant/createproductvariant',
  update: 'productvariant/updateproductvariant',
  delete: 'productvariant/deleteproductvariant',
}

export const RoleEndPoints = {
  getAll: 'role/getallroles',
  getById: 'role/getrolebyid',
  create: 'role/createrole',
  update: 'role/updaterole',
  delete: 'role/deleterole'
}

export const UserEndPoints = {
  getAll: 'user/getallusers',
  getById: 'user/getuserbyid',
  create: 'user/createuser',
  update: 'user/updateuser',
  delete: 'user/deleteuser'
}