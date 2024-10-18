enum TextVariants {
  h1 = "h1",
  h2 = "h2",
  h3 = "h3",
  h4 = "h4",
  h5 = "h5",
  h6 = "h6",
  p1 = "p1",
  p2 = "p2",
  p3 = "p3",
  p4 = "p4",
  p5 = "p5",
  p6 = "p6",
  body = "body",
}

export const TextStyles: Record<TextVariants, string> = {
  h1: " leading text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white font-poppins",
  [TextVariants.h2]:
    "text-4xl font-bold text-gray-900 dark:text-white font-poppins",
  [TextVariants.h3]:
    "text-2xl font-bold text-gray-900 dark:text-white font-poppins",
  [TextVariants.h4]:
    "text-xl font-semibold text-gray-900 dark:text-white font-poppins",
  [TextVariants.h5]:
    "text-lg font-medium text-gray-900 dark:text-white font-poppins",
  [TextVariants.h6]:
    "text-base font-medium text-gray-900 dark:text-white font-poppins",
  [TextVariants.p1]:
    "text-2xl font-normal text-gray-900 dark:text-white font-poppins",
  [TextVariants.p2]:
    "text-xl font-normal text-gray-900 dark:text-white font-poppins",
  [TextVariants.p3]:
    "text-lg font-normal text-gray-900 dark:text-white font-poppins",
  [TextVariants.p4]:
    "text-base font-normal text-gray-800 dark:text-white font-poppins",
  [TextVariants.p5]: "text-sm text-gray-700 dark:text-white font-poppins",
  [TextVariants.p6]: "text-xs text-gray-600 dark:text-white font-poppins",
  [TextVariants.body]:
    "text-base font-normal text-gray-900 dark:text-white font-poppins",
};

export type TextVariant = keyof typeof TextVariants;
