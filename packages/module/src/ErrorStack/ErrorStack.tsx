import type { FunctionComponent } from 'react';
import { css } from '@patternfly/react-styles';
import { Content } from '@patternfly/react-core';
import { createUseStyles } from 'react-jss';

export interface ErrorStackProps {
  /** Error object to be displayed in the stack */
  error: Error;
  /** Custom className */
  className?: string;
}

const useStyles = createUseStyles({
  errorStack: {
    fontFamily: 'monospace',
    fontSize: 'var(--pf-t--global--font--size--300)',
    textAlign: 'left',
    backgroundColor: 'white',
    borderStyle: 'solid',
    borderColor: 'var(--pf-t--color--gray--90)',
    overflowWrap: 'break-word',
    padding: 'var(--pf-t--global--spacer--200)'
  },
})

export const ErrorStack: FunctionComponent<ErrorStackProps> = ({ error, className, ...props }) => {
  const classes = useStyles();

  if (error.stack) {
    return (
      <Content className={css(classes.errorStack, className)} {...props} >
        {error.stack.split('\n').map((line) => (
          <div key={line}>{line}</div>
        ))}
      </Content>
    );
  }

  if (error.name && error.message) {
    return (
      <>
        <Content component="h6">{error.name}</Content>
        <Content className={css(classes.errorStack, className)} component="blockquote" {...props}>
          {error.message}
        </Content>
      </>
    );
  }

  return (
    <Content className={classes.errorStack} component="blockquote">
      {error.toString()}
    </Content>
  );
};

export default ErrorStack;
