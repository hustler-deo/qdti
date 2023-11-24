/***
*
*   BUTTON
*   Can be a standard button, icon button or with loading animation
*
*   PROPS
*   text: button label
*   action: callback function executed on click
*   params: object passed to the callback function (optional)
*   color: red/blue (default: green)
*   icon: icon image (optional)
*   iconPack: icon pack to use
*   iconSize: icon size
*   iconButton: true or false
*   alignIcon: left or right
*   small: render a smaller button
*   textOnly: text only
*   outline: outline button
*   rounded: round the corners
*   className: pass a custom class object
*   fullWidth: extend to full width of parent container
*   loading: boolean to toggle loading animation (optional)
*
**********/

import React, { Fragment } from 'react';
import ClassNames from 'classnames';
import { Icon, History } from '../lib';
import Style from './button.module.scss';

export function Button(props) {

  const isLoader = props.hasOwnProperty('loading');

  const btnCss = ClassNames([

    props.className,
    props.color && Style[props.color],
    props.small && Style.small,
    props.big && Style.big,
    props.textOnly && Style.text,
    props.outline && Style.outline,
    props.rounded && Style.rounded,
    props.fillIcon && Style.fillIcon,
    props.fullWidth && Style.fullWidth,
    props.icon && props.text && Style.iconText,
    props.icon && !props.text && Style.icon,
    props.iconButton && Style.btn,
    props.alignIcon === 'right' && Style.alignIconRight,
    props.alignIcon === 'left' && Style.alignIconLeft,
    !props.textOnly && !props.icon && Style.btn

  ]);

  const loaderCss = ClassNames([

    'btnLoader',
    Style.loader,
    props.loading && Style.loading,
    props.fullWidth && Style.fullWidth

  ]);

  const button =
    <button
      title={props.title}
      className={btnCss}
      onClick={e => {

        e.preventDefault();
        e.stopPropagation();

        props.action && props.action(props.params);
        props.goto && History.push(props.goto);
        if (props.url) window.location = props.url;

      }}>

      {props.icon ?

        <Fragment>
          <Icon
            image={props.icon}
            pack={props.iconPack}
            color={props.iconColor || props.color}
            size={props.iconSize || props.size}
          />
          {props.text && props.text}
        </Fragment>

        : props.text

      }
    </button>

  return (
    <Fragment>
      {isLoader ?
        <div className={loaderCss}>
          {button}
        </div>
        : button
      }
    </Fragment>
  )
}
