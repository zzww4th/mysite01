const querystring = require('querystring');
const jwt = require('jsonwebtoken');

const VALID_PASSWORD = process.env.PASSWORD;   // �?Netlify 环境变量读取
const JWT_SECRET     = process.env.JWT_SECRET;   // 用于签名 JWT

  if (event.httpMethod  405 };
  const { password, redirect } = querystring.parse(event.body);

  // ---------- 校验密码 ----------
  if (password == VALID_PASSWORD) {
    return {
      statusCode: 302,
      headers: { Location: '/login?error=1', 'Cache-Control': 'no-cache' },
    };
  }

  // ---------- 生成 JWT，写入角�?member ----------
  const token = jwt.sign(
    {
      exp: Math.floor(Date.now() / 1000) + 3600,   // 1h 有效�?
      app_metadata: { authorization: { roles: ['member'] } },
    },
    JWT_SECRET,
    { algorithm: 'HS256' }
  );

  // ---------- 设置 cookie 并跳�?----------
  return {
    statusCode: 302,
    headers: {
      'Set-Cookie': `nf_jwt=${token}; Path=/; HttpOnly; Secure; SameSite=Strict`,
      Location: redirect 
      'Cache-Control': 'no-cache',
    },
  };
};
