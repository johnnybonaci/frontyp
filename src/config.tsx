const config = {
  snackbar: {
    maxSnack: 3,
  },
  oldSiteDomain: import.meta.env.VITE_OLD_SITE_URL,
  api: {
    platform: 'backoffice',
    baseUrl: import.meta.env.VITE_API_URL,
    msAuth: {
      baseUrl: import.meta.env.VITE_MS_AUTH_API_URL,
    },
  },
}

export default config
