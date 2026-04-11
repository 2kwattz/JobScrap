const suspiciousPatterns = [
  /(?:')|(?:--)|(?:#)|(?:\/\*)|(?:\*\/)/i,
  /\b(?:or|and)\b\s+['"\d\w]+\s*=\s*['"\d\w]+/i,
  /\bunion\b[\s\S]*\bselect\b/i,
  /\bselect\b[\s\S]*\bfrom\b/i,
  /\b(?:insert\s+into|update\s+\w+\s+set|delete\s+from|drop\s+table)\b/i,
  /\b(?:sleep|benchmark)\s*\(/i
];

const containsSqlInjection = (value) => {
  if (typeof value === "string") {
    return suspiciousPatterns.some((pattern) => pattern.test(value));
  }

  if (Array.isArray(value)) {
    return value.some(containsSqlInjection);
  }

  if (value && typeof value === "object") {
    return Object.values(value).some(containsSqlInjection);
  }

  return false;
};



const sqlInjectionMiddleware = (req, res, next) => {

  const Ip = 
  req.headers['x-forwarded-for']?.split(',')[0] ||
  req.socket.remoteAddress ||
  req.ip;
  
  if (
    containsSqlInjection(req.body) ||
    containsSqlInjection(req.query) ||
    containsSqlInjection(req.params)
  ) {
    return res.status(400).json({
      success: false,
      message: {
        title: "SQL Injection was detected and blocked",
        ipAddress: Ip
      }
    });
  }

  next();
};

module.exports = sqlInjectionMiddleware;
