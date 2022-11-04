import React from 'react'
import styles from './styles.module.scss'

type InputProps = React.InputHTMLAttributes<HTMLInputElement>

export function Input({ ...rest }: InputProps) {
	return <input className={styles.input} {...rest} />
}
