import { AuthenticationError } from "blitz"

interface CoinbaseAccountBalanceType {
  amount: string
  currency: string
}

interface CoinbaseAccountCurrencyType {
  address_regex: string
  asset_id: string
  code: string
  color: string
  exponent: Number
  name: string
  slug: string
  sort_index: Number
  type: string
}

export interface CoinbaseAccountType {
  allow_deposits: Boolean
  allow_withdrawls: Boolean
  balance: CoinbaseAccountBalanceType
  created_at: Date
  currency: CoinbaseAccountCurrencyType
  id: string
  name: string
  primary: Boolean
  resource: string
  resource_path: string
  type: string
  updated_at: Date
}

export interface CoinbaseAccountDataType {
  data: CoinbaseAccountType[]
  pagination: CoinbaseAccountPaginationType
  warning: CoinbaseAccountWarningType
}

interface CoinbaseAccountPaginationType {
  ending_before: string | null
  limit: Number
  next_starting_after: string | null
  next_uri: string | null
  order: string
  previous_ending_before: string | null
  previous_uri: string | null
  starting_after: string | null
}

interface CoinbaseAccountWarningType {
  id: string
  message: string
  url: string
}

export const fetchCoinbaseApi = async ({ method, accessToken, route, body = {} }) => {
  const API_ENDPOINT = `https://api.coinbase.com/v2/${route}`
  const options = {
    // credentials: 'include',
    method: method,
    headers: {
      'Content-Type': 'application/json',
      'CB-VERSION': '2021-02-06',
      Authorization: `Bearer ${accessToken}`,
    },
  }

  if (Object.values(body).length > 0) {
    options['body'] = JSON.stringify(body)
  }

  const res = await fetch(API_ENDPOINT, options)

  if (res.ok) {
    const data = await res.json();
    return Promise.resolve(data);
  } else {
    if (res.status === 401) {
      throw new AuthenticationError()
    }
    return Promise.reject('Error fetching coinbase API')
  }
}

export const refreshTokens = async(refreshToken) => {
  const body = {
    "grant_type": "refresh_token",
    "client_id": process.env.BLITZ_PUBLIC_COINBASE_CLIENT_ID,
    "client_secret": process.env.BLITZ_PUBLIC_COINBASE_CLIENT_SECRET,
    "refresh_token": refreshToken
  }

  try {
    const request = await fetch('https://api.coinbase.com/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    })
    const json = await request.json()

    console.log("New tokens created", json)
    return [json.access_token, json.refresh_token]
  } catch (err) {
    console.log("Failed to create new tokens")
    throw new Error(err)
  }
}