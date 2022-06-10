import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  InputField,
  AdministrationTable,
  LoadingMessage,
} from "../../components/common";
import { Drawer, Button, Tooltip, Menu, Switch } from "antd";
import { FiEdit } from "react-icons/fi";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {
  getUsers,
  getUserProfiles,
  saveUser,
  updateUser,
  clearUsersList,
} from "../../redux/reducers/usersReducer";

const Usuarios = ({
  users,
  profiles,
  getUsers,
  getUserProfiles,
  saveUser,
  updateUser,
  clearUsersList,
}) => {
  // variable de estado para el drawer.
  const [drawerVisible, setDrawerVisible] = useState(false);

  // variable de estado: Es editar o Crear Usuario?
  const [isEditing, setIsEditing] = useState(false);


  // variable de esta: guardar datos en memoria del usuario a crear/editar.
  const [userData, setUserData] = useState({});

  //   Desestrucurando objetos/datos de los redutores de usuario y perfiles.
  const {
    usersList, // aqui vienen los datos: [usuarios]
    onStartLoadUsers,
    onErrorLoadUsers,
    onSuccessLoadUsers,
    onStartSaveUser,
    onErrorSaveUser,
    onSuccessSaveUser,
    onStartUpdateUser,
    onErrorUpdateUser,
    onSuccessUpdateUser,
  } = users;

  //   const {} = profiles;

  // columnas para la tabla de usuarios.
  const userColumns = [
    {
      title: "Usuario",
      dataIndex: "usuario",
      key: "usuario",
    },
    {
      title: "Nombres",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Email",
      dataIndex: "usuario_mail",
      key: "otros",
    },
    {
      title: "Activo",
      dataIndex: "userActive",
      key: "userActive",
    },
    {
      title: "Acciones",
      dataIndex: "actions",
      render: (row, record, index) => (
        <div className="administration-actions-container">
          <Tooltip title="Editar Usuario" placement="right">
            <FiEdit
              className="edit-icon"
              placement="right"
              style={{ fontSize: "20px", color: "#2B8EFB" }}
              onClick={() => {
                setIsEditing(true);
                setDrawerVisible(true);
                // TODO: añadir toda la logica para editar un usuario.
              }}
            />
          </Tooltip>
          <Tooltip
            placement="right"
            title={
              record.userActive === true
                ? "Desactivar Usuario"
                : "Activar Usuario"
            }
          >
            <Switch
              defaultChecked={record.userActive === true ? true : false}
              onClick={() => {
                alert("cambiar estado");
              }}
            />
          </Tooltip>
        </div>
      ),
    },
  ];

  // Opciones para la tabla, botones, titulos, etc...
  const userTableOptions = [
    {
      title: "Crear Nuevo Usuario",
      onClick: () => {
        console.log("Usuario");
        setDrawerVisible(true);
      },
    },
  ];

  // Funcion que renderiza(muestra el drawer)
  const renderUserDrawer = () => (
    <>
      <Drawer
        title={isEditing ? "Editar Usuario" : "Crear Usuario"}
        placement="right"
        closeOnClick={false}
        onClose={() => setDrawerVisible(false)}
        visible={drawerVisible}
        width={500}
      >
        <p>Contenido del Drawer</p>
      </Drawer>
    </>
  );

  //   hook de Efecto inicial, reemplaza al componentDidMount de React con Clases :)
  useEffect(() => {
    getUsers();
    // getUserProfiles();
  }, []);

  useEffect(() => {
    if (onSuccessLoadUsers) {
      console.log("useEffect: usersList", usersList);
    }
  }, [onSuccessLoadUsers]);

  return (
    <>
      <h1>Usuarios</h1>
      <AdministrationTable
        columns={userColumns}
        dataSource={usersList ? usersList : []}
        options={userTableOptions}
        pagination={false}
      />
      {renderUserDrawer()}
    </>
  );
};

const mapStateToProps = ({ users, profiles }) => ({
  users,
  profiles,
});

const mapDispatchToProps = (dispatch) => ({
  getUsers: () => dispatch(getUsers()),
  getUserProfiles: () => dispatch(getUserProfiles()),
  saveUser: (user) => dispatch(saveUser(user)),
  // updateUser: (user) => dispatch(updateUser(user)),   REVISAR CON ID
  clearUsersList: () => dispatch(clearUsersList()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Usuarios);
