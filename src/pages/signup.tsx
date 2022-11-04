import React from 'react'
import Head from 'next/head'
import { Button } from '../components/Button'
import { Input } from '../components/Input'
import styles from '../styles/signup.module.scss'
import { AuthContext } from '../context/AuthContext'
import { SSRGuest } from '../utils/SSR/SSRGuest'
import { toast } from 'react-toastify'

export default function SignUp() {
	const [name, setName] = React.useState('')
	const [email, setEmail] = React.useState('')
	const [password, setPassword] = React.useState('')
	const [passwordConfirmation, setPasswordConfirmation] = React.useState('')
	const [loading, setLoading] = React.useState(false)

	const { signUp } = React.useContext(AuthContext)

	async function handleSubmit(event: React.FormEvent) {
		event.preventDefault()

		if (name === '' || email === '' || password === '' || passwordConfirmation === '') {
			toast.warning('All fields are required')

			return
		}

		if (password !== passwordConfirmation) {
			toast.warning('Passwords do not match')
			return
		}

		setLoading(true)

		await signUp({
			name,
			email,
			password
		})

		setLoading(false)
	}

	return (
		<>
			<Head>
				<title>Entrar | Pizza </title>
			</Head>

			<div className={styles.container}>
				<h1>Pizza</h1>
				<h2>Bem vindo de volta!</h2>

				<div className={styles.form}>
					<form onSubmit={handleSubmit}>
						<Input
							placeholder="Nome"
							type="text"
							autoCapitalize="none"
							value={name}
							onChange={name => setName(name.target.value)}
						/>
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
						<Input
							placeholder="Confirme a senha"
							type="password"
							value={passwordConfirmation}
							onChange={passwordConfirmation =>
								setPasswordConfirmation(passwordConfirmation.target.value)
							}
						/>

						<Button type="submit" loading={loading}>
						Entrar
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
