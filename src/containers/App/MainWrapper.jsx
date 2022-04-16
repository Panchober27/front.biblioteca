import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import classNames from 'classnames';
import {
  CustomizerProps,
  ThemeProps,
  RTLProps,
  RoundBordersProps,
  BlocksShadowsProps,
// } from '@/shared/prop-types/ReducerProps';
} from '../../shared/prop-types/ReducerProps';
// import Loading from '@/shared/components/Loading';
import Loading from '../../shared/components/Loading';

const wrapperClass = (customizer) => {
  classNames({
    wrapper: true,
    'top-navigation': customizer.topNavigation,
  });
};

const direction = (location, rtl) =>
  location.pathname === '/' ? 'ltr' : rtl.direction;

const MainWrapper = ({
  theme,
  customizer,
  children,
  rtl,
  roundBorders,
  blocksShadows,
  location,
}) => {
  return (
    <Fragment>
      <div
        className={`${theme.className} 
            ${roundBorders.className}
            ${blocksShadows.className}
            ${direction(location, rtl)}-support`}
        dir={direction(location, rtl)}
      >
        <div className={wrapperClass(customizer)}>{children}</div>
      </div>
    </Fragment>
  );
};

MainWrapper.propTypes = {
  customizer: CustomizerProps.isRequired,
  theme: ThemeProps.isRequired,
  rtl: RTLProps.isRequired,
  roundBorders: RoundBordersProps.isRequired,
  blocksShadows: BlocksShadowsProps.isRequired,
  children: PropTypes.node.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};

const mapStateToProps = (state) => {
  const appConfig =
    state.appConfig && state.appConfig.data && state.appConfig.data.length > 0
      ? [...state.appConfig.data]
      : [];
  return {
    appConfig, // delete if don't use it
    theme: state.theme,
    rtl: state.rtl,
    roundBorders: state.roundBorders,
    blocksShadows: state.blocksShadows,
    customizer: state.customizer,
  };
};

export default withRouter(connect(mapStateToProps)(MainWrapper));
