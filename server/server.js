const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const path = require("path");
const swaggerSpec = YAML.load(path.join(__dirname, "./build/swagger.yaml"));

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const localhost = "127.0.0.1";

const mongoose = require("mongoose");
const User = require("./models/user.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const jwtSecret = "1q2w3e4r!";

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

require("dotenv").config();
const DB_URL_TEST = process.env.DB_URL_TEST;

mongoose
  .connect(DB_URL_TEST)
  .then(() => {
    console.log("MongoDB에 연결되었습니다.");
  })
  .catch((error) => {
    console.error("MongoDB 연결 에러:", error);
  });

app.post(`/signUp`, async (req, res) => {
  const {
    ID,
    password,
    name,
    eMail,
    phoneNumber,
    companyDepartment,
    position,
  } = req.body;

  try {
    const userDoc = await User.create({
      ID,
      name,
      eMail,
      password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
      phoneNumber,
      companyDepartment,
      position,
    });

    console.log(userDoc);
    res.json(true);
  } catch (e) {
    res.status(422).json(e);
  }
});

app.post(`/login`, async (req, res) => {
  const { ID, password } = req.body;
  console.log(ID, password);

  const userDoc = await User.findOne({ ID });

  if (!userDoc) {
    return res.json(false);
  }

  const passOk = bcrypt.compareSync(password, userDoc.password);

  if (passOk) {
    jwt.sign(
      { id: userDoc._id, name: userDoc.name },
      jwtSecret,
      { expiresIn: "1d" },
      (err, token) => {
        if (err) throw err;

        // 토큰을 쿠키에 저장하고 사용자 정보를 JSON 형태로 응답
        res.cookie("token", token, {
          sameSite: "none",
          secure: true,
          httpOnly: true,
        });

        console.log("Cookie set:", token);
        res.json(userDoc);
      }
    );
  } else {
    res.status(422).json("pass not ok");
  }
});

app.post(`/profile`, (req, res) => {
  const { token } = req.cookies;

  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, decoded) => {
      if (err) {
        res.json(false);
      } else {
        const userData = await User.findById(decoded.id);
        res.json(userData);
      }
    });
  } else {
    res.json(false);
  }
});

const PORT = 4000 || process.env.PORT;
app.listen(PORT, localhost, () => {
  console.log(`${localhost} ${PORT} 연결 완료`);
});
