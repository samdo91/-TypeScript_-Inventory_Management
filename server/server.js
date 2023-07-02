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
const Product = require("./models/product.js");
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

// 회원가입
app.post(`/signUp`, async (req, res) => {
  const {
    ID,
    password,
    name,
    eMail,
    phoneNumber,
    companyDepartment,
    position,
    note,
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
      note,
    });

    console.log(userDoc);
    res.json(true);
  } catch (e) {
    res.status(422).json(e);
  }
});

// 로그인
app.post(`/login`, async (req, res) => {
  const { ID, password } = req.body;
  console.log(ID, password);

  const userDoc = await User.findOne({ ID });

  console.log("userDoc", userDoc);
  if (userDoc === null) {
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

// 페이지 로그인 후 만들어진 토큰으로 다시 회원 가입
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

//토큰의 유무를 검사하는 함수
function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, jwtSecret);
    return true;
  } catch (err) {
    return false;
  }
}

// 로그아웃
app.post(`/logout`, (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  const { token } = req.cookies;
  const tokens = verifyToken(token);
  if (tokens) {
    jwt.sign({}, jwtSecret, { expiresIn: "1s" }, (err, token) => {
      if (err) throw err;

      res
        .cookie(`token`, token, { sameSite: "none", secure: true })
        .json("logoutSuccess");
    });
  }
});
// 프로덕트 추가
app.post(`/addProduct`, async (req, res) => {
  const {
    productName,
    wholesalePrice,
    retailPrice,
    firstStock,
    date,
    warehouseManager,
    receivingEventList,
    shippingEventList,
    totalAmountReceived,
    totalAmountShipped,
    stock,
    note,
  } = req.body;
  try {
    // 스키마에 따라서 새로운 상품을 생성하고 저장하는 로직을 작성합니다.
    const product = await Product.create({
      productName,
      wholesalePrice,
      retailPrice,
      firstStock,
      date,
      warehouseManager,
      receivingEventList,
      shippingEventList,
      totalAmountReceived,
      totalAmountShipped,
      stock,
      note,
    });
    console.log(product);

    res.json(true);
  } catch (error) {
    res.status(422).json(error);
  }
});

app.get(`/productList`, async (req, res) => {
  res.json(await Product.find());
});
