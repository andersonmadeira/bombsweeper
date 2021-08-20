import styled from '@emotion/styled'

import { GameStatus } from '../types'

export const StyledGrid = styled.div<{ columns: number }>`
  display: grid;
  width: calc(${({ columns }) => columns} * 30px);
  grid-template-columns: repeat(${({ columns }) => columns}, 1fr);
  border: 0;
`

export const GameContainer = styled.div<{ lines: number; columns: number }>`
  position: relative;
  width: calc(${({ columns }) => columns} * 30px);
  height: calc(${({ lines }) => lines} * 30px);

  &:hover .endgame-card {
    opacity: 1;
  }
`

export const EndGameCard = styled.div`
  box-sizing: border-box;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
  padding: 20px;
  width: 180px;
  height: 180px;
  left: calc(50% - (180px / 2));
  top: calc(50% - (180px / 2));
  transform: perspective(750px) translate3d(0px, 0px, -250px) rotateX(27deg) scale(0.9, 0.9);
  border: 5px solid #e6e6e6;
  box-shadow: 0 70px 40px -20px rgba(0, 0, 0, 0.2);
  transition: 0.4s ease-in-out transform, 0.3s ease-in-out opacity;

  opacity: 0;

  &:hover {
    transform: translate3d(0px, 0px, -250px);

    & button {
      opacity: 1;
      transform: translate3d(0px, 0px, 0px);
    }
  }
`

export const EndGameEmoji = styled.span`
  font-size: 80px;
  margin-bottom: 10px;
`

export const RestartButton = styled.button<{ gameStatus: GameStatus }>`
  cursor: pointer;
  padding: 6px 12px;
  border: 0;
  color: #fff;
  background-color: ${({ gameStatus }) => (gameStatus === 'lost' ? 'tomato' : '#77c063')};
  border-radius: 4px;

  opacity: 0;
  transform: translate3d(0px, 50px, 0px);

  transition: 0.4s ease-in-out transform, 0.2s ease-in-out opacity;
`
