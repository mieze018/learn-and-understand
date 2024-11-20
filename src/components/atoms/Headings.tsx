export const H1 = ({
  children,
  className,
}: Readonly<{
  children: React.ReactNode;
  className?: string;
}>) => {
  const classes = ['text-3xl', 'font-bold', 'w-full', className];
  return <h1 className={classes.join(' ')}>{children}</h1>;
};

export const H2 = ({
  children,
  className,
}: Readonly<{
  children: React.ReactNode;
  className?: string;
}>) => {
  const classes = ['text-2xl', 'font-bold', 'w-full', className];
  return <h2 className={classes.join(' ')}>{children}</h2>;
};
