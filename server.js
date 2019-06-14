const express = require("express");
const connectDB = require("./config/db");
const connectUDP = require("./config/udpServer");
const socket = require("./config/socket");
const evok = require("unipi-evok");

const app = express();

// Connect Database
connectDB();

// Connect to UDP Server
connectUDP();

// Init Middleware
app.use(express.json({ extended: false }));

// Middleware Route Handlers
app.use("/api/entities", require("./routes/api/entities"));
app.use("/api/project", require("./routes/api/project"));

// Middleware Error Handling
app.use(function(err, req, res, next) {
  res.status(422).send({ error: err.message });
});

const port = process.env.PORT || 5000;

const server = app.listen(port, () =>
  console.log(`Server started on port ${port}`)
);

// Setup Socket io connection
const io = socket.init(server);
io.on("connection", socket => {
  console.log("Client connected to Server", socket.id);
});

// Neuron connection
// const neuron = new net.Socket();
// neuron.connect(8080, "192.168.1.234", () => console.log("Neuron connected"));
// const ioNeuron = socket.init(neuron);
// io.on("connection", socket => {
//   console.log("Client connected to Neuron", socket.id);
// });
const unipi = new evok({
  host: "192.168.1.234",
  restPort: 80,
  wsPort: 8080
});

unipi
  .on("connected", () => {
    console.log("Unipi connected");
  })
  .on("message", function(chunk) {
    const circuit = chunk[0].circuit;
    const value = chunk[0].value;
    console.log(`circuit: ${circuit} - value: ${value}`);
  })
  .on("open", () => {
    send({
      cmd: "set",
      dev: "relay",
      circuit: "2_01",
      value: "1"
    });
  })
  .connect();

console.log(unipi.wsUrl()); // ws://192.168.1.234:8080/ws

// unipi.get("/rest/all").then(devices => {
//   console.log("devices:", devices);
// });
