/***
*
*   LOADER
*   Infinite spinning animation for loading states
*
**********/

import React, { useEffect } from 'react';
import ClassNames from 'classnames';
import Center from './images/center.svg';
import Orbit from './images/orbit.svg';
import Style from './loader.module.scss';

export function Loader(props){

  const css = ClassNames([

    Style.loader,
    props.className,

  ]);

  useEffect(() => {

    if (props.fullScreen){

      document.body.classList.add('disableOverflow');
      return () => document.body.classList.remove('disableOverflow')

    }
  }, [props.fullScreen]);

  return (
    <div className={ props.fullScreen ? Style.fullScreen : undefined }>

      <div className={ css }>
        <img src={ Center } className={ Style.center } alt='Orbit Center'/>
        <img src={ Orbit } className={ Style.orbit } alt='Orbit Spinner'/>
      </div>

    </div>
  );
}
