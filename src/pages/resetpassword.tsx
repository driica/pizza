import React from 'react'
import Head from 'next/head'
import { Button } from '../components/Button'
import { Input } from '../components/Input'
import styles from '../styles/resetpassword.module.scss'
import { AuthContext } from '../context/AuthContext'
import { SSRGuest } from '../utils/SSR/SSRGuest'
import { toast } from 'react-toastify'

export default function ResetPassword() {
	const [password, setPassword] = React.useState('')
	const [passwordConfirmation, setPasswordConfirmation] = React.useState('')
	const [loading, setLoading] = React.useState(false)

	const { resetPassword } = React.useContext(AuthContext)

	const handleResetPassword = async (event: React.FormEvent) => {
		event.preventDefault()

		if (password === '' || passwordConfirmation === '') {
			toast.warning('Password and password confirmation are required')
			return
		}

		if (password !== passwordConfirmation) {
			toast.warning('Password and confirm password must be the same')
			return
		}

		setLoading(true)

		await resetPassword({ password })

		setLoading(false)
	}

	return (
		<>
			<Head>
				<title>Reset Password | Pizza Hub</title>
			</Head>

			<div className={styles.container}>
				<h1>Pizza Hub</h1>
				<h2>Reset Password!</h2>

				<div className={styles.form}>
					<form onSubmit={handleResetPassword}>
						<Input
							placeholder="Password"
							type="password"
							value={password}
							onChange={password => setPassword(password.target.value)}
						/>

						<Input
							placeholder="Password Confirmation"
							type="password"
							value={passwordConfirmation}
							onChange={passwordConfirmation =>
								setPasswordConfirmation(passwordConfirmation.target.value)
							}
						/>

						<Button type="submit" loading={loading}>
							Check Password
						</Button>
					</form>
				</div>

				<p>Pizza Hub © 2022</p>
			</div>
		</>
	)
}

export const getServerSideProps = SSRGuest(async ctx => {
	return {
		props: {}
	}
})
