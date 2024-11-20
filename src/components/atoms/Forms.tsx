export const TextInput = ({
  className,
  isError,
  ...props
}: {
  isError?: boolean;
} & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>) => {
  const classes = ['input', 'max-w-xs', isError && 'input-error', className];
  return <input type="text" className={classes.join(' ')} {...props} />;
};

export const NumberInput = ({
  className,
  isError,
  ...props
}: {
  isError?: boolean;
} & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>) => {
  const classes = ['input', 'max-w-xs', isError && 'input-error', className];
  return <input type="number" className={classes.join(' ')} {...props} />;
};

export const Label = ({
  children,
  className,
  ...props
}: Readonly<
  {
    children: React.ReactNode;
    className?: string;
  } & React.DetailedHTMLProps<
    React.LabelHTMLAttributes<HTMLLabelElement>,
    HTMLLabelElement
  >
>) => {
  const classes = ['label', className];
  return (
    <label className={classes.join(' ')} {...props}>
      <span className="label-text">{children}</span>
    </label>
  );
};
