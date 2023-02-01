export const imgcaption = (md) => {
  const old = md.renderer.rules.image;

  md.renderer.rules.image = (tokens, idx, options, env, self) => {
    if (tokens[idx].attrs[2]) {
      const attrs = tokens[idx].attrs;
      const title = attrs[2][1];
      const src = attrs[0][1];
      const alt = tokens[idx].content;
      return `<figure><img src="${src}" alt="${alt}" /><figcaption>${title}</figcaption></figure>`;
    }
    return old(tokens, idx, options, env, self);
  };
};
