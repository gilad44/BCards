import { createTheme } from "flowbite-react";

const cardTheme = createTheme({
  card: {
    root: {
      base: "cardThemeBase",
      children: "cardThemeKids",
    },
  },
});
const searchIconTheme = createTheme({
  field: {
    base: "relative w-full",

    rightIcon: {
      base: "pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3",
      svg: "h-4 w-4 text-gray-500 dark:text-gray-400",
    },
  },
});
const buttonTheme = createTheme({
  disabled: "pointer-events-none opacity-50",
  fullSized: "w-full",
  pill: "rounded-full",
  size: {
    xs: "h-8 px-3 ",
    sm: "h-9 px-3 ",
    md: "h-10 px-5 ",
    lg: "h-12 px-5",
    xl: "h-[52px] px-6",
  },
});
const paginationTheme = createTheme({
  base: "",
  layout: {
    table: {
      base: "paginationLayoutBase",
      span: "paginationLayoutSpan",
    },
  },
  pages: {
    base: "pagesBase",
    showIcon: "inline-flex",
    previous: {
      base: "pagesPrevious",
      icon: "size-fluid-sm",
    },
    next: {
      base: "pagesNext",
      icon: "size-fluid-sm",
    },
    selector: {
      base: "pagesSelectorBase",
      active:
        "bg-gradient-to-b from-slate-950 via-white to-slate-950 dark:text-black",
    },
  },
});
const collapseTheme = createTheme({
  base: "mr-fluid-sm mt-fluid-md size-full md:block",
  list: "flex flex-col max-md:translate-y-fluid-3xl md:mt-0 md:flex-row md:space-x-8 md:text-sm md:font-medium",
});

const toggleTheme = createTheme({
  base: "myNav-toggle",
  icon: "size-fluid-xl",
  title: "sr-only",
});
const navbarTheme = createTheme({
  root: {
    base: "navbarBase",
    inner: {
      base: "navbarInnerBase",
    },
  },
});
export {
  buttonTheme,
  cardTheme,
  collapseTheme,
  navbarTheme,
  paginationTheme,
  searchIconTheme,
  toggleTheme,
};
