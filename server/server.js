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
const Inbound = require("./models/inbound.js");
const BusinessPartner = require("./models/businessPartner.js");
const Outbound = require(`./models/outbound.js`);
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

// 프로덕트 리스트 전체 가져오기
app.get(`/productList`, async (req, res) => {
  res.json(await Product.find());
});

//프로덕트 리스트 중 특정 프로덕트 찾기
app.get("/productSearching", async (req, res) => {
  const { currentSearchValue, searchCondition } = req.query;

  console.log(currentSearchValue, searchCondition);

  const searchResult = await Product.find({
    [searchCondition]: currentSearchValue,
  });

  res.json(searchResult);
});
// 프로덕트 리스트 중 최신 5개만 가져오기
app.get("/recentProducts", async (req, res) => {
  try {
    const recentProducts = await Product.find().sort({ date: -1 }).limit(5);
    res.json(recentProducts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch recent products" });
  }
});

// 비지니스 파트너 전체 가져오기
app.get(`/businessPartnerList`, async (req, res) => {
  res.json(await BusinessPartner.find());
});

//비지니스 파트너 추가하기
app.post("/addbusinessPartner", async (req, res) => {
  const {
    BusinessPartnerName,
    credit,
    eMail,
    nete,
    owner,
    telephoneNumber,
    manager,
  } = req.body;
  try {
    // 스키마에 따라서 새로운 거래처를 생성하고 저장하는 로직을 작성합니다.
    const businessPartner = await BusinessPartner.create({
      BusinessPartnerName,
      credit,
      eMail,
      nete,
      owner,
      telephoneNumber,
      manager,
    });

    console.log(businessPartner); // 생성된 거래처 데이터 출력

    res.json(true);
  } catch (error) {
    console.error(error);
    res.status(422).json(error);
  }
});

//비지니스파트너 특정 프로덕트 찾기
app.get("/businessPartnerSearching", async (req, res) => {
  const { currentSearchValue, searchCondition } = req.query;

  console.log(currentSearchValue, searchCondition);

  const searchResult = await BusinessPartner.find({
    [searchCondition]: currentSearchValue,
  });

  res.json(searchResult);
});

// 프로덕트 리스트 중 최신 5개만 가져오기
app.get("/recentBusinessPartner", async (req, res) => {
  try {
    const recentBusinessPartner = await BusinessPartner.find()
      .sort({ date: -1 })
      .limit(5);
    res.json(recentBusinessPartner);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch recent products" });
  }
});

//입고 시키기
app.post("/addInbound", async (req, res) => {
  const { addProductQuantity, date, product_id, employee_id, note } = req.body;

  try {
    // 스키마에 따라서 새로운 입고 데이터를 생성하고 저장하는 로직을 작성합니다.
    const inbound = await Inbound.create({
      addProductQuantity,
      date,
      product_id,
      employee_id,
      note,
    });

    // 저장된 입고 데이터를 클라이언트에 응답합니다.
    res.json(inbound);
  } catch (error) {
    // 오류 발생 시 오류 메시지를 클라이언트에 응답합니다.
    res.status(500).json({ error: "Failed to add inbound data." });
  }
});

// 입고 후 프로덕트 데이터 변경
app.post(`/addReceivingEvent`, async (req, res) => {
  const { date, product_id, employee_id, addProductQuantity } = req.body;

  try {
    // 새로운 receiving event를 생성합니다.
    const newReceivingEvent = {
      date: date,
      employee_id: employee_id,
      addProductQuantity: addProductQuantity,
    };

    // productId에 해당하는 상품을 조회합니다.
    const product = await Product.findOne({ _id: product_id });

    if (!product) {
      return res.status(404).json({ error: "Product not found." });
    }

    // receivingEventList에 새로운 receiving event를 추가합니다.
    product.receivingEventList.push(newReceivingEvent);

    // 상품의 totalAmountReceived과 stock을 업데이트합니다.
    product.totalAmountReceived += addProductQuantity;
    product.stock += addProductQuantity;

    // 상품을 저장합니다.
    await product.save();

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Failed to add receiving event." });
  }
});

// 특정 입고 이밴트 찾기
app.get("/inboundSearching", async (req, res) => {
  const { currentSearchValue, searchCondition } = req.query;

  console.log(currentSearchValue, searchCondition);

  const searchResult = await Inbound.find({
    [searchCondition]: currentSearchValue,
  });

  res.json(searchResult);
});
// 전체 입고 이밴트 가져오기
app.get(`/InboundList`, async (req, res) => {
  res.json(await Inbound.find());
});

// 입고 리스트 중 최신 5개만 가져오기
app.get("/recentInbound", async (req, res) => {
  try {
    const recentBusinessPartner = await Inbound.find()
      .sort({ date: -1 })
      .limit(5);
    res.json(recentBusinessPartner);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch recent products" });
  }
});

// 전체 출고 이밴트 가져오기
app.get(`/OutboundList`, async (req, res) => {
  res.json(await Outbound.find());
});
// 출고 저장
app.post("/addOutbound", async (req, res) => {
  try {
    const {
      note,
      totalAmount,
      date,
      product_id,
      BusinessPartner_id,
      stockOutboundQuantity,
    } = req.body;

    if (
      !note ||
      !totalAmount ||
      !date ||
      !product_id ||
      !BusinessPartner_id ||
      stockOutboundQuantity === undefined
    ) {
      return res.status(400).json({ error: "필수 필드가 누락되었습니다." });
    }

    const outbound = await Outbound.create({
      note,
      totalAmount,
      date,
      product_id,
      BusinessPartner_id,
      stockOutboundQuantity,
    });

    return res.json(outbound);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Outbound 추가 중 오류가 발생했습니다." });
  }
});

//출고 이밴트 성공 후 그 데이터를 기반으로 product를 변경함
app.post("/addShippingEvent", async (req, res) => {
  const {
    date,
    businessPartner_id,
    employee_id,
    stockOutboundQuantity,
    totalAmount,
    product_id,
  } = req.body;

  try {
    // 새로운 shipping event를 생성합니다.
    const newShippingEvent = {
      date: date,
      businessPartner_id: businessPartner_id,
      employee_id: employee_id,
      stockOutboundQuantity: stockOutboundQuantity,
      totalAmount: totalAmount,
      product_id: product_id,
    };

    // productId에 해당하는 상품을 조회합니다.
    const product = await Product.findOne({ _id: product_id });

    if (!product) {
      return res.status(404).json({ error: "Product not found." });
    }

    // shippingEventList에 새로운 shipping event를 추가합니다.
    product.shippingEventList.push(newShippingEvent);

    // 상품의 stock과 totalAmountShipped를 업데이트합니다.
    product.stock -= stockOutboundQuantity;
    product.totalAmountShipped += totalAmount;

    // 상품을 저장합니다.
    await product.save();

    const businessPartner = await BusinessPartner.findOne({
      _id: businessPartner_id,
    });

    if (!businessPartner) {
      return res.status(404).json({ error: "Business partner not found." });
    }

    businessPartner.credit += totalAmount;

    // 비지니스 파트너를 저장합니다.
    await businessPartner.save();

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Failed to add shipping event." });
  }
});

// 특정 출고 이밴트 찾기
app.get("/OutboundSearching", async (req, res) => {
  const { currentSearchValue, searchCondition } = req.query;

  console.log(currentSearchValue, searchCondition);

  const searchResult = await Outbound.find({
    [searchCondition]: currentSearchValue,
  });

  res.json(searchResult);
});

const PORT = process.env.PORT || 4000;
const HOST = "43.202.51.207"; // 원격 서버의 공인 IP 주소로 변경

app.listen(PORT, HOST, () => {
  console.log(`서버가 ${HOST}:${PORT} 에서 실행 중입니다.`);
});
