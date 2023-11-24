/***
*
*   CARD
*   Universal container for grouping UI components together
*
*   PROPS
*   title: title string (optional)
*   loading: boolean to toggle the loading animation (optional)
*   shadow: apply a box shadow
*   center: center align the card
*   noPadding: remove the padding
*   restrictWidth: restrict the width of the card on large screens
*
**********/

import React from 'react';
import { Loader } from '../../Components/lib';
import ClassNames from 'classnames';
import Style from '../../Components/card/card.module.scss';

export function Card(props) {

  const css = ClassNames([

    Style.card,
    props.className,
    props.loading && Style.loading,
    props.shadow && Style.shadow,
    props.center && Style.center,
    props.noPadding && Style.noPadding,
    props.restrictWidth && Style.restrictWidth

  ]);

  return (
    <section className={css}>

      {props.title &&
        <header>
          <h1>{props.title}</h1>
        </header>
      }

      {props.loading ?
        <Loader /> :
        props.children
      }
    </section>
  );
}
