export const processSlug = (categories) => {
  const slugs = categories.map((category) =>
    category.toLowerCase().split(" ").join("_")
  );
  return slugs;
};

export const processCategory = (categories) => {
  return categories.map((category) => ({
    where: { name: category },
    create: { name: category },
  }));
};
