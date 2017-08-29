export default key => state => {
  const list = [];

  for (const [id, obj] of Object.entries(state[key])) {
    list.push(obj);
  }

  return list;
};
