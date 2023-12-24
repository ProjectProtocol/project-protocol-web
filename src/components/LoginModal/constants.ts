export const LOGIN_PAGES = {
  SIGN_IN: 0,
  SIGN_UP: 1,
  FORGOT_PASSWORD: 2,
}

// This should return localised string keys, e.g. `loginModal.signUp.title` once i18n is
// implemented. For now we're hardcoding strings.
export const PAGE_TITLES = [
  {
    title: 'Project Protocol',
    titleHelper: 'Login to your account',
  },
  {
    title: 'Sign up',
    titleHelper: 'Create an account to rate your parole officer',
  },
  {
    title: 'Forgot password',
    titleHelper:
      "Enter the email address you used to register, and we'll send you a password reset link.",
  },
]
