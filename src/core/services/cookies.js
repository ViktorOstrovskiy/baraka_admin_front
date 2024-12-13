

export const docCookies = {
  resetMaxAge: function (sKey) {
    if (!sKey) {
      return null;
    }
    const item = this.getItem(sKey);
    if (item) {
      this.setItem(sKey, item, {
        expires: new Date(Date.now() + 2592000 * 1000).toUTCString(),
      });
    }
  },

  getItem: function (sKey) {
    if (!sKey) {
      return null;
    }
    return (
      decodeURIComponent(
        document.cookie.replace(
          new RegExp(
            "(?:(?:^|.*;)\\s*" +
              encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") +
              "\\s*\\=\\s*([^;]*).*$)|^.*$"
          ),
          "$1"
        )
      ) || null
    );
  },

  setItem: function (
    sKey,
    sValue,
    options = {}
  ) {
    if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) {
      return false;
    }
    document.cookie = `${encodeURIComponent(sKey)}=${encodeURIComponent(
      sValue
    )};expires=${options.expires || ""}; path=${options.path || "/"};`;
    return true;
  },

  removeItem: function (sKey) {
    if (!this.hasItem(sKey)) {
      return false;
    }
    document.cookie = `${encodeURIComponent(
      sKey
    )}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;`;
    return true;
  },

  hasItem: function (sKey) {
    if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) {
      return false;
    }
    return new RegExp(
      "(?:^|;\\s*)" +
        encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") +
        "\\s*\\="
    ).test(document.cookie);
  },

  keys: function () {
    const keys = document.cookie
      .replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "")
      .split(/\s*(?:\=[^;]*)?;\s*/);
    return keys.map((key) => decodeURIComponent(key));
  },
};
