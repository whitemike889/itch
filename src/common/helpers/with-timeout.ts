import { ItchPromise } from "common/util/itch-promise";

export function withTimeout<T>(
  label: string,
  millis: number,
  p: Promise<T>
): Promise<T> {
  return new ItchPromise((resolve, reject) => {
    let timeout = setTimeout(() => {
      reject(new Error(`${label} timed out!`));
    }, millis);

    p.then(v => {
      clearTimeout(timeout);
      resolve(v);
    }).catch(err => {
      clearTimeout(timeout);
      reject(err);
    });
  });
}
