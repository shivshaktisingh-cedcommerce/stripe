let dummy = [
  {id:1 , priceInCents:1000 , name:'Learn React Today' , quantity:3} ,
  {id:2 , priceInCents:2000 , name:'Learn css Today' , quantity:2}
]

const button = document.querySelector("button")
button.addEventListener("click", () => {
  fetch('/create-checkout-session', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      items: [
        { id: 1, quantity: 3 },
        { id: 2, quantity: 1 },
      ],
    }),
  })
    .then(res => {
      if (res.ok) 
      {
        return res.json()
      }
      return res.json().then(json => Promise.reject(json))
    })
    .then(({ url }) => {
      window.location = url
    })
    .catch(e => {
      console.error(e.error)
    })
})
