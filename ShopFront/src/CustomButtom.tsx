import React, { Component } from 'react';
import styles from './Styles/Button.module.scss'; // Import css modules stylesheet as styles
import './Styles/another-stylesheet.scss'; // Import regular stylesheet
const CustomButton = () => {
        return <button className={styles.error}>Error Button</button>;
}
export default CustomButton