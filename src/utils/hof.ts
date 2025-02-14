export const sortByKey =
  <T>(key: keyof T, order: "asc" | "desc" = "asc") =>
  (list: T[]): T[] =>
    [...list].sort((a, b) =>
      (a[key] ?? "") > (b[key] ?? "")
        ? order === "asc"
          ? 1
          : -1
        : order === "asc"
          ? -1
          : 1,
    );
