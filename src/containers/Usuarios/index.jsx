import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  InputField,
  AdministrationTable,
  LoadingMessage,
  OkCancelButtons,
  SelectField,
} from '../../components/common';
import {
  Drawer,
  Input,
  Button,
  Tooltip,
  message,
  Switch,
  Row,
  Col,
  Checkbox,
} from 'antd';
import { FiEdit } from 'react-icons/fi';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import {
  getUsers,
  getUserProfiles,
  saveUser,
  updateUser,
  clearUsersList,
} from '../../redux/reducers/usersReducer';
import { validateForm } from '../../utils';

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

  // variable de estado: almacenar verificacion_password para despues validarla con password.
  const [passwordV, setPasswordV] = useState('');

  // variable de estado: Se edita password o no?
  const [editPassword, setEditPassword] = useState(false);

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

  // Hooks de Efecto para cargar usuarios, crear usuario, editar usuario.
  useEffect(() => {
    const MySwal = withReactContent(Swal);
    if (onStartLoadUsers || onStartSaveUser || onStartUpdateUser) {
      MySwal.fire({
        title: onStartSaveUser
          ? 'Creando Usuario'
          : onStartUpdateUser
          ? 'Actualizando Usuario'
          : 'Obteniendo lista de usuarios',
      });

      MySwal.showLoading();
    } else {
      if (MySwal.isVisible) {
        MySwal.close();
      }
    }
  }, [onStartLoadUsers, onStartSaveUser, onStartUpdateUser]);

  // Hooks de Efecto para exito al crear/editar un usuario
  useEffect(() => {
    const MySwal = withReactContent(Swal);
    if (onSuccessSaveUser || onSuccessUpdateUser) {
      MySwal.fire({
        title: onSuccessSaveUser
          ? 'Usuario creado correctamente'
          : onSuccessUpdateUser
          ? 'Usuario actualizado correctamente'
          : '',
        icon: 'success',
        showConfirmButton: true,
        timer: 1500,
      });
      setDrawerVisible(false);
      getUsers();
      MySwal.showLoading();
    } else {
      if (MySwal.isVisible) {
        MySwal.close();
      }
    }
  }, [onSuccessSaveUser, onSuccessUpdateUser]);

  // Hooks de Efecto para error al crear/editar un usuario
  useEffect(() => {
    const MySwal = withReactContent(Swal);
    if (onErrorSaveUser || onErrorUpdateUser) {
      MySwal.fire({
        title: onErrorSaveUser
          ? 'Error al crear usuario'
          : onErrorUpdateUser
          ? 'Error al actualizar usuario'
          : '',
        icon: 'error',
        showConfirmButton: false,
        timer: 1500,
      });
      MySwal.showLoading();
    } else {
      if (MySwal.isVisible) {
        MySwal.close();
      }
    }
  }, [onErrorSaveUser, onErrorUpdateUser]);

  // columnas para la tabla de usuarios.
  const userColumns = [
    {
      title: 'Usuario',
      dataIndex: 'usuario',
      key: 'usuario',
    },
    {
      title: 'Nombres',
      dataIndex: 'fullName',
      key: 'fullName',
    },
    {
      title: 'Email',
      dataIndex: 'usuario_mail',
      key: 'otros',
    },
    {
      title: 'Acciones',
      dataIndex: 'actions',
      width: 140,
      render: (row, record, index) => (
        <div className='administration-actions-container'>
          <Tooltip title='Editar Usuario' placement='right'>
            <FiEdit
              className='edit-icon'
              placement='right'
              style={{ fontSize: '20px', color: '#2B8EFB' }}
              onClick={() => {
                setIsEditing(true);
                setDrawerVisible(true);
                setUserData(record);
                // TODO: añadir toda la logica para editar un usuario.
              }}
            />
          </Tooltip>
          <Tooltip
            placement='right'
            title={
              record.userActive === 1 ? 'Activar Usuario' : 'Desactivar Usuario'
            }
          >
            <Switch
              defaultChecked={record.userActive ? true : false}
              onClick={() => {
                // alert('cambiar estado');
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
      title: 'Crear Nuevo Usuario',
      onClick: () => {
        setUserData({});
        setDrawerVisible(true);
      },
    },
  ];

  // Tipos de usuarios, estos de establecen como enum en la base de datos.
  const userTypeOptions = [
    {
      title: 'ADMINISTRADOR',
      value: 'ADMINISTRADOR',
    },
    {
      title: 'USUARIO',
      value: 'USUARIO',
    },
  ];

  // Funcion que renderiza(muestra el drawer)
  const renderUserDrawer = () => (
    <>
      <Drawer
        title={isEditing ? 'Editar Usuario' : 'Crear Usuario'}
        visible={drawerVisible}
        destroyOnClose
        placement='right'
        width={600}
        onClose={() => {
          setUserData({});
          setDrawerVisible(false);
          setIsEditing(false);
        }}
        onCancelClick={() => {
          setUserData({});
          setDrawerVisible(false);
          setIsEditing(false);
        }}
        footer={
          <OkCancelButtons
            okTitle={isEditing ? 'Guardar' : 'Crear'}
            cancelButtonStyle={{ marginRight: 10 }}
            cancelTitle='Cancelar'
            onCancelClick={() => {
              setUserData({});
              setDrawerVisible(false);
              setIsEditing(false);
            }}
            onOkClick={() => {
              // validar si es edicion o no.
              if (isEditing) {
                // updateUser(userData);
                alert('update');
              } else {
                // primero validar que los datos(campos) obligatorios esten completos.
                const valid = validateForm(
                  [
                    'usuario',
                    'nombre',
                    'apellido',
                    'usuario_mail',
                    'userType',
                    'password',
                  ],
                  userData
                );

                if (!valid) {
                  message.error('Complete todos los campos obligatorios');
                  return;
                }

                if (userData.password !== passwordV) {
                  message.error('Las contraseñas no coinciden');
                  return;
                }

                saveUser(userData);
              }
            }}
          />
        }
        footerStyle={{ display: 'flex', justifyContent: 'flex-end' }}
      >
        <>
          <Row gutter={16}>
            <Col span={12}>
              <InputField
                label='Nombre de Usuario (*)'
                name='usuario'
                defaultValue={isEditing ? userData.usuario : null}
                onChange={(value) => {
                  setUserData({ ...userData, usuario: value });
                }}
              />
            </Col>
            <Col span={12}>
              <InputField
                label='Nombres (*)'
                name='nombre'
                defaultValue={isEditing ? userData.nombre : null}
                onChange={(value) => {
                  setUserData({ ...userData, nombre: value });
                }}
              />
            </Col>

            <Col span={12}>
              <InputField
                label='Apellidos (*)'
                name='apellido'
                defaultValue={isEditing ? userData.apellido : null}
                onChange={(value) => {
                  setUserData({ ...userData, apellido: value });
                }}
              />
            </Col>

            <Col span={12}>
              <InputField
                label='Email (*)'
                name='usuario_mail'
                defaultValue={isEditing ? userData.usuario_mail : null}
                onChange={(value) => {
                  setUserData({ ...userData, usuario_mail: value });
                }}
              />
            </Col>
            <Col span={12}>
              <SelectField
                label='Tipo Usuario (*)'
                name='usertType'
                defaultValue={userData.userType}
                data={userTypeOptions}
                onChange={(value) => {
                  setUserData({ ...userData, userType: value });
                }}
              />
            </Col>

            {!isEditing ? (
              <>
                <Col span={12}>
                  <div className='field-container'>
                    <span>Contraseña (*)</span>
                    <Input.Password
                      name='passwordV'
                      onChange={(e) => {
                        setUserData({ ...userData, password: e.target.value });
                      }}
                    />
                  </div>
                </Col>
                <Col span={12}>
                  <div className='field-container'>
                    <span>Confirme Contraseña (*)</span>
                    <Input.Password
                      name='password'
                      onChange={(e) => {
                        setPasswordV(e.target.value);
                      }}
                    />
                  </div>
                </Col>
              </>
            ) : null}

            {isEditing ? (
              <>
                <Col span={12}>
                  <div className='field-container'>
                    <span style={{ marginRight: 15 }} className='field-label'>
                      Cambiar contraseña?
                    </span>
                    <Checkbox
                      name='password'
                      onChange={(e) => {
                        if (e.target.checked) {
                          setEditPassword(true);
                        } else {
                          setEditPassword(false);
                        }
                      }}
                    />
                  </div>
                </Col>
              </>
            ) : null}
            {editPassword ? (
              <Row
                style={{
                  border: '1px solid #d9d9d9',
                  borderRadius: '5px',
                  padding: '0',
                }}
              >
                <Col span={12}>
                  <div className='field-container'>
                    <span>Contraseña (*)</span>
                    <Input.Password
                      name='passwordV'
                      onChange={(e) => {
                        setPasswordV(e.target.value);
                      }}
                    />
                  </div>
                </Col>
                <Col span={12}>
                  <div className='field-container'>
                    <span>Confirme Contraseña (*)</span>
                    <Input.Password
                      name='password'
                      onChange={(e) => {
                        setUserData({ ...userData, password: e.target.value });
                      }}
                    />
                  </div>
                </Col>
              </Row>
            ) : null}
          </Row>
        </>
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
      console.log('useEffect: usersList', usersList);
    }
  }, [onSuccessLoadUsers]);

  return (
    <>
      <h1>Usuarios</h1>
      <AdministrationTable
        columns={userColumns}
        dataSource={usersList ? [...usersList] : []}
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
  saveUser: (userData) => dispatch(saveUser(userData)),
  // updateUser: (user) => dispatch(updateUser(user)),   REVISAR CON ID
  clearUsersList: () => dispatch(clearUsersList()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Usuarios);
