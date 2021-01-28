import React from 'react';
import Button from 'react-bootstrap/Button';
import { BsArrowRepeat } from 'react-icons/bs';
import './LoaderButton.scss';

//@ts-ignore
const LoaderButton = ({isLoading, className = "", disabled = false, ...props}) => (
  <Button
    disabled={disabled || isLoading}
    className={`LoaderButton ${className}`}
    {...props}
  >
    {isLoading && <BsArrowRepeat className="spinning" />}
    {props.children}
  </Button>
)

export default LoaderButton;


