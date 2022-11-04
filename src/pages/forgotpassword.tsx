import React from 'react'
import Head from 'next/head'
import { Button } from '../components/Button'
import { Input } from '../components/Input'
import styles from '../styles/forgotpassword.module.scss'
import { AuthContext } from '../context/AuthContext'
import { SSRGuest } from '../utils/SSR/SSRGuest'
import { toast } from 'react-toastify'

export default function ForgotPassword() {
	const [email, setEmail] = React.useState('')
	const [loading, setLoading] = React.useState(false)

	const { forgotPassword } = React.useContext(AuthContext)

	const handleForgotPassword = async (event: React.FormEvent) => {
		event.preventDefault()

		if (email === '') {
			toast.warning('Email is required')
			return
		}

		setLoading(true)

		await forgotPassword({ email })

		setLoading(false)
	}

	return (
		<>
			<Head>
				<title>Esqueci a senha | Pizza</title>
			</Head>

			<div className={styles.container}>
				<h1>Pizza</h1>
				<h2>Esqueci a senha</h2>

				<div className={styles.form}>
					<form onSubmit={handleForgotPassword}>
						<Input
							placeholder="E-mail"
							type="text"
							autoCapitalize="none"
							value={email}
							onChange={email => setEmail(email.target.value)}
						/>

						<Button type="submit" loading={loading}>
						Verificar email
						</Button>
					</form>
				</div>

				<p>Pizza © 2022</p>
			</div>
		</>
	)
}

export const getServerSideProps = SSRGuest(async ctx => {
	return {
		props: {}
	}
})
