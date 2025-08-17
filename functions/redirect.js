  const encoded = encodeURIComponent(event.path);
  return {
    statusCode: 302,
    headers: { Location: `/login?redirect=${encoded}` },
  };
};
