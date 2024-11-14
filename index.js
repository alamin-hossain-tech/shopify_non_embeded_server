import express from "express";
import cors from "cors";

const app = express();
const port = process.env.PORT || 4000;

// middleware
app.use(cors());
app.use(express.json());

app.get("/app", (req, res) => {
  const { shop } = req.query;

  res.redirect(
    "https://kieslectshop.myshopify.com/admin/oauth/authorize?client_id=cecc73d18b2fecccd2682b3d16afb66d&scope=write_products,read_shipping&redirect_uri=http://localhost:4000/redirect"
  );
});

app.get("/redirect", (req, res) => {
  const { code, shop } = req.query;
  fetch(
    `https://${shop}/admin/oauth/access_token?client_id=cecc73d18b2fecccd2682b3d16afb66d&client_secret=1381be733a10f64a5c0e9494f8f8f773&code=${code}`,
    { method: "POST", headers: { "Content-Type": "application/json" } }
  )
    .then((res) => res.json())
    .then((data) => {
      // this data provide like this
      // {
      //     access_token: 'shpua_db030e6a18904d7989acfa2a2cb1f1d1',
      //     scope: 'write_products,read_shipping'
      //   }
      res.redirect("https://banking-dashboard-gray.vercel.app/");
    });
});

app.get("/", (req, res) => {
  res.send(`Server Running on port:${port} `);
});

app.listen(port, () => {
  console.log("server running port:", port);
});
