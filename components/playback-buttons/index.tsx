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
  autoPlay: boolean;
}

const Row = styled.div<{ mb: PlaybackButtonsProps["mb"] }>`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${({ theme, mb = 0 }) => (mb === 0 ? 0 : theme.sizes[mb])};
`;

const Button = styled.button<{
  isPrimary: boolean;
  inline: boolean;
  isPlaying: boolean;
}>`
  ${({ theme, disabled, isPlaying, inline, isPrimary }) => css`
    background: #ffd873;
    border: none;
    border-radius: 50%;
    margin: 0 ${theme.sizes.xs};
    width: ${theme.scale[12]};
    height: ${theme.scale[12]};
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

    i {
      font-size: 1.25rem;
    }

    ${theme.media.md`
      margin: 0 ${theme.sizes.s};
      width: ${theme.scale[16]};
      height: ${theme.scale[16]};

      i {
        font-size: 1.5rem;
      }
    `}

    ${isPrimary &&
    css`
      width: ${theme.scale[20]};
      height: ${theme.scale[20]};

      i {
        font-size: 2rem;
      }

      ${theme.media.md`
      margin: 0 ${theme.sizes.s};
      width: ${theme.scale[24]};
      height: ${theme.scale[24]};

      i {
        font-size: 2rem;
      }
    `}
    `}

    &:focus {
      outline: none;
    }

    ${disabled &&
    !isPlaying &&
    css`
      opacity: 0.5;
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

interface CustomPlayButtonProps extends PlayButtonProps {
  inline: boolean;
}
const PlayButton: React.FC<CustomPlayButtonProps> = ({
  label,
  shortcut,
  visible,
  ...rest
}) => {
  useKeyDown(shortcut, () => rest.onClick());

  if (!visible) {
    return null;
  }

  let icon = rest.isPlaying ? "fa fa-pause" : rest.icon;

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
  autoPlay,
}) => {
  const { stopAll, playRootButtonProps, playDefaultButtonProps } = usePlayback(
    notation,
    {
      autoPlay,
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
