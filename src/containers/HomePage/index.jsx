import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Calendario from './Calendario';
import 'antd/dist/antd.css';
import { Button, Carousel, Row, Col, Tooltip, Modal } from 'antd';
// importar moment para trabajar con fechas
import moment from 'moment';

import foto from '../../shared/img/fondoBiblioteca.png';
import foto1 from '../../shared/img/fondoBiblioteca1.png';
import foto2 from '../../shared/img/libro.jpg';

import { getUploads } from '../../redux/reducers/uploadsReducer';
import swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useHistory } from 'react-router-dom';
import { VscPreview } from 'react-icons/vsc';
import { AiOutlineFileDone } from 'react-icons/ai';
import InfiniteScroll from 'react-infinite-scroll-component';

const HomePage = () => {
  // Desestructurando objetos desde reducers.
  // Quizas mejor no desestructurar, y atacar directamente las propiedades del objeto.
  // const {} = prestamos;

  const MySwal = withReactContent(swal);
  const history = useHistory();

  // const contentStyle = {
  //   height: '160px',
  //   color: '#fff',
  //   lineHeight: '160px',
  //   textAlign: 'center',
  //   background: '#364d79',
  // };

  return (
    <>
      {/* <h1>HomePage</h1> */}

      <div align='center' style={{ display: 'block', width: '100%' }}>
        <>
          <Carousel
            className='carusel'
            autoplay
            autoplaySpeed={1500}
            style={{ width: '75%', borderRadius: '20px' }}
          >
            <div style={{ width: '100%' }}>
              <span
                style={{ 
                  fontSize: '50px',
                  color: 'lightblue',
                  fontWeight: 'bold',
                }}
              >Todo Sobre Futuras Características</span>
              <img src={foto} style={{ borderRadius: '20px' }} />
            </div>
            <div>
            <span
                style={{ 
                  fontSize: '50px',
                  color: 'lightblue',
                  fontWeight: 'bold',
                }}
              >Mayor y mejor gestión</span>
              <img src={foto1} style={{ borderRadius: '20px' }} />
            </div>
          </Carousel>
        </>
      </div>

      <div className='container'>
        <div className='row'>
          <div className='col-4'>
            <div
              style={{
                background: '#373B44' ,
                background:
                  '-webkit-linear-gradient(to right, #4286f4, #373B44)',
                background:
                  'linear-gradient(to right, #4286f4, #373B44)',
              }}
            ></div>

            <div
              className='card'
              style={{
                background: '#2980B9' ,
                background:
                  '-webkit-linear-gradient(to right, #FFFFFF, #6DD5FA, #2980B9)',
                background:
                  'linear-gradient(to right, #FFFFFF, #6DD5FA, #2980B9)',
              }}
            >
              <div
                className='card-body'
                style={{
                  background: '#2980B9' ,
                  background:
                    '-webkit-linear-gradient(to right, #FFFFFF, #6DD5FA, #2980B9)',
                  background:
                    'linear-gradient(to right, #FFFFFF, #6DD5FA, #2980B9)',
                }}
              >
                {/* <h5 className='card-title'>Titulo</h5> */}
                <Button
                  shape='round'
                  type='primary'
                  onClick={() => history.push('cePrestamo')}
                >
                  GENERAR PRÉSTAMO!
                </Button>
              </div>
            </div>
          </div>
          <div className='col-4'>
            <div
              className='card'
              style={{
                background: '#2980B9' ,
                background:
                  '-webkit-linear-gradient(to right, #FFFFFF, #6DD5FA, #2980B9)',
                background:
                  'linear-gradient(to right, #FFFFFF, #6DD5FA, #2980B9)',
              }}
            >
              <div
                className='card-body'
                style={{
                  background: '#2980B9',
                  background:
                    '-webkit-linear-gradient(to right, #FFFFFF, #6DD5FA, #2980B9)',
                  background:
                    'linear-gradient(to right, #FFFFFF, #6DD5FA, #2980B9)',
                }}
              >
                {/* <h5 className='card-title'>Titulo</h5> */}
                <Button
                  shape='round'
                  type='primary'
                  onClick={() => history.push('/rankings')}
                >
                  Ver Rankings
                </Button>
              </div>
            </div>
          </div>
          <div className='col-4'>
            <div
              className='card'
              style={{
                background: '#2980B9' ,
                background:
                  '-webkit-linear-gradient(to right, #FFFFFF, #6DD5FA, #2980B9)',
                background:
                  'linear-gradient(to right, #FFFFFF, #6DD5FA, #2980B9)',
              }}
            >
              <div
                className='card-body'
                style={{
                  background: '#2980B9' ,
                  background:
                    '-webkit-linear-gradient(to right, #FFFFFF, #6DD5FA, #2980B9)',
                  background:
                    'linear-gradient(to right, #FFFFFF, #6DD5FA, #2980B9)',
                }}
              >
                {/* <h5 className='card-title'>Titulo</h5> */}
                <Button
                  shape='round'
                  type='primary'
                  onClick={() => history.push('/prestamos')}
                >
                  REALIZAR DEVOLUCIÓN
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = ({ uploads }) => ({
  uploads,
});

const mapDispatchToProps = (dispatch) => ({
  getUploads: () => dispatch(getUploads()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
