export const Section1 = ({
  children,
  className,
}: Readonly<{
  children: React.ReactNode;
  className?: string;
}>) => {
  const classes = [
    'flex',
    'flex-col',
    'gap-4',
    'items-center',
    'w-full',
    className,
  ];
  return <section className={classes.join(' ')}>{children}</section>;
};

export const Section2 = ({
  children,
  className,
}: Readonly<{
  children: React.ReactNode;
  className?: string;
}>) => {
  const classes = [
    'flex',
    'flex-col',
    'gap-4',
    'items-center',
    'flex-1',
    className,
  ];
  return <section className={classes.join(' ')}>{children}</section>;
};

export const Section3 = ({
  children,
  className,
}: Readonly<{
  children: React.ReactNode;
  className?: string;
}>) => {
  const classes = ['flex', 'gap-4', 'items-end', 'w-full', className];
  return <section className={classes.join(' ')}>{children}</section>;
};
