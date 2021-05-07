import { css } from 'styled-components';

export interface WithTextProps {
  align?: 'left' | 'center' | 'right';
  lineHeight?: 'default' | 'large';
}

export default ({ align, lineHeight }: WithTextProps) => css`
  ${align &&
  css`
    text-align: ${align || 'none'};
  `};

  ${lineHeight === 'large' &&
  css`
    line-height: 2;
  `}
`;
