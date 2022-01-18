export function toEllipsis(val, limit) {
  let _val = val?.toString();
  return _val.length > limit ? _val.slice(0, limit) + '...' : _val;
}
