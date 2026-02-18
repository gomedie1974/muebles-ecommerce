const express = require("express");
const mercadopago = require("mercadopago");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

mercadopago.configure({
  access_token: "TU_ACCESS_TOKEN_AQUI"
});

app.post("/create-order", async (req, res) => {
  const { carrito } = req.body;

  const items = carrito.map(prod => ({
    title: prod.nombre,
    unit_price: prod.precio,
    quantity: prod.cantidad,
    currency_id: "ARS"
  }));

  const preference = {
    items,
    back_urls: {
      success: "http://localhost:5500/success.html",
      failure: "http://localhost:5500/failure.html",
      pending: "http://localhost:5500/pending.html"
    },
    auto_return: "approved"
  };

  const response = await mercadopago.preferences.create(preference);
  res.json({ init_point: response.body.init_point });
});

app.listen(3000, () => console.log("Servidor corriendo en puerto 3000"));
