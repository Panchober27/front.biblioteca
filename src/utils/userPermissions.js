/**
 * Determina si usuario contiene el permiso necesario para ingresar a ruta seleccionada
 * @param {string} permission
 * Permiso a buscar
 * @param {object[]} userPermissions
 * Permisos asignados a usuario cuando inicia sesión
 * @return {boolean} Si usuario no contiene permisos necesarios se redirecciona a ruta home
 */
const hasPermission = (permission, userPermissions = null) => {
  let hasPermission = false;

  if (userPermissions) {
    hasPermission = userPermissions.some((e) => e.permiso_tag === permission);
  }

  return hasPermission;
};

export { hasPermission };
