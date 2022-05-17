function getClientIp(req) {
  // Server is probably behind a proxy.
  if (req.headers) {
    // Standard headers used by Amazon EC2, Heroku, and others.
    if (is.ip(req.headers["x-client-ip"])) {
      return req.headers["x-client-ip"];
    }

    // Load-balancers (AWS ELB) or proxies.
    const xForwardedFor = getClientIpFromXForwardedFor(
      req.headers["x-forwarded-for"]
    );
    if (is.ip(xForwardedFor)) {
      return xForwardedFor;
    }

    // Cloudflare.
    // @see https://support.cloudflare.com/hc/en-us/articles/200170986-How-does-Cloudflare-handle-HTTP-Request-headers-
    // CF-Connecting-IP - applied to every request to the origin.
    if (is.ip(req.headers["cf-connecting-ip"])) {
      return req.headers["cf-connecting-ip"];
    }

    // Akamai and Cloudflare: True-Client-IP.
    if (is.ip(req.headers["true-client-ip"])) {
      return req.headers["true-client-ip"];
    }

    // Default nginx proxy/fcgi; alternative to x-forwarded-for, used by some proxies.
    if (is.ip(req.headers["x-real-ip"])) {
      return req.headers["x-real-ip"];
    }

    // (Rackspace LB and Riverbed's Stingray)
    // http://www.rackspace.com/knowledge_center/article/controlling-access-to-linux-cloud-sites-based-on-the-client-ip-address
    // https://splash.riverbed.com/docs/DOC-1926
    if (is.ip(req.headers["x-cluster-client-ip"])) {
      return req.headers["x-cluster-client-ip"];
    }

    if (is.ip(req.headers["x-forwarded"])) {
      return req.headers["x-forwarded"];
    }

    if (is.ip(req.headers["forwarded-for"])) {
      return req.headers["forwarded-for"];
    }

    if (is.ip(req.headers.forwarded)) {
      return req.headers.forwarded;
    }
  }

  // Remote address checks.
  if (is.existy(req.connection)) {
    if (is.ip(req.connection.remoteAddress)) {
      return req.connection.remoteAddress;
    }
    if (
      is.existy(req.connection.socket) &&
      is.ip(req.connection.socket.remoteAddress)
    ) {
      return req.connection.socket.remoteAddress;
    }
  }

  if (is.existy(req.socket) && is.ip(req.socket.remoteAddress)) {
    return req.socket.remoteAddress;
  }

  if (is.existy(req.info) && is.ip(req.info.remoteAddress)) {
    return req.info.remoteAddress;
  }

  return null;
}

module.exports = {
  getClientIp,
};
