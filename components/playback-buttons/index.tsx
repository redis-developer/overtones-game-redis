import React, { useEffect } from "react";
import styled, { css } from "styled-components";
import { ModeNotation } from "lib/types";
import usePlayback, { PlayButtonProps } from "hooks/use-playback";
import useKeyDown from "hooks/use-key-down";

interface PlaybackButtonsProps {
  notation: ModeNotation;
  inline?: boolean;
  mb?: string | number;
  onCounterUpdated: (counter: any) => void;
  id: string;
}

const Row = styled.div<{ mb: PlaybackButtonsProps["mb"] }>`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${({ theme, mb = 0 }) => (mb === 0 ? 0 : theme.sizes[mb])};
`;

const Button = styled.button<{ inline: boolean; isPlaying: boolean }>`
  ${({ theme, disabled, isPlaying, inline }) => css`
    background: #ffd873;
    border: none;
    border-radius: 50%;
    margin: 0 ${theme.sizes.xs};
    width: ${theme.scale[20]};
    height: ${theme.scale[20]};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transition: ${theme.transition()};
    cursor: pointer;
    box-shadow: 0px 2px 0px #d5b461;

    &:hover {
      box-shadow: 0px 4px 0px #d5b461;
    }

    &:active {
      box-shadow: 0px 0px 0px #d5b461;
    }

    ${theme.media.md`
      margin: 0 ${theme.sizes.s};
      width: ${theme.scale[24]};
      height: ${theme.scale[24]};
    `}

    &:focus {
      outline: none;
    }

    ${disabled &&
    !isPlaying &&
    css`
      color: ${theme.colors.text.muted};
      pointer-events: none;
    `}

    ${isPlaying &&
    css`
      border-color: ${theme.colors.yellow};
      color: ${theme.colors.text.default};
    `}

    ${inline &&
    css`
      flex-direction: row;
      width: ${theme.sizes.xl};
      height: ${theme.sizes.xl};
      padding: ${theme.sizes.xs} ${theme.sizes.s};

      i {
        font-size: 1rem;
      }

      ${theme.media.md`
        width: ${theme.sizes.xxl};
        height: ${theme.sizes.xxl};
        padding: ${theme.sizes.xs} ${theme.sizes.m};
      `}
    `}
  `}
`;

const Icon = styled.i`
  font-size: 2rem;
  display: block;
`;

const LabelHolder = styled.div`
  display: flex;
  align-items: center;
`;

const Label = styled.label`
  font-size: ${({ theme }) => theme.fontSizes.small};
  margin: 0;
`;
const KeyIndicator = styled.span`
  display: none;

  ${({ theme }) => theme.media.md`
    line-height: 0;
    font-size: ${theme.fontSizes.small};
    border: 2px solid ${theme.colors.neutralL10};
    color: ${theme.colors.text.muted};
    border-radius: ${theme.borderRadius};
    width: ${theme.sizes.m};
    height: ${theme.sizes.m};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: ${theme.sizes.xxs};
  `}
`;

interface CustomPlayButtonProps extends PlayButtonProps {
  inline: boolean;
}
const PlayButton: React.FC<CustomPlayButtonProps> = ({
  icon,
  label,
  shortcut,
  visible,
  ...rest
}) => {
  useKeyDown(shortcut, () => rest.onClick());

  if (!visible) {
    return null;
  }

  return (
    <Button {...rest}>
      <Icon className={icon} />
    </Button>
  );
};

const PlaybackButtons: React.FC<PlaybackButtonsProps> = ({
  inline,
  notation,
  mb,
  onCounterUpdated,
  id,
}) => {
  const { stopAll, playRootButtonProps, playDefaultButtonProps } = usePlayback(
    notation,
    {
      onCounterUpdated,
      id,
    }
  );

  useEffect(() => {
    return () => {
      stopAll();
    };
    // eslint-disable-next-line
  }, [notation]);

  return (
    <Row mb={mb}>
      <PlayButton inline={inline} {...playRootButtonProps} />

      <PlayButton inline={inline} {...playDefaultButtonProps} />
    </Row>
  );
};

export default PlaybackButtons;
