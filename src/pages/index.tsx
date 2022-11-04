/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-html-link-for-pages */

import Head from 'next/head'
import React from 'react'
import { Button } from '../components/Button'
import { Input } from '../components/Input'
import { AuthContext } from '../context/AuthContext'
import styles from '../styles/home.module.scss'
import { SSRGuest } from '../utils/SSR/SSRGuest'
import { toast } from 'react-toastify'

export default function Home() {
	const { signIn } = React.useContext(AuthContext)

	const [email, setEmail] = React.useState('')
	const [password, setPassword] = React.useState('')
	const [loading, setLoading] = React.useState(false)

	const handleSignIn = async (event: React.FormEvent) => {
		event.preventDefault()

		if (email === '' || password === '') {
			toast.warning('Email and password are required')
			return
		}

		setLoading(true)

		await signIn({ email, password })

		setLoading(false)
	}

	return (
		<>
			<Head>
				<title>Entrar | Pizza</title>
			</Head>

			<div className={styles.container}>
				<h1>Pizza</h1>
				<h2>Bem vindo de volta!</h2>

				<div className={styles.form}>
					<form onSubmit={handleSignIn}>
						<Input
							placeholder="E-mail"
							type="text"
							autoCapitalize="none"
							value={email}
							onChange={email => setEmail(email.target.value)}
						/>
						<Input
							placeholder="Senha"
							type="password"
							value={password}
							onChange={password => setPassword(password.target.value)}
						/>

						<Button type="submit" loading={loading}>
							Entrar
						</Button>
					</form>
				</div>

				<div className={styles.footer}>
					<p>
					Não tem uma conta? <a href="/signup">Inscrever-se</a>
					</p>

					<p>
					Esqueceu sua senha? <a href="/forgotpassword">Redefinir</a>
					</p>
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
