import { useState } from 'react'
import React from 'react'
import { axios } from '../config/axios'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function PaymentForm() {
  const [amount, setAmount] = useState('')
  const [phone, setPhone] = useState('')
  const [active, setActive] = useState('mpesa')
  const [submitting, setSubmitting] = useState(false)

  const onDonate = async (e) => {
    e.preventDefault()
    if (!amount || Number(amount) <= 0 || !phone) {
      alert('Please enter a valid amount and phone number')
      return
    }

    try {
      setSubmitting(true)
      const res = await axios.post('/api/payments/stkpush', {
        amount: amount,
        phoneNumber: phone,
        accountReference: 'DONATION',
        transactionDesc: 'Donation payment'
      })

      const json = res.data
      if (!json.success) {
        throw new Error(json.message || 'STK Push failed')
      }

      alert('STK Push initiated. Check your phone to complete payment.')
    } catch (err) {
      console.error(err)
      alert('Failed to initiate STK Push')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-start justify-center">
      <div className="mt-16 w-full max-w-md">
        <div className="bg-white shadow rounded-2xl p-6">
          <div className="flex gap-3 mb-4">
            {['mpesa','paypal','card'].map(tab => (
              <button
                key={tab}
                onClick={() => setActive(tab)}
                className={classNames(
                  'px-4 py-1 rounded-full text-sm capitalize',
                  active === tab ? 'bg-mpesa-green text-white' : 'bg-gray-100 text-gray-700'
                )}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex items-start gap-4 mb-4">
            <div className="flex-1">
              <h3 className="font-semibold">Enter Amount & Number</h3>
            </div>
          </div>

          <form className="space-y-4" onSubmit={onDonate}>
            <div>
              <label className="block text-sm font-semibold mb-1">Amount</label>
              <input
                type="number"
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-mpesa-green"
                placeholder="Enter Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Phone Number</label>
              <input
                type="tel"
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-mpesa-green"
                placeholder="Enter Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <button
              type="submit"
              // disabled={submitting}
              className="bg-mpesa-green hover:bg-mpesa-dark disabled:opacity-60 text-white font-semibold rounded-md px-4 py-2"
            >
              {submitting ? 'Processing…' : 'Donate'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

