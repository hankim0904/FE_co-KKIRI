const copyUrl = async () => {
  navigator.clipboard.writeText(window.location.href);
};

export default copyUrl;
