import React from 'react'
import { destroyCookie, setCookie, parseCookies } from 'nookies'
import Router from 'next/router'
import { api } from '../services/api'
import { toast } from 'react-toastify'

type AuthContextData = {
	user: UserProps
	isAuthenticated: boolean
	signIn: (credentials: SignInProps) => Promise<void>
	signUp: (credentials: SignUpProps) => Promise<void>
	forgotPassword: (credentials: ForgotPasswordProps) => Promise<void>
	resetPassword: (credentials: ResetPasswordProps) => Promise<void>
	signOut: () => void
}

type UserProps = {
	id: string
	name: string
	email: string
}

type SignInProps = {
	email: string
	password: string
}

type SignUpProps = {
	name: string
	email: string
	password: string
}

type ForgotPasswordProps = {
	email: string
}

type ResetPasswordProps = {
	password: string
}

type AuthProviderProps = {
	children: React.ReactNode
}

export const AuthContext = React.createContext({} as AuthContextData)

export function signOut() {
	destroyCookie(undefined, '@pizzaHub:token')

	if (typeof window !== 'undefined') {
		Router.push('/')
	}
}

export function AuthProvider({ children }: AuthProviderProps) {
	const [user, setUser] = React.useState<UserProps>({
		id: '',
		name: '',
		email: ''
	} as UserProps)

	const isAuthenticated = !!user

	const signIn = async ({ email, password }: SignInProps): Promise<void> => {
		try {
			const { data } = await api.post('/signin', {
				email,
				password
			})

			setCookie(undefined, '@pizzaHub:token', data.token, {
				maxAge: 60 * 60 * 1 // 1 hour
			})

			setUser({
				id: data.users.id,
				name: data.users.name,
				email: data.users.email
			})

			api.defaults.headers['Authorization'] = `Bearer ${data.token}`

			setCookie(undefined, '@pizzaHub:token', data.token, {
				maxAge: 60 * 60 * 24,
				path: '/'
			})

			Router.push('/dashboard')
		} catch (err) {
			toast.error('Email or password incorrect')
			console.log(err)
		}
	}

	const signUp = async ({ name, email, password }: SignUpProps): Promise<void> => {
		try {
			await api.post('/signup', {
				name,
				email,
				password,
				password_confirmation: password
			})

			toast.success('Account created successfully')

			Router.push('/')
		} catch (err) {
			toast.error('Email already in use')
			console.log(err)
		}
	}

	const forgotPassword = async ({ email }: ForgotPasswordProps): Promise<void> => {
		try {
			const { data } = await api.post('/forgotpassword', {
				email
			})

			setCookie(undefined, '@pizzaHub:tokenResetPassword', data.token, {
				maxAge: 60 * 60 * 2,
				path: '/resetpassword'
			})
		} catch (err) {
			toast.error('Email not found')
			console.log(err)
		}
	}

	const resetPassword = async ({ password }: ResetPasswordProps): Promise<void> => {
		const { '@pizzaHub:tokenResetPassword': tokenResetPassword } = parseCookies()

		try {
			await api.post('/resetpassword', {
				password,
				token: tokenResetPassword
			})

			toast.success('Passwords changed successfully')

			Router.push('/')

			destroyCookie(undefined, '@pizzaHub:tokenResetPassword')
		} catch (err) {
			console.log(err)
		}
	}

	return (
		<AuthContext.Provider
			value={{ user, isAuthenticated, signIn, signOut, signUp, forgotPassword, resetPassword }}
		>
			{children}
		</AuthContext.Provider>
	)
}
