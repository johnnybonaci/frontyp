import React from 'react'

interface MercadoPagoProduct {
  title: string
  quantity: number
  currency_id: string
  unit_price: number
}

interface MercadoPagoPaymentButtonProps {
  products: MercadoPagoProduct[]
}

const MercadoPagoPaymentButton: React.FC<MercadoPagoPaymentButtonProps> = ({ products }) => {
  const handlePayment = async () => {
    try {
      const response = await fetch('https://api.mercadopago.com/checkout/preferences', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${'TEST-2535948870024168-092617-6b16f594bebe55c2cfb6a6c4293e6f08-442201340'}`,
        },
        body: JSON.stringify({
          items: products,
          back_urls: {
            success: 'https://www.yoursite.com/success',
            failure: 'https://www.yoursite.com/failure',
            pending: 'https://www.yoursite.com/pending',
          },
          auto_return: 'approved',
        }),
      })

      const data = await response.json()
      console.log(data)
      // window.location.href = data.init_point
    } catch (error) {
      console.error('Error al generar el link de pago:', error)
    }
  }

  return <button onClick={handlePayment}>Pagar con MercadoPago</button>
}

export default MercadoPagoPaymentButton
