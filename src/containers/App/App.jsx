import React from 'react';
import PropTypes from 'prop-types';
import { connect, Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import '../../scss/app.scss';
import Router from './Router';
import store from './store';
import { LoadingMessage, ErrorMessage } from '../../components/common';
import ScrollToTop from './ScrollToTop';

const ThemeComponent = ({ children, themeName }) => {
  const theme = createMuiTheme({
    palette: {
      type: themeName === 'theme-dark' ? 'dark' : 'light',
    },
  });

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

ThemeComponent.propTypes = {
  children: PropTypes.node.isRequired,
  themeName: PropTypes.string.isRequired,
};

const ConnectedThemeComponent = connect((state) => ({
  themeName: state.theme.className,
}))(ThemeComponent);

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ScrollToTop>
          <ConnectedThemeComponent>
            <LoadingMessage>
              <ErrorMessage>
                <Router />
              </ErrorMessage>
            </LoadingMessage>
          </ConnectedThemeComponent>
        </ScrollToTop>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
