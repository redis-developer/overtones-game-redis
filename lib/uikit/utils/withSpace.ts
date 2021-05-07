import { css } from 'styled-components';
import Theme from '../types/theme';

export type SpaceProp = string;

export interface WithSpaceProps {
  m?: SpaceProp;
  mt?: SpaceProp;
  mr?: SpaceProp;
  mb?: SpaceProp;
  ml?: SpaceProp;
}

const shorthandMapping = {
  magin: 'm',
  marginTop: 'mt',
  marginRight: 'mr',
  marginBottom: 'mb',
  marginLeft: 'ml',
};

const generateCssProp = (shorthand: string, value: SpaceProp, theme: Theme) => {
  const mapping = {
    m: 'margin',
    t: '-top',
    r: '-right',
    b: '-bottom',
    l: '-left',
  };

  const [key, direction] = shorthand.split('');
  const prop = `${mapping[key]}${mapping[direction] || ''}`;

  const getSpace = theme.sizes[value as any] || 0;

  if (!getSpace) {
    return null;
  }

  return `${prop}: ${getSpace};`;
};

const loop = (props: any) => {
  let s = '';

  Object.keys(props).forEach((key: string) => {
    const useKey = shorthandMapping[key] || key;
    if (/^(m|p)(t|b|r|l)?$/.test(useKey)) {
      const size = generateCssProp(useKey, props[key], props.theme);
      if (size) {
        s += size;
      }
    }
  });

  return css`
    ${s}
  `;
};

const withSpace = (props: WithSpaceProps) => css`
  ${loop(props)};
`;

export default withSpace;
