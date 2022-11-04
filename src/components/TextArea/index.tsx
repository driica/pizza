import React from 'react'
import styles from './styles.module.scss'

type TextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>

export function TextArea({ ...rest }: TextAreaProps) {
	return <textarea className={styles.input} {...rest}></textarea>
}
